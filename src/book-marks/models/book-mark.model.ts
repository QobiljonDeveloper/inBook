import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/models/user.model";
import { Book } from "src/book/models/book.model";

interface IBook_MarksCreationAttr {
  userId: number;
  bookId: number;
  note: string;
  position: string;
}

@Table({ tableName: "book_marks" })
export class BookMark extends Model<BookMark, IBook_MarksCreationAttr> {
  @ApiProperty({ example: 1, description: "Foydalanuvchi IDsi (foreign key)" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({ example: 3, description: "Kitob IDsi (foreign key)" })
  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER, allowNull: false })
  bookId: number;

  @ApiProperty({ example: "Juda zo‘r joy edi", description: "Izoh" })
  @Column({ type: DataType.STRING })
  note: string;

  @ApiProperty({
    example: "Page 120, paragraph 2",
    description: "Pozitsiya matni",
  })
  @Column({ type: DataType.STRING })
  position: string;
}
