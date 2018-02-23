export interface IType {
  arrayDepth?: number
  type: string
}

export interface IArgument extends IType {
  name: string
  defaultValue?: any
}

export interface IOptionalArgument extends IArgument {
  defaultValue: any
}

export interface ISignature {
  requiredArgs: IArgument[]
  optionalArgs: IOptionalArgument[]
  returnValues: IArgument[]
}

export interface ICppSignature extends ISignature {
  allArgs: string
}

export interface IFunction {
  cvModule: string
  owner: string
  fnName: string
  hasAsync: boolean
  signatures: ICppSignature[]
}
