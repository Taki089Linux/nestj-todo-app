import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Todo extends Document {
    @Prop( {required: true})
    title: string;

    @Prop()
    description: string;

    @Prop()
    isCompleted: string;

    @Prop()
    createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);