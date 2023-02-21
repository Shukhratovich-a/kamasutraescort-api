import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionDto } from '../dto/region.dto';
import { RegionEntity } from '../region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async findAll() {
    const regions = await this.regionRepository.find();
    if (!regions) {
      throw new HttpException('regions not found', HttpStatus.NOT_FOUND);
    }

    return regions;
  }

  async create(body: RegionDto) {
    const regionName = await this.regionRepository.findOne({
      where: { regionName: body.regionName },
    });
    if (regionName) {
      throw new HttpException('this region name exits', HttpStatus.BAD_REQUEST);
    }

    const region = await this.regionRepository.save(body);
    if (!region) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.CREATED,
      message: 'created',
      region,
    };
  }

  async update(id: number, { regionName }: RegionDto) {
    const oldRegion = await this.regionRepository.findOne({
      where: { id },
    });
    if (!oldRegion) {
      throw new HttpException('region not found', HttpStatus.BAD_REQUEST);
    }

    const regionNameCheck = await this.regionRepository.findOne({
      where: { regionName },
    });
    if (regionNameCheck) {
      throw new HttpException('region name exits', HttpStatus.BAD_REQUEST);
    }

    const region = await this.regionRepository.save({
      ...oldRegion,
      ...{ regionName },
    });
    if (!region) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'updated',
      region,
    };
  }

  async delete(id: number) {
    const oldRegion = await this.regionRepository.findOne({
      where: { id },
    });
    if (!oldRegion) {
      throw new HttpException('region not found', HttpStatus.BAD_REQUEST);
    }

    const region = await this.regionRepository.delete(id);
    if (!region) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'deleted',
      region: oldRegion,
    };
  }
}
