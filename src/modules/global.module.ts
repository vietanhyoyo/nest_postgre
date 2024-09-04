import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Global()
@Module({
  providers:[
    JwtStrategy,
  ]
})
export class GlobalModule {}
