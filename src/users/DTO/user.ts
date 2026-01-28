import { IsString, IsEmail, IsNotEmpty, IsIn } from 'class-validator';

export class UsersDefinition {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['ADMIN', 'SELLER', 'CUSTOMER'])
  role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
}
