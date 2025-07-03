import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { PhoneUserDto } from "./dto/phone-user.dto";
import * as otpGenerator from "otp-generator";
import { BotService } from "src/bot/bot.service";
import { Otp } from "./models/otp.model";
import { AddMinutesToDate } from "src/common/helpers/addMinutes";
import { decode, encode } from "src/common/helpers/crypto";
import { VerifyOtpDto } from "./dto/verfify.otp.dto";
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly botService: BotService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
    });

    // sendMail

    return newUser;
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async findByActivationLink(link: string): Promise<User | null> {
    return this.userModel.findOne({ where: { activation_link: link } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [updatedCount, [updated]] = await this.userModel.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`User ID ${id} topilmadi`);
    }

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`User ID ${id} topilmadi`);
    }

    return `${id} - IDli user o‘chirildi`;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.userModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
    return updatedUser;
  }
  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadGatewayException("OTP yuborishda xatolik");
    }

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const dbOtp = await this.otpModel.create({
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: dbOtp.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    return {
      message: "Otp Botga yuborildi",
      verification_key: encodedData,
    };
  }

  async verfyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phone, verification_key, otp } = verifyOtpDto;

    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);

    if (details.phone_number != phone) {
      throw new BadRequestException("Otp bu telefon raqamga yuborilmagan");
    }

    const resultOtp = await this.otpModel.findOne({
      where: { id: details.otp_id },
    });

    if (resultOtp == null) {
      throw new BadRequestException("bunday OTP mavjud emas");
    }

    if (resultOtp.verified) {
      throw new BadRequestException("Bu OTP avval tekshirilgan");
    }

    if (resultOtp.expiration_time < new Date()) {
      throw new BadRequestException("Bu OTPning vaqti o'tib ketgan");
    }

    if (otp != resultOtp.otp) {
      throw new BadRequestException("OTP noto'g'ri");
    }

    const user = await this.userModel.update(
      { is_premium: true },
      { where: { phone }, returning: true }
    );

    if (!user[1][0]) {
      throw new BadRequestException("Bunday foydalanuvchi yo'q");
    }

    resultOtp.verified = true;
    await resultOtp.save();

    return {
      message: "Siz premium user bo'ldingiz",
      user: user[1][0],
    };
  }
}
