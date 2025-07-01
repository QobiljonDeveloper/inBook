import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const isExist = await this.adminRepo.findOne({
      where: { email: createAdminDto.email },
    });

    if (isExist) throw new BadRequestException("Bunday email mavjud");

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    const admin = await this.adminRepo.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    return admin;
  }

  async findAll() {
    return this.adminRepo.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findByPk(id);
    if (!admin) throw new NotFoundException("Admin topilmadi");
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const [count, rows] = await this.adminRepo.update(dto, {
      where: { id },
      returning: true,
    });

    if (!count) throw new NotFoundException("Admin topilmadi");
    return rows[0];
  }

  async remove(id: number) {
    const count = await this.adminRepo.destroy({ where: { id } });
    if (!count) throw new NotFoundException("Admin topilmadi");
    return { message: `${id}-IDli admin o‘chirildi` };
  }
  async signin(email: string, password: string, res: Response) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException("Email noto‘g‘ri");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException("Parol noto‘g‘ri");

    const payload = {
      id: admin.id,
      is_creator: admin.is_creator,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "Admin tizimga kirdi",
      accessToken,
      admin: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        is_creator: admin.is_creator,
      },
    };
  }
}
