import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose/dist/soft-delete-model';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
  ) { }

  async hashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async checkPassword(password: string, hash: string) {
    const checkPass = compareSync(password, hash);
    return checkPass;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await this.hashPassword(createUserDto.password),
      //role: userRole?._id,
    });

    // Save the user to the database
    await newUser.save();

    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    const result = await this.userModel.findOne({ email: email });
    return result;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
