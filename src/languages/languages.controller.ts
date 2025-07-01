import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsCreatorGuard } from "../common/guards/is_creator.guard";

@ApiTags("Languages")
@Controller("languages")
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @UseGuards(AuthGuard, IsCreatorGuard)
  @Post()
  @ApiOperation({ summary: "Yangi til qo‘shish" })
  @ApiResponse({ status: 201, description: "Til muvaffaqiyatli qo‘shildi" })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tillarni olish" })
  @ApiResponse({ status: 200, description: "Tillar ro‘yxati" })
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta tilni olish" })
  @ApiResponse({ status: 200, description: "Til topildi" })
  findOne(@Param("id") id: string) {
    return this.languagesService.findOne(+id);
  }
  @UseGuards(AuthGuard, IsCreatorGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Tilni yangilash" })
  @ApiResponse({ status: 200, description: "Til muvaffaqiyatli yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languagesService.update(+id, updateLanguageDto);
  }
  @UseGuards(AuthGuard, IsCreatorGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Tilni o‘chirish" })
  @ApiResponse({ status: 200, description: "Til muvaffaqiyatli o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.languagesService.remove(+id);
  }
}
