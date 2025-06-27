import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { IsEmail } from "sequelize-typescript";

export class CreateUserDto {
  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi ",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;
  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchi pochtasi ",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "Uzbekistan12@0",
    description: "Foydalanuvchi paroli ",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    example: "Uzbekistan12@0",
    description: "Foydalanuvchi paroli tasdiqlanadi",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
  @ApiProperty({
    example: "erkak",
    description: "foydalanuvchi genderi",
  })
  gender: string;
  @ApiProperty({
    example: "Tug'gilgan yili",
    description: "2009",
  })
  birth_year: number;
  @ApiProperty({
    example: "998132456789",
    description: "telefon raqami",
  })
  @IsPhoneNumber("UZ")
  phone: string;
}
