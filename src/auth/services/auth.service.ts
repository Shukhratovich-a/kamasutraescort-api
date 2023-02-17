import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';

import { User } from '../models/user.interface';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  doesUserExist(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ where: { email } })).pipe(
      switchMap((user: User) => {
        return of(!!user);
      }),
    );
  }

  registerAccount(user: User): Observable<User> {
    const { username, password, email, gender } = user;

    return this.doesUserExist(email).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist)
          throw new HttpException(
            'A user has already been created with this email address',
            HttpStatus.BAD_REQUEST,
          );
      }),
      switchMap(() => {
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(
              this.userRepository.save({
                username,
                email,
                gender,
                password: hashedPassword,
              }),
            ).pipe(
              map((user: User) => {
                delete user.password;
                return user;
              }),
            );
          }),
        );
      }),
    );
  }

  validateUser(
    email: string,
    username: string,
    password: string,
  ): Observable<User> {
    return from(
      this.userRepository.findOne({
        select: ['id', 'username', 'email', 'password', 'gender'],
        where: [{ email }, { username }],
      }),
    ).pipe(
      switchMap((user: User) => {
        console.log(user);

        if (!user) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            } else {
              throw new HttpException(
                { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
                HttpStatus.FORBIDDEN,
              );
            }
          }),
        );
      }),
    );
  }

  login(user: User): Observable<string> {
    const { email, username, password } = user;

    return this.validateUser(email, username, password).pipe(
      switchMap((user: User) => {
        if (user) {
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }

  getJwtUser(jwt: string): Observable<User | null> {
    return from(this.jwtService.verifyAsync(jwt)).pipe(
      map(({ user }: { user: User }) => {
        return user;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }
}
