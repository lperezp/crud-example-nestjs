import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDTO } from '../../dto/auth-credentials.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSrvc: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authSrvc.signUp(authCredentialsDTO);
  }
}
