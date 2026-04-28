import { UsersService } from './users.service';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findByID(id)
        if (!user) throw new NotFoundException('User not found')

        const { password_hash, ...result } = user
        return result
    }
}
