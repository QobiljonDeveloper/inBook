import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";
import { AdminSigninDto } from "./dto/adminSignIn.dto";
import { Response } from "express";
import { IsCreatorGuard } from "../common/guards/is_creator.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminSelfGuard } from "../common/guards/admin.serlf.guard";
@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(AuthGuard, IsCreatorGuard)
  @ApiOperation({ summary: "Admin yaratish" })
  @ApiResponse({ status: 201, type: Admin })
  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }
  @UseGuards(AuthGuard, IsCreatorGuard)
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  @UseGuards(AuthGuard, AdminSelfGuard)
  @ApiOperation({ summary: "Bitta adminni olish" })
  @ApiResponse({ status: 200, type: Admin })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }
  @UseGuards(AuthGuard, AdminSelfGuard)
  @ApiOperation({ summary: "Adminni yangilash" })
  @ApiResponse({ status: 200, type: Admin })
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(+id, dto);
  }
  @UseGuards(AuthGuard, AdminSelfGuard)
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
  @ApiOperation({ summary: "Admin login qilish" })
  @ApiResponse({
    status: 200,
    description: "Admin tizimga muvaffaqiyatli kirdi",
  })
  @Post("signin")
  async signin(
    @Body() dto: AdminSigninDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.signin(dto.email, dto.password, res);
  }
}
