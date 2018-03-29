import { IDeclaration, IArgument, IOptionalArgument } from './Argument';

export interface IClassDocument {
  className: string,
  cvModule: string,
  fields: IDeclaration[],
  constructors: [{
    requiredArgs: IArgument[],
    optionalArgs: IOptionalArgument[],
    returnsOther: String
  }]
}

export interface IClass extends IClassDocument {
  _id: string
}