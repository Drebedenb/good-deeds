import {
  BadRequestException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './shemas/user.shema';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  private users = [];

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    const newUserTag = newUser.nameTag;

    const candidate = await this.userModel.findOne({ nameTag: newUserTag });
    if (candidate) {
      throw new BadRequestException('User already registered');
    }
    newUser.password = await bcrypt.hash(newUser.password, 12);
    return newUser.save();
  }

  async login(userDto: LoginUserDto): Promise<string> {
    const loginUser = new this.userModel(userDto);
    const loginUserTag = loginUser.nameTag;

    const candidate = await this.userModel.findOne({ nameTag: loginUserTag });
    if (!candidate) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!(await bcrypt.compare(loginUser.password, candidate.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: loginUser.id });
    return jwt;
  }

  async getUser(cookie: string) {
    try {
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException('Unauthorized');
      }

      const user = await this.userModel.findOne({ id: data.id });

      return user;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }
}
