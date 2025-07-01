import { Module } from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { LanguagesController } from "./languages.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Language } from "./models/language.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Language]), JwtModule],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
