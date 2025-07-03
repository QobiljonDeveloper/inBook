import { Module } from '@nestjs/common';
import { BookMarksService } from './book-marks.service';
import { BookMarksController } from './book-marks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookMark } from './models/book-mark.model';

@Module({
  imports:[SequelizeModule.forFeature([BookMark])],
  controllers: [BookMarksController],
  providers: [BookMarksService],
})
export class BookMarksModule {}
