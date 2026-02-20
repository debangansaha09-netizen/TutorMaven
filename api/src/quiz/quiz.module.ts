import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [QuizController],
  providers: [QuizService, PrismaService, ConfigService],
})
export class QuizModule {}

