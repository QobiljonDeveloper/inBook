import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: "Technology", description: "Kategoriya nomi" })
  @IsNotEmpty({ message: "Kategoriya nomi bo‘sh bo‘lmasligi kerak" })
  @IsString({ message: "Kategoriya nomi matn bo‘lishi kerak" })
  @Length(2, 50, {
    message: "Kategoriya nomi 2-50 belgidan iborat bo‘lishi kerak",
  })
  declare name: string;
}
