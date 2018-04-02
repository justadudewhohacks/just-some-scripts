export interface IType {
  type: string
  arrayDepth?: number
}

export interface IDeclaration extends IType {
  name: string
  defaultValue?: string
}

export interface IArgument extends IDeclaration {}

export interface IOptionalArgument extends IArgument {
  defaultValue: string
}