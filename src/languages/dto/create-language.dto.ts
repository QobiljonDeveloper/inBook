import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Length } from "sequelize-typescript";

export class CreateLanguageDto {
  @ApiProperty({
    example: "uz",
    description: "Davlat tilining kod raqami",
  })
  @IsNotEmpty({ message: "Til kodi bo‘sh bo‘lmasligi kerak" })
  @IsString({ message: "Til kodi matn bo‘lishi kerak" })
  declare code: string;

  @ApiProperty({ example: "Uzbek", description: "Til nomi" })
  @IsNotEmpty({ message: "Til nomi bo‘sh bo‘lmasligi kerak" })
  @IsString({ message: "Til nomi matn bo‘lishi kerak" })
  declare name: string;

  @ApiProperty({
    example: "🇺🇿",
    description: "Tilga mos bayroq emoji yoki rasm URL",
  })
  @IsNotEmpty({ message: "Bayroq bo‘sh bo‘lmasligi kerak" })
  @IsString({ message: "Bayroq qiymati matn bo‘lishi kerak" })
  declare flag: string;
}
