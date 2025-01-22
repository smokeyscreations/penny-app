import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;

    @IsString() 
    fname: string;

    @IsString() 
    lname: string;
}
