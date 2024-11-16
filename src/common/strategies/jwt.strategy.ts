import { InvalidatedTokenRepository } from '@/repositories/invalidated_token.repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private invalidatedTokenRepo: InvalidatedTokenRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const { body, method } = req;

    const tokenId = payload?.token_id;

    if (!tokenId) {
      throw new UnauthorizedException('Invalid token');
    }

    const invalidatedToken = await this.invalidatedTokenRepo.findById(tokenId);

    if (invalidatedToken) {
      throw new UnauthorizedException('Token has been invalidated');
    }

    return payload;
  }
}
