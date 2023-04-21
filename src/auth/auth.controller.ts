import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create JWT Token for API' })
  @Post()
  createJWTToken(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createJWTToken(createAuthDto);
  }
}
