import { IDeclaration, IArgument, IOptionalArgument } from './Argument';

export interface IClass {
  className: string,
  cvModule: string,
  fields: IDeclaration[],
  constructors: [{
    requiredArgs: IArgument[],
    optionalArgs: IOptionalArgument[],
    returnsOther: String
  }]
}

export interface IClassEntity extends IClass {
  _id: string
}