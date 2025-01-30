import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo, TodoSchema } from './todo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Todo.name, schema: TodoSchema}])
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
