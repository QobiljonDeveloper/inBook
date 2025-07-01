import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AuthorsService } from "./author.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Author } from "./models/author.model";
import { IsCreatorGuard } from "../common/guards/is_creator.guard";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiTags("Authors")
@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi muallif qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Muallif muvaffaqiyatli yaratildi",
    type: Author,
  })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }
  @UseGuards(AuthGuard, IsCreatorGuard)
  @Get()
  @ApiOperation({ summary: "Barcha mualliflarni olish" })
  @ApiResponse({
    status: 200,
    description: "Mualliflar ro‘yxati",
    type: [Author],
  })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta muallifni olish" })
  @ApiResponse({ status: 200, description: "Muallif topildi", type: Author })
  findOne(@Param("id") id: string) {
    return this.authorsService.findOne(+id);
  }
  @UseGuards(AuthGuard, IsCreatorGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Muallifni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Muallif muvaffaqiyatli o‘chirildi",
  })
  remove(@Param("id") id: string) {
    return this.authorsService.remove(+id);
  }
}
