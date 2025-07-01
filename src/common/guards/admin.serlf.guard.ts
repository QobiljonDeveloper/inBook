import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminSelfGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new ForbiddenException("Token topilmadi");

    const token = authHeader.split(" ")[1];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_KEY,
    });

    const paramId = parseInt(req.params.id) || req.body.id;

    if (!paramId || payload.id !== paramId)
      throw new ForbiddenException(
        "Siz faqat o‘zingizga tegishli amalni bajara olasiz"
      );

    req.admin = payload;

    return true;
  }
}
