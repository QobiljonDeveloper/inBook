import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookMarksService } from "./book-marks.service";
import { CreateBookMarkDto } from "./dto/create-book-mark.dto";
import { UpdateBookMarkDto } from "./dto/update-book-mark.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BookMark } from "./models/book-mark.model";

@ApiTags("BookMarks")
@Controller("book-marks")
export class BookMarksController {
  constructor(private readonly bookMarksService: BookMarksService) {}

  @ApiOperation({ summary: "Yangi eslatma qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Eslatma yaratildi",
    type: BookMark,
  })
  @Post()
  create(@Body() createBookMarkDto: CreateBookMarkDto) {
    return this.bookMarksService.create(createBookMarkDto);
  }

  @ApiOperation({ summary: "Barcha eslatmalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Eslatmalar ro‘yxati",
    type: [BookMark],
  })
  @Get()
  findAll() {
    return this.bookMarksService.findAll();
  }

  @ApiOperation({ summary: "Bitta eslatmani olish" })
  @ApiResponse({ status: 200, description: "Topilgan eslatma", type: BookMark })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookMarksService.findOne(+id);
  }

  @ApiOperation({ summary: "Eslatmani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Eslatma yangilandi",
    type: BookMark,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBookMarkDto: UpdateBookMarkDto
  ) {
    return this.bookMarksService.update(+id, updateBookMarkDto);
  }

  @ApiOperation({ summary: "Eslatmani o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Eslatma muvaffaqiyatli o‘chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookMarksService.remove(+id);
  }
}
