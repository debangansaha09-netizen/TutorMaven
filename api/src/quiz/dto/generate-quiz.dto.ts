import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GenerateQuizDto {
  @IsString()
  classLevel!: string;

  @IsString()
  board!: string;

  @IsString()
  subject!: string;

  @IsString()
  chapter!: string;

  @IsString()
  difficulty!: 'EASY' | 'MEDIUM' | 'HARD';

  @IsInt()
  @Min(5)
  @Max(40)
  count!: number;

  @IsOptional()
  @IsBoolean()
  isAdaptive?: boolean;
}

