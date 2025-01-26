import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import projectEnumStatus from "../enums/projectEnumStatus";
 import { Task } from "src/tasks/entities/task.entity";

@Entity({name:'projects'})
export class Project {

    @PrimaryGeneratedColumn()
    id:number

    
    @Column()
    title:string

    
    @Column({default:projectEnumStatus.Enable ,type:'enum', enum:projectEnumStatus})
    status:projectEnumStatus


     @OneToMany(()=>Task,(task)=>task.project)
     tasks:Task[]

}
