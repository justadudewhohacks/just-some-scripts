export interface IType {
  arrayDepth?: number
  type: string
}

export interface IArgument extends IType {
  name: string
  defaultValue?: any
}

export interface ISignature {
  allArgs: string
  requiredArgs: IArgument[]
  optionalArgs: IArgument[]
  returnValues: IArgument[]
}

export interface IFunction {
  cvModule: string
  owner: string
  fnName: string
  hasAsync: boolean
  signatures: ISignature[]
}
