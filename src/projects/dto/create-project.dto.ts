import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import projectEnumStatus from "../enums/projectEnumStatus"

export class CreateProjectDto {
    
    
    @IsNotEmpty({message:'it should not empty'})
    @IsString({message:'it should an valid name in string'})
    title:string


    @IsEnum(projectEnumStatus,{message:'this should disable or enable'})
    status:projectEnumStatus
}
