import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get('JWT_SECRET');
  }

  createJWTToken(body: CreateAuthDto) {
    const { username, password } = body;

    if (
      username !== this.configService.get('ADMIN_USERNAME') ||
      password !== this.configService.get('ADMIN_PASSWORD')
    ) {
      return {
        error: 'Invalid credentials',
      };
    }

    return this.jwtService.sign(
      {
        username,
        password,
      },
      { secret: this.jwtSecret },
    );
  }
}
