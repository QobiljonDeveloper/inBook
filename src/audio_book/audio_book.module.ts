import { Module } from '@nestjs/common';
import { AudioBookService } from './audio_book.service';
import { AudioBookController } from './audio_book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AudioBook } from './models/audio_book.model';

@Module({
  imports:[SequelizeModule.forFeature([AudioBook])],
  controllers: [AudioBookController],
  providers: [AudioBookService],
})
export class AudioBookModule {}
