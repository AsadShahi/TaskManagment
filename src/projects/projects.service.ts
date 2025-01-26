import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import projectEnumStatus from './enums/projectEnumStatus';
import { NotFoundError } from 'rxjs';
import { error } from 'console';

@Injectable()
export class ProjectsService {


  // constructor
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {

    try {
      const newProject = this.projectRepository.create(createProjectDto)
      return await this.projectRepository.save(newProject)

    } catch (error) {
      throw new BadRequestException('internal server error')
    }


  }


  async findAll(status?: projectEnumStatus, limit: number = 10, page: number = 1) {
    const query = this.projectRepository.createQueryBuilder('projects');

    // Add status filter if status is provided
    if (status) {
      query.where('projects.status = :status', { status });
    }

    // Apply pagination: skip for the offset and take for the limit
    query.skip((page - 1) * limit).take(limit);

    return await query.getMany();
  }


  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id })
    if (!project) {
      throw new NotFoundException(`This action returns a #${id} project`)
    }
    return project
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {

    const project = await this.projectRepository.findOneBy({ id })
    if (!project) {
      throw new NotFoundException(`This action returns a #${id} project`)
    }


    try {
      const updateProject = await this.projectRepository.update(id, updateProjectDto)
      return updateProject;
      
    } catch (error) {
      throw new BadRequestException('internal server error')
    }
       
   
  }

  async remove(id: number):Promise<void> {

    const result=this.projectRepository.delete({id:id})
    
   if(!result){
    throw new NotFoundException('not found')
   }


  }
}
