import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginReq } from './types/auth_types/login.req';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRes } from './types/auth_types/login.res';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from 'src/common/guards/local.guard';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: LoginRes,
  })
  async login(@Body() request: LoginReq) {
    return await this.authService.validate(request);
  }
}
