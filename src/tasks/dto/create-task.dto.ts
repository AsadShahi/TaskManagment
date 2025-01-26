import { IsEnum, IsNotEmpty } from "class-validator";
import TaskEnumStatus from "../enums/TaskEnumStatus";

export class CreateTaskDto {

    @IsNotEmpty({ message: 'titile should not empty' })
    title: string


    @IsNotEmpty({ message: "this description should not empty" })
    description: string


    @IsEnum(TaskEnumStatus)
    status: TaskEnumStatus

    @IsNotEmpty({message:'the project should not empty'})
    project:number

    
}
