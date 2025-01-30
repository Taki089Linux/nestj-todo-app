Let’s build a **NestJS To-Do App** with **MongoDB** step-by-step. This will include CRUD operations (Create, Read, Update, Delete) and cover essential NestJS concepts like modules, controllers, services, and MongoDB integration. I'll assume you're using the **MongoDB Cloud Service** for your database.

---

## **1. Prerequisites**

- Node.js installed (v16+ recommended).
- MongoDB Cloud or Local MongoDB running.
- Nest CLI installed:
  ```bash
  npm install -g @nestjs/cli
  ```

---

## **2. Create the NestJS Project**

Run the following command to create a new project:
```bash
nest new nest-todo-app
```

- Choose **NPM** or **Yarn** as the package manager.

---

## **3. Install Dependencies**

We need to install the MongoDB driver and `@nestjs/mongoose` for MongoDB integration:
```bash
npm install @nestjs/mongoose mongoose
```

---

## **4. Set Up a ToDo Module**

Generate a `ToDo` module using the CLI:
```bash
nest g module todo
```

Generate a controller and service for the `ToDo` module:
```bash
nest g controller todo
nest g service todo
```

---

## **5. Create the ToDo Schema**

Define the schema to interact with the MongoDB collection. Create a file called `todo.schema.ts` inside the `todo` folder:

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ToDo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);
```

---

## **6. Register the ToDo Schema in the Module**

In `todo.module.ts`, import and register the schema with Mongoose:
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDo, ToDoSchema } from './todo.schema';
import { ToDoService } from './todo.service';
import { ToDoController } from './todo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }]),
  ],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
```

---

## **7. Connect MongoDB to the Application**

In `app.module.ts`, import `MongooseModule` and connect to your MongoDB instance:
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://<username>:<password>@cluster.mongodb.net/todo-app?retryWrites=true&w=majority'),
    ToDoModule,
  ],
})
export class AppModule {}
```

Replace `<username>` and `<password>` with your MongoDB credentials.

---

## **8. Create ToDo Service**

In `todo.service.ts`, implement the CRUD logic:

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDo } from './todo.schema';

@Injectable()
export class ToDoService {
  constructor(@InjectModel(ToDo.name) private readonly todoModel: Model<ToDo>) {}

  async findAll(): Promise<ToDo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<ToDo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException('ToDo not found');
    }
    return todo;
  }

  async create(data: Partial<ToDo>): Promise<ToDo> {
    const newToDo = new this.todoModel(data);
    return newToDo.save();
  }

  async update(id: string, data: Partial<ToDo>): Promise<ToDo> {
    const updatedToDo = await this.todoModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedToDo) {
      throw new NotFoundException('ToDo not found');
    }
    return updatedToDo;
  }

  async delete(id: string): Promise<void> {
    const result = await this.todoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('ToDo not found');
    }
  }
}
```

---

## **9. Create ToDo Controller**

In `todo.controller.ts`, define routes for CRUD operations:

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ToDoService } from './todo.service';
import { ToDo } from './todo.schema';

@Controller('todos')
export class ToDoController {
  constructor(private readonly todoService: ToDoService) {}

  @Get()
  async findAll(): Promise<ToDo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ToDo> {
    return this.todoService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<ToDo>): Promise<ToDo> {
    return this.todoService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<ToDo>): Promise<ToDo> {
    return this.todoService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
```

---

## **10. Run and Test**

1. Start the server:
   ```bash
   npm run start:dev
   ```

2. Use a tool like **Postman** or **cURL** to test the endpoints:
    - **GET /todos**: Fetch all ToDo items.
    - **GET /todos/:id**: Fetch a single ToDo by ID.
    - **POST /todos**: Create a new ToDo.
      ```json
      {
        "title": "Learn NestJS",
        "description": "Build a ToDo app",
        "isCompleted": false
      }
      ```
    - **PUT /todos/:id**: Update a ToDo by ID.
    - **DELETE /todos/:id**: Delete a ToDo by ID.

---

## **11. Folder Structure**

Your project should look like this:

```plaintext
src/
├── todo/
│   ├── todo.controller.ts
│   ├── todo.service.ts
│   ├── todo.module.ts
│   ├── todo.schema.ts
├── app.module.ts
├── main.ts
```

---

## **12. Enhance the App**
Here are some ways to improve:
1. **Validation**: Add `class-validator` for input validation.
2. **Pagination**: Implement pagination for `findAll`.
3. **Swagger**: Use `@nestjs/swagger` to generate API docs.
4. **Authentication**: Add authentication using Passport.js with JWT.

Let me know if you'd like to implement any of these enhancements!