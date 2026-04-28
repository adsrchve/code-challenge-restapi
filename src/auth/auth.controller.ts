import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request: Invalid input or email already exists' })
    @Post('register')
    register(@Body() dto:RegisterDto) {
        return this.authService.register(dto)
    }

    @ApiOperation({ summary: 'Login user registered and get JWT token' })
    @ApiResponse({ status: 200, description: 'Login successful, returns JWT token' })
    @ApiResponse({ status: 400, description: 'Bad Request: Invalid input' })
    @ApiResponse({ status: 401, description: 'Unauthorized: Wrong email or password' })
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }
}
