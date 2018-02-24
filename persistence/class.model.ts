import { Schema, Document, Model, model } from 'mongoose';
import { declType, argType } from './commonTypes';
import { IClass } from '../types';

export interface IClassModel extends IClass, Document {}

export const ClassSchema = new Schema({
  className: { type: String, required: true, unique: true },
  cvModule: { type: String, required: true },
  fields: [declType],
  constructors: {
    type: [{
      optionalArgs: { type: [argType] },
      requiredArgs: { type: [argType] },
      returnsOther: String
    }]
  }
})

ClassSchema.index({ className: 1 }, { unique: true })

export const ClassModel: Model<IClassModel> = model<IClassModel>('Classes', ClassSchema)

export function findByClassName(className: string): Promise<IClassModel | null> {
  return ClassModel.findOne({ className }).exec()
}

export async function findAllClasses(): Promise<string[]> {
  return (
    await ClassModel
      .find({}, 'className')
      .select({ 'className': 1, '_id': 0})
      .exec()
  )
    .map(doc => doc.className)
}