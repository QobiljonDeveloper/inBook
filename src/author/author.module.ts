import { Module } from "@nestjs/common";
import { AuthorsService } from "./author.service";
import { AuthorsController } from "./author.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Author } from "./models/author.model";

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorModule {}
