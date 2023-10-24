import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // (Strategy) là  chiến lược được cung cấp bởi Passport để xác thực dựa trên JWT
    constructor(private configService: ConfigService,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // tự tìm token ở bearToken
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
        });

    }

    async validate(payload: IUser) {
        const { _id, name, email, role } = payload;
        // gán biến req.user
        const userRole = role as unknown as { _id: string; name: string };
        return {
            _id,
            name,
            email,
            role,
        };
    }

}