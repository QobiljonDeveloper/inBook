import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { IsEmail } from "sequelize-typescript";

export class PhoneUserDto {
  @IsPhoneNumber("UZ")
  phone: string;
}
