import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookMarkDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi IDsi" })
  @IsInt({ message: "userId butun son bo‘lishi kerak" })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 3, description: "Kitob IDsi" })
  @IsInt({ message: "bookId butun son bo‘lishi kerak" })
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({ example: "Qiziqarli nuqta", description: "Eslatma matni" })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({
    example: "Page 120, paragraph 2",
    description: "Qayerda eslatma qo‘yilgan",
  })
  @IsString()
  @IsNotEmpty()
  position: string;
}
