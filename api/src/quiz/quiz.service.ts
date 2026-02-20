import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateQuizDto } from './dto/generate-quiz.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async generate(dto: GenerateQuizDto) {
    const existingHashes = await this.prisma.question.findMany({
      where: {
        quiz: {
          classLevel: dto.classLevel,
          board: dto.board,
          subject: dto.subject,
          chapter: dto.chapter,
        },
      },
      select: { hash: true },
      take: 500,
    });

    const response = await this.callLlmForQuestions(dto, existingHashes.map((e) => e.hash));

    const quiz = await this.prisma.quiz.create({
      data: {
        classLevel: dto.classLevel,
        board: dto.board,
        subject: dto.subject,
        chapter: dto.chapter,
        difficulty: dto.difficulty,
        questionCount: response.questions.length,
        isAdaptive: dto.isAdaptive ?? false,
        questions: {
          create: response.questions.map((q) => ({
            text: q.text,
            optionA: q.options[0],
            optionB: q.options[1],
            optionC: q.options[2],
            optionD: q.options[3],
            correctOption: q.correctOption,
            explanation: q.explanation,
            difficulty: q.difficulty,
            topicCode: q.topicCode,
            source: 'AI',
            hash: this.hashQuestion(q.text, q.topicCode),
          })),
        },
      },
      include: { questions: true },
    });

    return quiz;
  }

  async assign(quizId: string, studentIds: string[], classOfferingId?: string) {
    // For now, assignment is implicit via analytics; could write a link table later.
    return { quizId, studentIds, classOfferingId };
  }

  async startAttempt(quizId: string) {
    const attempt = await this.prisma.quizAttempt.create({
      data: {
        quizId,
        userId: '', // to be filled from auth context in a real implementation
        role: 'STUDENT',
      },
    });
    return attempt;
  }

  async submitAttempt(
    attemptId: string,
    responses: { questionId: string; chosenOption: string; timeTakenSec?: number }[],
  ) {
    const attempt = await this.prisma.quizAttempt.findUnique({
      where: { id: attemptId },
      include: { quiz: { include: { questions: true } } },
    });
    if (!attempt) {
      throw new Error('Attempt not found');
    }

    const questionMap = new Map(
      attempt.quiz.questions.map((q) => [q.id, q] as const),
    );

    let correct = 0;
    const maxScore = attempt.quiz.questions.length;

    for (const r of responses) {
      const q = questionMap.get(r.questionId);
      if (!q) continue;
      const isCorrect = q.correctOption === r.chosenOption;
      if (isCorrect) correct += 1;
      await this.prisma.questionResponse.create({
        data: {
          attemptId,
          questionId: r.questionId,
          chosenOption: r.chosenOption,
          isCorrect,
          timeTakenSec: r.timeTakenSec,
        },
      });
    }

    const accuracy = maxScore > 0 ? correct / maxScore : 0;

    const updated = await this.prisma.quizAttempt.update({
      where: { id: attemptId },
      data: {
        submittedAt: new Date(),
        score: correct,
        maxScore,
        accuracy,
      },
    });

    // TODO: update WeakTopicProfile aggregates here

    return updated;
  }

  async getStudentAnalytics(studentId: string) {
    const weakTopics = await this.prisma.weakTopicProfile.findMany({
      where: { studentId },
    });
    return { weakTopics };
  }

  async getTutorAnalytics(tutorId: string) {
    // Aggregate basic stats by class offering for now
    const stats = await this.prisma.quizAttempt.groupBy({
      by: ['quizId'],
      _avg: { score: true, accuracy: true },
      _count: { id: true },
      where: {
        // link via tutor's offerings if/when that relation is added
      },
    });
    return { stats };
  }

  private async callLlmForQuestions(
    dto: GenerateQuizDto,
    recentHashes: string[],
  ): Promise<{
    questions: {
      text: string;
      options: [string, string, string, string];
      correctOption: 'A' | 'B' | 'C' | 'D';
      explanation: string;
      difficulty: string;
      topicCode: string;
    }[];
  }> {
    const baseUrl = this.config.get<string>('ai.baseUrl')!;
    const apiKey = this.config.get<string>('ai.apiKey')!;
    const model = this.config.get<string>('ai.model')!;

    const prompt = `
You are an expert Indian school teacher generating MCQ quizzes.
Board: ${dto.board}
Class: ${dto.classLevel}
Subject: ${dto.subject}
Chapter: ${dto.chapter}
Difficulty: ${dto.difficulty}

Generate ${dto.count} high-quality multiple-choice questions aligned with the latest syllabus.
Avoid repeating questions that hash to any of: ${recentHashes.join(', ') || 'none'}.

Return strictly JSON with this shape:
{
  "questions": [
    {
      "text": "Question text",
      "options": ["Option A","Option B","Option C","Option D"],
      "correctOption": "A" | "B" | "C" | "D",
      "explanation": "Why this is correct",
      "difficulty": "EASY" | "MEDIUM" | "HARD",
      "topicCode": "short_topic_identifier"
    }
  ]
}
`;

    const response = await axios.post(
      `${baseUrl}/chat/completions`,
      {
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a quiz generator for Indian school curricula. Always output valid minified JSON only.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const content = response.data.choices[0].message.content as string;
    const parsed = JSON.parse(content);

    // Basic guardrails
    if (!Array.isArray(parsed.questions)) {
      throw new Error('LLM did not return questions array');
    }

    return parsed;
  }

  private hashQuestion(text: string, topicCode: string) {
    return crypto.createHash('sha256').update(`${text}:${topicCode}`).digest('hex');
  }
}

