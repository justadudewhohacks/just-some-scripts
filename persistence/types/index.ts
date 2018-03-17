export interface IType {
  arrayDepth?: number
  type: string
}

export interface IDeclaration extends IType {
  name: string
  defaultValue?: any
}

export interface IArgument extends IDeclaration {
}

export interface IOptionalArgument extends IArgument {
  defaultValue: any
}

export interface ISignature {
  requiredArgs: IArgument[]
  optionalArgs: IOptionalArgument[]
  returnValues?: IArgument[]
}

export interface ICppSignature extends ISignature {
  allArgs: string
}

export interface IFunctionDocument {
  cvModule: string
  category?: string
  owner: string
  fnName: string
  hasAsync: boolean
  signatures: ISignature[]
}

export interface IFunction extends IFunctionDocument {
  _id: string
}

export interface ICppFunction extends IFunction {
  signatures: ICppSignature[]
}

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
