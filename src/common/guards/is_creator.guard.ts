import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "src/admin/models/admin.model";

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin) private adminRepo: typeof Admin
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new ForbiddenException("Token topilmadi");

    const token = authHeader.split(" ")[1];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_KEY,
    });

    const admin = await this.adminRepo.findByPk(payload.id);
    if (!admin || !admin.is_creator)
      throw new ForbiddenException("Siz bu amalni bajara olmaysiz");

    req.admin = admin;

    return true;
  }
}
