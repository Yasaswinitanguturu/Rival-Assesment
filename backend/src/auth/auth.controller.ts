import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    // This will print to your VS Code terminal
    console.log('Received Body:', body);

    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('The request body is empty! Check Thunder Client settings.');
    }

    return this.authService.register(body.email, body.password, body.name);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}