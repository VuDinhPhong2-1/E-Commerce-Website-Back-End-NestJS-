import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const isPassword = await this.usersService.checkPassword(pass, user.password);
        if (!isPassword) {
            throw new InternalServerErrorException("Tên đăng nhập không hợp lệ!");
        }
        const payLoad = {
            name: user.name,
            email: user.email,
            gender: user.gender,
            age: user.age
        }

        return payLoad;
    }

    async logIn(user: any) {
        const { _id, name, email, role, permission } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                _id,
                name,
                email,
            },
            role,
        }
    }
}
