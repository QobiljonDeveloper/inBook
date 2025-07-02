import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookVersionService } from "./book_version.service";
import { CreateBookVersionDto } from "./dto/create-book_version.dto";
import { UpdateBookVersionDto } from "./dto/update-book_version.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BookVersion } from "./models/book_version.model";

@ApiTags("BookVersion") 
@Controller("book-version")
export class BookVersionController {
  constructor(private readonly bookVersionService: BookVersionService) {}

  @Post()
  @ApiOperation({ summary: "Yangi BookVersion yaratish" })
  @ApiResponse({
    status: 201,
    description: "BookVersion yaratildi",
    type: BookVersion,
  })
  create(@Body() createBookVersionDto: CreateBookVersionDto) {
    return this.bookVersionService.create(createBookVersionDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha BookVersionlarni olish" })
  @ApiResponse({
    status: 200,
    description: "BookVersionlar ro‘yxati",
    type: [BookVersion],
  })
  findAll() {
    return this.bookVersionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali BookVersionni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan BookVersion",
    type: BookVersion,
  })
  findOne(@Param("id") id: string) {
    return this.bookVersionService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "BookVersionni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan BookVersion",
    type: BookVersion,
  })
  update(
    @Param("id") id: string,
    @Body() updateBookVersionDto: UpdateBookVersionDto
  ) {
    return this.bookVersionService.update(+id, updateBookVersionDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "BookVersionni o‘chirish" })
  @ApiResponse({ status: 200, description: "BookVersion o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.bookVersionService.remove(+id);
  }
}
