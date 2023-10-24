import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { request } from 'https';
import { Response } from 'express';
import { Public, User } from 'src/decorators/customize';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IUser } from 'src/user/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@User() user: IUser) {
        return this.authService.logIn(user);
    }


    @Get()
    fetchAccount(@User() user: IUser) {
        return user
    }
}
