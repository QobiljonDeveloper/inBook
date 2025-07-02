import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, IsUrl, Min } from "class-validator";

export class CreateBookVersionDto {
  @ApiProperty({
    example: 1,
    description: "Book ID (foreign key)",
  })
  @IsInt({ message: "bookId butun son bo‘lishi kerak" })
  @Min(1, { message: "bookId 1 dan katta bo‘lishi kerak" })
  bookId: number;

  @ApiProperty({
    example: 2,
    description: "Language ID (foreign key)",
  })
  @IsInt({ message: "languageId butun son bo‘lishi kerak" })
  @Min(1, { message: "languageId 1 dan katta bo‘lishi kerak" })
  languageId: number;

  @ApiProperty({
    example: "1984 (O‘zbek tilida)",
    description: "Kitob sarlavhasi (versiyasi)",
  })
  @IsString({ message: "title matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "title bo‘sh bo‘lmasligi kerak" })
  title: string;

  @ApiProperty({
    example: "Bu kitob George Orwell tomonidan yozilgan...",
    description: "Kitob haqida tavsif",
  })
  @IsString({ message: "description matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "description bo‘sh bo‘lmasligi kerak" })
  description: string;

  @ApiProperty({
    example: "https://example.com/book-text/1984-uz.txt",
    description: "Matn faylining URL manzili",
  })
  text_url: string;

  @ApiProperty({
    example: "https://example.com/covers/1984-uz.jpg",
    description: "Muqova rasm manzili (URL)",
  })
  cover_url: string;
}
