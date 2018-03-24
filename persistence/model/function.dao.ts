import { FunctionModel } from './function.model';
import { IFunction, IFunctionMetaData } from '../types';

function find(owner: string, fnName: string): Promise<IFunction | null> {
  return FunctionModel.findOne({ owner, fnName }).lean().exec()
}

function findAll(): Promise<IFunction[]> {
  return FunctionModel.find({}).lean().exec()
}

function findAllMetaData(): Promise<IFunctionMetaData[]> {
  return FunctionModel
    .find({})
    .select({ 'signatures': 0, '_id': 0, '__v': 0})
    .lean()
    .exec()
}

function findByOwner(owner: string): Promise<IFunction[]> {
  return FunctionModel.find({ owner }).lean().exec()
}

function update(_id: string, doc: IFunction): Promise<any> {
  return FunctionModel.update({ _id }, doc).exec()
}

export const FunctionDao = {
  find,
  findAll,
  findAllMetaData,
  findByOwner,
  update
}
