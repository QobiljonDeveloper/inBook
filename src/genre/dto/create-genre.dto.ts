import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateGenreDto {
  @ApiProperty({
    example: "Comedy",
    description: "Janr nomi (majburiy)",
  })
  @IsString({ message: "Janr nomi matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Janr nomi bo‘sh bo‘lmasligi kerak" })
  @MaxLength(50, { message: "Janr nomi 50 ta belgidan oshmasligi kerak" })
  name: string;
}
