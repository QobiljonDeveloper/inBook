import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "Admin1", description: "Admin to‘liq ismi" })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: "admin1@gmail.com", description: "Email manzili" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Admin1234!", description: "Parol" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: true,
    description: "Content yaratuvchimi",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_creator?: boolean;

  @ApiProperty({ example: true, description: "Faolligi", required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
