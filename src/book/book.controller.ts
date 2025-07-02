import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Book } from "./models/book.model";

@ApiTags("Books")
@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: "Yangi kitob yaratish" })
  @ApiResponse({ status: 201, description: "Kitob yaratildi", type: Book })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kitoblarni olish" })
  @ApiResponse({ status: 200, description: "Kitoblar ro‘yxati", type: [Book] })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Kitobni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Kitob topildi", type: Book })
  findOne(@Param("id") id: string) {
    return this.bookService.findOne(+id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Kitobni o‘chirish" })
  @ApiResponse({ status: 200, description: "Kitob o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.bookService.remove(+id);
  }
}
