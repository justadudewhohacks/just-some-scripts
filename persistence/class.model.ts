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