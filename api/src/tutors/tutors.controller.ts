import { Controller, Get, Param, Query } from '@nestjs/common';
import { TutorsService } from './tutors.service';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get('search')
  search(
    @Query('subject') subject?: string,
    @Query('classLevel') classLevel?: string,
    @Query('city') city?: string,
    @Query('pincode') pincode?: string,
    @Query('mode') mode?: string,
    @Query('minFee') minFee?: string,
    @Query('maxFee') maxFee?: string,
  ) {
    return this.tutorsService.search({
      subject,
      classLevel,
      city,
      pincode,
      mode,
      minFee: minFee ? parseInt(minFee, 10) : undefined,
      maxFee: maxFee ? parseInt(maxFee, 10) : undefined,
    });
  }

  @Get('map')
  map(
    @Query('north') north?: string,
    @Query('south') south?: string,
    @Query('east') east?: string,
    @Query('west') west?: string,
  ) {
    return this.tutorsService.mapPins({
      north: north ? parseFloat(north) : undefined,
      south: south ? parseFloat(south) : undefined,
      east: east ? parseFloat(east) : undefined,
      west: west ? parseFloat(west) : undefined,
    });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tutorsService.getById(id);
  }
}

