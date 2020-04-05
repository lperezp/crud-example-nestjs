import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/auth.entity';
import { AuthCredentialsDTO } from '../dto/auth-credentials.dto';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { StatusCode } from 'src/core/enum/statusCode.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      console.log('s', StatusCode.DUPLICATE_CODE);
      if (error.code === StatusCode.DUPLICATE_CODE) {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
