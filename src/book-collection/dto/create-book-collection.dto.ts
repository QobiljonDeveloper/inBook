import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookCollectionDto {
  @ApiProperty({ example: 1, description: "ID of the collection" })
  @IsInt()
  @IsNotEmpty()
  collectionId: number;

  @ApiProperty({ example: 10, description: "ID of the book" })
  @IsInt()
  @IsNotEmpty()
  bookId: number;
}
