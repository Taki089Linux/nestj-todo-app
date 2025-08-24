import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
import { Model } from 'mongoose';
import { Messages } from 'src/shared/messages';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name) private readonly todoModel: Model<Todo>
    ){};

    async findOne(id: string): Promise<Todo>{
        const todo = await this.todoModel.findById(id).exec();
        if(!todo){
            throw new NotFoundException(Messages.ITEM_NOT_FOUND);
        }
        return todo;
    }

    async findAll(): Promise<Todo[]>{
        return await this.todoModel.find().exec();
    }

    async create(data: Partial<Todo>): Promise<Todo>{
        const todo = new this.todoModel(data)
        return todo.save();
    }

    async update(id: string, data: Partial<Todo>){
        const updateTodo = await this.todoModel.findByIdAndUpdate(id, data, {new: true}).exec();
        if (!updateTodo){
            throw new NotFoundException(Messages.ITEM_NOT_FOUND);
        }
        return updateTodo;
    }

    async delete(id: string): Promise<void> {
        const result = await this.todoModel.findByIdAndDelete(id);
        if(!result){
            throw new NotFoundException(Messages.ITEM_NOT_FOUND)
        }
    }
}
