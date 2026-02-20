import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    if (dto.role === UserRole.STUDENT && !dto.classLevel) {
      throw new BadRequestException('Student must provide classLevel');
    }

    if (dto.role === UserRole.TUTOR && !dto.city) {
      throw new BadRequestException('Tutor must provide city');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        name: dto.name,
        role: dto.role,
        studentProfile:
          dto.role === UserRole.STUDENT
            ? {
                create: {
                  classLevel: dto.classLevel!,
                  board: dto.board ?? 'CBSE',
                  city: dto.city ?? '',
                  pincode: dto.pincode ?? '',
                },
              }
            : undefined,
        tutorProfile:
          dto.role === UserRole.TUTOR
            ? {
                create: {
                  city: dto.city ?? '',
                  pincode: dto.pincode ?? '',
                },
              }
            : undefined,
        parentProfile:
          dto.role === UserRole.PARENT
            ? {
                create: {},
              }
            : undefined,
      },
    });

    const tokens = this.buildTokens(user.id, user.role);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.buildTokens(user.id, user.role);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get<string>('jwt.refreshSecret'),
      });
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      const tokens = this.buildTokens(user.id, user.role);
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        ...tokens,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // Placeholder; actual Google verification will use Google APIs on the frontend/backoffice
  async loginWithGoogle(_idToken: string) {
    throw new BadRequestException('Google login not yet implemented');
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        tutorProfile: true,
        parentProfile: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private buildTokens(userId: string, role: UserRole) {
    const accessTtl = this.config.get<number>('jwt.accessTtl') ?? 900;
    const refreshTtl = this.config.get<number>('jwt.refreshTtl') ?? 2592000;

    const accessToken = this.jwtService.sign(
      { sub: userId, role },
      {
        expiresIn: accessTtl,
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, role },
      {
        secret: this.config.get<string>('jwt.refreshSecret'),
        expiresIn: refreshTtl,
      },
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: accessTtl,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        name: dto.name,
        role: dto.role as UserRole,
      },
    });
    return this.issueTokens(user.id, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    return this.issueTokens(user.id, user.role);
  }

  async refresh(refreshToken: string) {
    const payload = this.jwt.verify(refreshToken, {
      secret: this.config.get<string>('jwt.refreshSecret'),
    });
    return this.issueTokens(payload.sub, payload.role);
  }

  async loginWithGoogle(_idToken: string) {
    // TODO: Implement Google ID token verification and user linking.
    throw new Error('Not implemented yet');
  }

  async me(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  private async issueTokens(userId: string, role: UserRole) {
    const accessPayload = { sub: userId, role };
    const refreshPayload = { sub: userId, role };

    const accessToken = await this.jwt.signAsync(accessPayload);
    const refreshToken = await this.jwt.signAsync(refreshPayload, {
      secret: this.config.get<string>('jwt.refreshSecret'),
      expiresIn: this.config.get<string | number>('jwt.refreshTtl'),
    });

    return { accessToken, refreshToken };
  }
}

