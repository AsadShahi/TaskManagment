import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',       // Ensure this is correct (use '127.0.0.1' if necessary)
      port: 3306,              // Ensure PostgreSQL is listening on this port
      username: 'root',    // Correct username (use the right one for your setup)
      password: '',            // Make sure to add the correct password if it's needed
      database: 'task_managment',  // Ensure this database exists
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    })
  , ProjectsModule, TasksModule],

})
export class AppModule {}
