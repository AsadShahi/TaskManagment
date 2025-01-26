import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TaskEnumStatus from "../enums/TaskEnumStatus";
import { Project } from "src/projects/entities/project.entity";



@Entity({name:'tasks'})

export class Task {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column({default:TaskEnumStatus.Set ,type:'enum', enum:TaskEnumStatus})
    status:TaskEnumStatus

    @ManyToOne(()=>Project,(project)=>project.tasks)
    project:Project

}



