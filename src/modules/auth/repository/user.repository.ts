import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/auth.entity';
import { AuthCredentialsDTO } from '../dto/auth-credentials.dto';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { StatusCode } from 'src/core/enum/statusCode.enum';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // https://github.com/kelektiv/node.bcrypt.js#readme
  async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    const user = new User();
    /*
     * Usamos  la funcion de genSalt para obtener bits aleatorios y lo
     * guardamos en la dB como una columna
     */
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === StatusCode.DUPLICATE_CODE) {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // agregamos esta funcion para cifrar el password y la variable salt
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
