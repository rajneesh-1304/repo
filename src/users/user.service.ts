import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './user.interface';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async register(data) {
    const userRepo = this.dataSource.getRepository(User);

    const existingUser = await userRepo.findOne({
      where: { email: data.email },
    });
    if (existingUser) throw new ConflictException('Email already registered');

    if (data.password.length < 8)
      throw new BadRequestException('Password must be at least 8 characters');

    if (data.role === 'ADMIN') {
      throw new ForbiddenException('Cannot register as admin');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = userRepo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });

    await userRepo.save(user);
    return { message: 'User registered successfully' };
  }

  async login(data) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email: data.email } });
    if (!user) throw new NotFoundException('User not found');

    if (user.is_banned) {
      throw new ForbiddenException('User is banned');
    }

    const isMatchPassword = await bcrypt.compare(data.password, user.password);
    if (!isMatchPassword) {
      throw new BadRequestException('Incorrect Password');
    }
    return {
      message: 'User logged in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getAll() {
    const userRepo = this.dataSource.getRepository(User);
    return await userRepo.find();
  }

  async deleteUser(id: number) {
    console.log('afsdfasdf', id);
    const userRepo = this.dataSource.getRepository(User);
    await userRepo.delete(id);
    return { message: 'User deleted successfully' };
  }

  async banUser(id: number) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await userRepo.update({ id }, { is_banned: true });
    return { message: 'User banned successfully' };
  }

  async unbanUser(id: number) {
    const userRepo = this.dataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await userRepo.update({ id }, { is_banned: false });

    return { message: 'User unbanned successfully' };
  }
}
