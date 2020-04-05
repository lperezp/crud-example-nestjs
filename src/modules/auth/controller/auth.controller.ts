import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthCredentialsDTO } from '../dto/auth-credentials.dto';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/auth.entity';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authSrvc: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authSrvc.signUp(authCredentialsDTO);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authSrvc.signIn(authCredentialsDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
