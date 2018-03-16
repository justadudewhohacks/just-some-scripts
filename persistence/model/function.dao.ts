import { FunctionModel } from './function.model';
import { IFunction } from '../types';

function findByOwner(owner: string): Promise<IFunction[]> {
  return FunctionModel.find({ owner }).lean().exec()
}

function find(owner: string, fnName: string): Promise<IFunction | null> {
  return FunctionModel.findOne({ owner, fnName }).lean().exec()
}

export const FunctionDao = {
  findByOwner,
  find
}
