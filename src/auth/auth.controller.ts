import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Register new user' })
    @Post('register')
    register(@Body() dto:RegisterDto) {
        return this.authService.register(dto)
    }

    @ApiOperation({ summary: 'Login user registered and get JWT token' })
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }
}
