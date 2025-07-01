import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Category } from "./models/category.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminSelfGuard } from "../common/guards/admin.serlf.guard";
import { IsCreatorGuard } from "../common/guards/is_creator.guard";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard, IsCreatorGuard)
  @Post()
  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kategoriya yaratildi",
    type: Category,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }
  @Get()
  @ApiOperation({ summary: "Barcha kategoriyalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya ro‘yxati",
    type: [Category],
  })
  findAll() {
    return this.categoriesService.findAll();
  }
  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta kategoriya olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya topildi",
    type: Category,
  })
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }
  @UseGuards(AuthGuard, IsCreatorGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Kategoriya o‘chirish" })
  @ApiResponse({ status: 200, description: "Kategoriya o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
