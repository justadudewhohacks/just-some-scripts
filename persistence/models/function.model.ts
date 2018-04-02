import { IFunction } from '@opencv4nodejs/entities';
import { Document, Model, model, Schema } from 'mongoose';

import { argType } from './commonTypes';

export interface IFunctionModel extends IFunction, Document {}

const FunctionSchema = new Schema({
  fnName: { type: String, required: true },
  cvModule: { type: String, required: true },
  owner: { type: String, required: true },
  hasAsync: { type: Boolean, required: true },
  category: { type: String },
  signatures: [
    {
      returnValues: { type: [argType] },
      optionalArgs: { type: [argType] },
      requiredArgs: { type: [argType] },
      allArgs: { type: String },
      _id: false
    }
  ]
})

FunctionSchema.index({ fnName: 1, owner: 1 }, { unique: true })

export const FunctionModel: Model<IFunctionModel> = model<IFunctionModel>('Functions', FunctionSchema)