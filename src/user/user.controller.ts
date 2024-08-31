import { Controller, Get, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/Userdto";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.userService.create(createUserDto);
        } catch (error) {
            throw new HttpException("Error al crear usuario", HttpStatus.BAD_REQUEST);
        }
    }

    @Post("login")
    async login(@Body() loginUserDto: CreateUserDto) {
        const user = await this.userService.validateUser(loginUserDto.email, loginUserDto.password);
        if (user) {
            return user;
        }
        throw new HttpException("Credenciales no válidas", HttpStatus.UNAUTHORIZED);
    }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }
}
