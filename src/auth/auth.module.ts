import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from './models/user.entity';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '10s' },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, JwtGuard, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
