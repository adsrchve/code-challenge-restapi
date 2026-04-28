import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async register(dto) {
        const hashed = await bcrypt.hash(dto.password, 10)

        const user = await this.usersService.create({
            email: dto.email,
            username: dto.username,
            password_hash: hashed,
        })

        return user
    }

    async login(dto) {
        const user = await this.usersService.findByEmail(dto.email)
        if (!user) throw new UnauthorizedException('User not found')

        const isMatch = await bcrypt.compare(dto.password, user.password_hash)
        if (!isMatch) throw new UnauthorizedException('Invalid Password')
        
        const payload = { sub: user.id, email: user.email }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
