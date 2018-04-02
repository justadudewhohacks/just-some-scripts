import { IFunctionEntity, IFunctionMetaData } from '@opencv4nodejs/entities';

import { FunctionModel } from './function.model';

function find(owner: string, fnName: string): Promise<IFunctionEntity | null> {
  return FunctionModel.findOne({ owner, fnName }).lean().exec()
}

function findAll(): Promise<IFunctionEntity[]> {
  return FunctionModel.find({}).lean().exec()
}

function findAllMetaData(): Promise<IFunctionMetaData[]> {
  return FunctionModel
    .find({})
    .select({ 'signatures': 0, '_id': 0, '__v': 0})
    .lean()
    .exec()
}

function findByOwner(owner: string): Promise<IFunctionEntity[]> {
  return FunctionModel.find({ owner }).lean().exec()
}

function update(_id: string, doc: IFunctionEntity): Promise<any> {
  return FunctionModel.update({ _id }, doc).exec()
}

export const FunctionDao = {
  find,
  findAll,
  findAllMetaData,
  findByOwner,
  update
}
