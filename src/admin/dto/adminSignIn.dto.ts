import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AdminSigninDto {
  @ApiProperty({ example: "admin@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "securePass123" })
  @IsString()
  @MinLength(6)
  password: string;
}
