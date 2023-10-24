import { IsEmail, IsNumber, IsString, IsNotEmpty } from "class-validator";
export class LoginDto {

    @IsString({ message: 'Phải là 1 chuỗi ký tự!' })
    @IsNotEmpty({ message: 'Không được để trống!' })
    @IsEmail({}, { message: 'Không đúng định dạng email!' })
    username: string

    @IsNotEmpty({ message: 'Không được để trống!' })
    @IsString({ message: 'Phải là 1 chuỗi ký tự!' })
    password: string
}