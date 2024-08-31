import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  // @Post("signup")
  // async signUp(@Body() signUpDto: SignUpDto) {
  //   return await this.authService.signUp(signUpDto);
  // }
  @Post("signup")
  @ApiOperation({ summary: "Create a new user account" })
  @ApiBody({
    type: SignUpDto, examples: {
      example1: {
        summary: "Valid Input - default: role set to user",
        value: {
          "name": "User Name",
          "email": "example@gmail.com",
          "password": "qwaszxdeE1@"
        }
      },
      example2: {
        summary: "Valid Input - role set to admin",
        value: {
          "name": "Admin Name",
          "email": "admin@gmail.com",
          "password": "qwaszxdeE1@",
          "role": "admin"
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: "User account created successfully. Returns a JWT token.",
    schema: {
      example: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Email already exists!",
    schema: {
      example: {
        statusCode: 400,
        message: "Email already exists!",
        error: "Bad Request",
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: "Validation failed for the provided input data.",
    schema: {
      example: {
        statusCode: 422,
        message: [
          "name should not be empty",
          "email must be an email",
          "password must be a strong password",
        ],
        error: "Unprocessable Entity",
      },
    },
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }


  // @HttpCode(HttpStatus.OK)
  // @Post('signin')
  // async signIn(@Body() signInDto: SignInDto) {
  //   return await this.authService.signIn(signInDto);
  // }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: "Sign in an existing user" })
  @ApiBody({
    type: SignInDto, examples: {
      example1: {
        summary: "Login Body",
        value: {
          "email": "example@gmail.com",
          "password": "qwaszxdeE1@"
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: "User signed in successfully. Returns a JWT token.",
    schema: {
      example: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Account has been banned due to breach of security policy. Kindly contact support if you feel this was a mistake. Thank you.",
    schema: {
      example: {
        statusCode: 400,
        message: "Account has been banned due to breach of security policy. Kindly contact support if you feel this was a mistake. Thank you.",
        error: "Bad Request",
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Invalid email or password.",
    schema: {
      example: {
        statusCode: 401,
        message: "Invalid email or password.",
        error: "Unauthorized",
      },
    },
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
