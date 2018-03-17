import { Schema, Document, Model, model } from 'mongoose';
import { IFunctionDocument } from '../types';
import { argType } from './commonTypes';

export interface IFunctionModel extends IFunctionDocument, Document {}

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