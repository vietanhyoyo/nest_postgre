import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Headers,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserReq } from 'src/controllers/types/user_types/create.user.req';
import { UserRes } from 'src/controllers/types/user_types/user.res';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Public } from 'src/common/decorators/public.decorator';
import { GetAllUserReq } from './types/user_types/get.all.user.req';
import { GetAllUserRes } from './types/user_types/get.all.user.res';

@Public()
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: UserRes,
  })
  async create(@Body() body: CreateUserReq) {
    return this.userService.createUser(body);
  }

  @Get('/')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: UserRes,
  })
  async get(@Headers('Authorization') authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException('Token is missing');
    }

    const token = authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken.user_id;

    const user = await this.userService.getUserById(userId);

    return user;
  }

  @Get('/all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllUserRes,
  })
  async getAllUsers(
    @Query() queryParams: GetAllUserReq,
  ) {
    return await this.userService.getAllUsers(queryParams);
  }
}
