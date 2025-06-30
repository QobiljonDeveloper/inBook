import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { SigninUserDto } from "../users/dto/sign-in.dto";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { retry } from "rxjs";
import { MailService } from "src/mail/mail.service";
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_premium: user.is_premium,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const condidate = await this.usersService.findUserByEmail(
      createUserDto.email
    );
    if (condidate) {
      throw new ConflictException("Bu email allaqachon ro‘yxatdan o‘tgan");
    }

    const newUser = await this.usersService.create(createUserDto);

    //sendEmail

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      throw new ServiceUnavailableException("Email yuborishda xatolik");
    }

    return {
      message:
        "Ro'yxatdan o'tdingiz. Akkountni faollashtirish uchun emailni tasdiqlang",
    };
  }

  async signin(signInUserDto: SigninUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signInUserDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki Password noto'g'ri");
    }

    const isMatch = await bcrypt.compare(signInUserDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("Email yoki Password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateToken(user);

    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: user.id, accessToken };
  }

  async signout(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.usersService.findOne(payload.id);
      if (!user || !user.refresh_token) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi");
      }

      const isMatch = await bcrypt.compare(refreshToken, user.refresh_token);
      if (!isMatch) {
        throw new UnauthorizedException("Token mos emas");
      }

      user.refresh_token = null;
      await user.save();

      res.clearCookie("refreshToken");

      return { message: "Tizimdan chiqdingiz" };
    } catch (err) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki eskirgan");
    }
  }
  async refreshToken(req: Request, res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.usersService.findOne(payload.id);
      if (!user || !user.refresh_token) {
        throw new UnauthorizedException("Foydalanuvchi mavjud emas");
      }

      const isMatch = await bcrypt.compare(token, user.refresh_token);
      if (!isMatch) {
        throw new UnauthorizedException("Refresh token mos emas");
      }

      const { accessToken, refreshToken } = await this.generateToken(user);

      user.refresh_token = await bcrypt.hash(refreshToken, 7);
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        maxAge: +process.env.COOKIE_TIME!,
        httpOnly: true,
      });

      return {
        message: "Token yangilandi",
        accessToken,
      };
    } catch (err) {
      throw new UnauthorizedException("Refresh token eskirgan yoki noto'g'ri");
    }
  }

  async activate(activation_link: string) {
    const user = await this.usersService.findByActivationLink(activation_link);
    if (!user) {
      throw new UnauthorizedException("Link noto‘g‘ri yoki eskirgan");
    }

    if (user.is_active) {
      return { message: "Akkount allaqachon faollashtirilgan" };
    }

    user.is_active = true;
    await user.save();

    return { message: "Akkount muvaffaqiyatli faollashtirildi" };
  }
}
