import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsInt,
} from "class-validator";

export class CreateCollectionDto {
  @ApiProperty({
    example: "Diniy kitoblar",
    description: "Kolleksiya nomi",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "Islomiy, tarixiy va boshqa diniy kitoblar to‘plami",
    description: "Kolleksiya haqida maʼlumot",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Kolleksiya uchun cover rasm URL",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;

  @ApiProperty({
    example: 5,
    description: "Ushbu kolleksiyani yaratgan foydalanuvchi IDsi",
  })
  @IsInt()
  @IsNotEmpty()
  createdBy: number;

  @ApiProperty({
    example: false,
    description: "Kolleksiya ommaviymi?",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiProperty({
    example: false,
    description: "Faqat premium foydalanuvchilar uchunmi?",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPremiumOnly?: boolean;

  @ApiProperty({
    example: false,
    description: "Premium kolleksiya sifatida belgilanganmi?",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;
}
