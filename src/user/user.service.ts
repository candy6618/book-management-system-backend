import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dto/register-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (item) => item.username === registerUserDto.username,
    );

    if (foundUser) {
      throw new BadGatewayException('该用户已经注册');
    }

    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    user.push(user);

    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (item) => item.username === loginUserDto.username,
    );

    if (!foundUser) {
      throw new BadGatewayException('用户不存在');
    }

    if (foundUser.password !== loginUserDto.password) {
      throw new BadGatewayException('密码错误');
    }

    return foundUser;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
