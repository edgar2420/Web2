import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/user/dto/User";
import { CreateUserDto } from "./dto/Userdto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        return await this.userRepository.save(user);
    }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new HttpException("Contraseña invalida", HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
}
