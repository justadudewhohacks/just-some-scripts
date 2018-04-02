import { IDeclaration } from './Argument';
import { IConstructor } from './Signature';

export interface IClass {
  className: string
  cvModule: string
  fields: IDeclaration[]
  constructors: IConstructor[]
}

export interface IClassEntity extends IClass {
  _id: string
}