import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface SearchParams {
  subject?: string;
  classLevel?: string;
  city?: string;
  pincode?: string;
  mode?: string;
  minFee?: number;
  maxFee?: number;
}

interface MapBounds {
  north?: number;
  south?: number;
  east?: number;
  west?: number;
}

@Injectable()
export class TutorsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(params: SearchParams) {
    const where: any = {
      tutorProfile: {
        verificationStatus: 'APPROVED',
      },
    };

    if (params.city) {
      where.tutorProfile.city = params.city;
    }
    if (params.pincode) {
      where.tutorProfile.pincode = params.pincode;
    }
    if (params.subject || params.classLevel || params.mode) {
      where.tutorProfile = {
        ...where.tutorProfile,
        offerings: {
          some: {
            subject: params.subject,
            classLevel: params.classLevel,
            mode: params.mode,
            feePerClass: {
              gte: params.minFee,
              lte: params.maxFee,
            },
          },
        },
      };
    }

    return this.prisma.user.findMany({
      where,
      include: {
        tutorProfile: {
          include: {
            offerings: true,
            locations: true,
          },
        },
      },
      take: 50,
    });
  }

  async mapPins(bounds: MapBounds) {
    const where: any = {};

    if (
      bounds.north !== undefined &&
      bounds.south !== undefined &&
      bounds.east !== undefined &&
      bounds.west !== undefined
    ) {
      where.AND = [
        { latitude: { lte: bounds.north } },
        { latitude: { gte: bounds.south } },
        { longitude: { lte: bounds.east } },
        { longitude: { gte: bounds.west } },
      ];
    }

    const locations = await this.prisma.tutorLocation.findMany({
      where,
      include: {
        tutor: {
          include: {
            user: true,
          },
        },
      },
      take: 200,
    });

    return locations.map((loc) => ({
      id: loc.id,
      tutorId: loc.tutorId,
      name: loc.tutor.user.name,
      subjectSummary: '', // can be filled from offerings if needed
      latitude: loc.latitude,
      longitude: loc.longitude,
      city: loc.city,
      pincode: loc.pincode,
    }));
  }

  async getById(id: string) {
    return this.prisma.tutorProfile.findUnique({
      where: { id },
      include: {
        user: true,
        offerings: true,
        locations: true,
      },
    });
  }
}

