import { IsEmail, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto1 { }
export class CreateUserDto {

    @IsString({ message: 'Phải là 1 chuỗi ký tự!' })
    @IsNotEmpty({ message: 'Không được để trống!' })
    @IsEmail({}, { message: 'Không đúng định dạng email!' })
    email: string

    @IsString()
    name: string

    @IsString()
    password: string
}