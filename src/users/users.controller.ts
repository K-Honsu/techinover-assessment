import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard, PopulatedRequest } from 'src/common/auth.guard';
import { Roles } from 'src/common/role.decorator';
import { ToggleUserBanDto } from './dto/toggle-user-ban.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';


@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Retrieve a list of users" })
  @ApiResponse({
    status: 200,
    description: "List of users retrieved successfully.",
    schema: {
      example: [
        {
          id: "60d5f484ef5f000020d12d8d",
          name: { first: "John", last: "Doe" },
          email: "john.doe@example.com",
          role: "user",
          isBanned: false,
          createdAt: "2021-06-01T12:00:00Z",
        },
        {
          id: "60d5f484ef5f000020d12d8e",
          name: { first: "Jane", last: "Smith" },
          email: "jane.smith@example.com",
          role: "admin",
          isBanned: false,
          createdAt: "2021-07-01T12:00:00Z",
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized access. Admin role is required.",
    schema: {
      example: {
        statusCode: 401,
        message: "Unauthorized access",
        error: "Unauthorized",
      },
    },
  })
  async getUsers() {
    return this.usersService.getUsers();
  }


  @UseGuards(AuthGuard)
  @Roles("admin")
  @Patch("toggle-status")
  @ApiOperation({ summary: "Toggle the ban status of a user" })
  @ApiResponse({
    status: 200,
    description: "User ban status updated successfully.",
    schema: {
      example: {
        message: "Updated User Status successfully.",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid user ID or user not found.",
    schema: {
      example: {
        statusCode: 400,
        message: "Invalid user ID or user not found.",
        error: "Bad Request",
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized access. Admin role is required.",
    schema: {
      example: {
        statusCode: 401,
        message: "Unauthorized access",
        error: "Unauthorized",
      },
    },
  })
  @ApiBody({
    type: ToggleUserBanDto, examples: {
      example1: {
        summary: "Valid Input",
        value: {
          "userId": "66d115b5dd05b0665a86c532"
        }
      }
    }
  })
  async toggleBanStatus(@Body() dto: ToggleUserBanDto) {
    return this.usersService.toggleUserBanStatus(dto);
  }

}
