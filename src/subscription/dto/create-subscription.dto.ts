import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsDateString } from "class-validator";

export class CreateSubscriptionDto {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining IDsi",
  })
  @IsInt({ message: "userId butun son bo‘lishi kerak" })
  @IsNotEmpty({ message: "userId bo‘sh bo‘lmasligi kerak" })
  userId: number;

  @ApiProperty({
    example: "2025-07-01",
    description: "Obuna boshlanish sanasi (ISO 8601 formatda)",
  })
  @IsDateString()
  @IsNotEmpty({ message: "startDate bo‘sh bo‘lmasligi kerak" })
  startDate: Date;

  @ApiProperty({
    example: "2025-08-01",
    description: "Obuna tugash sanasi",
  })
  @IsDateString()
  @IsNotEmpty({ message: "endDate bo‘sh bo‘lmasligi kerak" })
  endDate: Date;
}
