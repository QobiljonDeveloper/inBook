import { Module } from '@nestjs/common';
import { BookVersionService } from './book_version.service';
import { BookVersionController } from './book_version.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookVersion } from './models/book_version.model';

@Module({
  imports:[SequelizeModule.forFeature([BookVersion])],
  controllers: [BookVersionController],
  providers: [BookVersionService],
})
export class BookVersionModule {}
