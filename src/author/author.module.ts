import { Module } from "@nestjs/common";
import { AuthorsService } from "./author.service";
import { AuthorsController } from "./author.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Author } from "./models/author.model";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [SequelizeModule.forFeature([Author]), JwtModule, AdminModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorModule {}
