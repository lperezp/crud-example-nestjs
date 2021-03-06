import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import * as config from 'config';

const JWT_CONFIG = config.get('jwt');
@Module({
  imports: [
    // insertamos el modulo de PassportJS
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // insertamos el módulo de JWT
    JwtModule.register({
      /*
       * Esta variable se utiliza para verificar la firma de tokens.
       *Puede ser de cualquier valor.
       */
      secret: process.env.JWT_SECRET || JWT_CONFIG.secret,
      signOptions: {
        expiresIn: JWT_CONFIG.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
