import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard, PopulatedRequest } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { ToggleUserBanDto } from './dto/toggle-user-ban.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @Roles("admin")
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Roles("admin")
  @Patch("toggle-status")
  async toggleBanStatus(@Body() dto: ToggleUserBanDto) {
    return this.usersService.toggleUserBanStatus(dto)
  }
}
