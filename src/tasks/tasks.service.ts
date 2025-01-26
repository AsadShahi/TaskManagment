import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import TaskEnumStatus from './enums/TaskEnumStatus';

@Injectable()
export class TasksService {


  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>
  ) { }




  async create(createTaskDto: CreateTaskDto) {
    const { project, ...taskData } = createTaskDto

    const isproject = await this.projectRepository.findOneByOrFail({ id: project })



    const newTask = this.taskRepository.create({
      ...taskData,
      project: isproject,
    })

    return await this.taskRepository.save(newTask)


  }

  async findAll(
    status?: TaskEnumStatus,
    limit: number = 10,
    page: number = 1,
    project?: number,
  ) {

    const queryBuilder = this.taskRepository.createQueryBuilder('tasks'); 
    
    // Optional: filter by status if provided
    if (status) {
      queryBuilder.andWhere('tasks.status = :status', { status });
    }

    // Optional: filter by projectId (foreign key) if provided
    if (project) {
      queryBuilder.andWhere('tasks.projectId = :projectId', { projectId: project });
    }

    queryBuilder.leftJoinAndSelect('tasks.project','project');
    // Apply pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    // Execute the query
    const tasks = await queryBuilder.getMany();
    return tasks;
  }



  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id })
    return task
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
