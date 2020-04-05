import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from '../../dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.singUp(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
