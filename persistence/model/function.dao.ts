import { FunctionModel } from './function.model';
import { IFunction } from '../types';

function find(owner: string, fnName: string): Promise<IFunction | null> {
  return FunctionModel.findOne({ owner, fnName }).lean().exec()
}

function findAll(): Promise<IFunction[]> {
  return FunctionModel.find({}).lean().exec()
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
  findByOwner,
  update
}
