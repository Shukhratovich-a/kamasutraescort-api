import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoalEntity } from '../goal.entity';

import { GoalDto } from '../dto/goal.dto';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(GoalEntity)
    private readonly goalRepository: Repository<GoalEntity>,
  ) {}

  async findAll() {
    const goals = await this.goalRepository.find();
    if (!goals) {
      throw new HttpException('goals not found', HttpStatus.NOT_FOUND);
    }

    return goals;
  }

  async create({ nameEn, nameRu }: GoalDto) {
    const oldGoal = await this.goalRepository.findOne({ where: [{ nameEn }, { nameRu }] });
    if (oldGoal) {
      throw new HttpException('this goal exits', HttpStatus.BAD_REQUEST);
    }

    const goal = await this.goalRepository.save({ nameEn, nameRu });
    if (!goal) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.CREATED,
      message: 'created',
      goal,
    };
  }

  async update(id: number, { nameEn, nameRu }: GoalDto) {
    const oldGoal = await this.goalRepository.findOne({ where: { id } });
    if (!oldGoal) {
      throw new HttpException('goal not found', HttpStatus.BAD_REQUEST);
    }

    const goalNameCheck = await this.goalRepository.findOne({ where: [{ nameEn, nameRu }] });
    if (goalNameCheck) {
      throw new HttpException('this goal exits', HttpStatus.BAD_REQUEST);
    }

    const goal = await this.goalRepository.save({ ...oldGoal, ...{ nameEn, nameRu } });
    if (!goal) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'updated',
      goal,
    };
  }

  async delete(id: number) {
    const oldGoal = await this.goalRepository.findOne({ where: { id } });
    if (!oldGoal) {
      throw new HttpException('goal not found', HttpStatus.BAD_REQUEST);
    }

    const goal = await this.goalRepository.delete(id);
    if (!goal) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'deleted',
      goal: oldGoal,
    };
  }
}
