import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './image.entity';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
