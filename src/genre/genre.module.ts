import { Module } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { GenreController } from "./genre.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Genre } from "./models/genre.model";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [SequelizeModule.forFeature([Genre]), JwtModule, AdminModule],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
