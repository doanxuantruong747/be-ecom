import { Role } from './../../config/role';
import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUser } from 'src/types/User';
import { User } from '../users/entities/user.entity';
import { hashPassword, retunException } from 'src/utils/helper';
import { ERROR_MAP } from 'src/constants/error';

@Injectable()
export class AuthService {
  //resgister User
  async create(createAuthDto: CreateUser) {
    const { userName, email, password } = createAuthDto;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return retunException(400, ERROR_MAP['AE001']);
    }
    const newUser = new User();
    newUser.userName = userName;
    newUser.email = email;
    newUser.password = await hashPassword(password);
    await newUser.save();
    return { message: 'Create user successfully' };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
