import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';

@Controller('todos')
export class TodoController {
    constructor (private readonly todoService: TodoService){};

    @Get()
    async findAll(): Promise<Todo[]>{
        return await this.todoService.findAll();
    };

    @Get(':id')
    async findOne(id: string): Promise<Todo>{
        return await this.todoService.findOne(id);
    }

    @Post()
    async create(@Body() todo: Partial<Todo>): Promise<Todo>{
        return await this.todoService.create(todo);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<Todo>): Promise<Todo> {
      return this.todoService.update(id, data);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
      return this.todoService.delete(id);
    }
}
