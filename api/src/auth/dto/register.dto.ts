import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  // Student-specific
  @IsOptional()
  @IsString()
  classLevel?: string;

  @IsOptional()
  @IsString()
  board?: string;

  // Common
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  pincode?: string;
}

import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  role: UserRole;
}

