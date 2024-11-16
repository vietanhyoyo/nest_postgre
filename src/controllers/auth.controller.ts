import {
  Body,
  Controller,
  HttpCode,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginReq } from './types/auth_types/login.req';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRes } from './types/auth_types/login.res';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('auth')
@ApiBearerAuth()
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

  @Post('logout')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  async logout(@Headers('Authorization') authorization: string) {

    if (!authorization) {
      throw new UnauthorizedException('Token is missing');
    }

    const token = authorization.split(' ')[1];

    this.authService.logout(token);
  }
}
