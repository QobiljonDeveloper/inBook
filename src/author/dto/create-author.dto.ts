import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class CreateAuthorDto {
  @ApiProperty({ example: "John Doe", description: "Muallifning to‘liq ismi" })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  declare full_name: string;

  @ApiProperty({
    example: "Professional yozuvchi va tarjimon.",
    description: "Muallifning biografiyasi",
  })
  @IsNotEmpty()
  @IsString()
  declare bio: string;

  @ApiProperty({
    example: "https://example.com/photo.jpg",
    description: "Muallif rasmi URL manzili",
  })
  @IsNotEmpty()
  @IsString()
  declare photo_url: string;
}
