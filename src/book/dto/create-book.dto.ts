import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, Min } from "class-validator";

export class CreateBookDto {
  @ApiProperty({
    example: "2023-01-01",
    description: "Kitob nashr etilgan sana (YYYY-MM-DD)",
  })
  @IsDateString(
    {},
    { message: "publisher_year ISO formatda sana bo‘lishi kerak" }
  )
  publisher_year: Date;

  @ApiProperty({
    example: 1,
    description: "Muallif ID (foreign key)",
  })
  @IsInt({ message: "authorId butun son bo‘lishi kerak" })
  @Min(1, { message: "authorId 1 dan katta bo‘lishi kerak" })
  authorId: number;
}
