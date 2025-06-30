import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin) {}

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
}
