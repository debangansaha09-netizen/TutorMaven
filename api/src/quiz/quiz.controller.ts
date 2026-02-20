import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { GenerateQuizDto } from './dto/generate-quiz.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('generate')
  generate(@Body() dto: GenerateQuizDto) {
    return this.quizService.generate(dto);
  }

  @Post(':quizId/assign')
  assign(
    @Param('quizId') quizId: string,
    @Body('studentIds') studentIds: string[],
    @Body('classOfferingId') classOfferingId?: string,
  ) {
    return this.quizService.assign(quizId, studentIds, classOfferingId);
  }

  @Post(':quizId/attempts')
  startAttempt(@Param('quizId') quizId: string) {
    return this.quizService.startAttempt(quizId);
  }

  @Post('attempts/:attemptId/submit')
  submitAttempt(
    @Param('attemptId') attemptId: string,
    @Body('responses')
    responses: { questionId: string; chosenOption: string; timeTakenSec?: number }[],
  ) {
    return this.quizService.submitAttempt(attemptId, responses);
  }

  @Get('analytics/student/:studentId')
  studentAnalytics(@Param('studentId') studentId: string) {
    return this.quizService.getStudentAnalytics(studentId);
  }

  @Get('analytics/tutor/:tutorId')
  tutorAnalytics(@Param('tutorId') tutorId: string) {
    return this.quizService.getTutorAnalytics(tutorId);
  }
}

