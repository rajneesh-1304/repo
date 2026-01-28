import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Images)
    private readonly imageRepo: Repository<Images>,
  ) {}

  async getImages() {
    return await this.imageRepo.find();
  }
}
