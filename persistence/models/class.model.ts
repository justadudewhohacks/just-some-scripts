import { IClass } from '@opencv4nodejs-gen/entities';
import { Document, Model, model, Schema } from 'mongoose';

import { argType, declType } from './commonTypes';

export interface IClassModel extends IClass, Document {}

const ClassSchema = new Schema({
  className: { type: String, required: true, unique: true },
  cvModule: { type: String, required: true },
  fields: [declType],
  constructors: {
    type: [{
      optionalArgs: { type: [argType] },
      requiredArgs: { type: [argType] },
      returnsOther: String,
      _id: false
    }],
    _id: false
  }
})

ClassSchema.index({ className: 1 }, { unique: true })

export const ClassModel: Model<IClassModel> = model<IClassModel>('Classes', ClassSchema)