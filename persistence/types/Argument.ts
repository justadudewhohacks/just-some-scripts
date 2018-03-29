export interface IType {
  arrayDepth?: number
  type: string
}

export interface IDeclaration extends IType {
  name: string
  defaultValue?: any
}

export interface IArgument extends IDeclaration {}

export interface IOptionalArgument extends IArgument {
  defaultValue: any
}