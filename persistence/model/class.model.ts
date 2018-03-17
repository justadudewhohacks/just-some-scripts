import { Schema, Document, Model, model } from 'mongoose'
import { declType, argType } from './commonTypes'
import { IClassDocument } from '../types'

export interface IClassModel extends IClassDocument, Document {}

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