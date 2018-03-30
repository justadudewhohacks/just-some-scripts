export interface IType {
  arrayDepth?: number
  type: string
}

export interface IDeclaration {
  type: string
  name: string
  arrayDepth?: number
  defaultValue?: string
}

export interface IArgument extends IDeclaration {}

export interface IOptionalArgument extends IArgument {
  defaultValue: string
}