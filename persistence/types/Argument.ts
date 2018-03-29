export interface IType {
  arrayDepth?: number
  type: string
}

export class Declaration implements IType {
  type: string
  name: string
  arrayDepth?: number
  defaultValue?: string

  constructor() {
    this.type = ''
    this.name = ''
  }
}

export class Argument extends Declaration {}

export class OptionalArgument extends Argument {
  defaultValue: string
  constructor(arg: Argument) {
    super()
    this.type = arg.type
    this.name = arg.name
    this.arrayDepth = arg.arrayDepth
    this.defaultValue = ''
  }
}

export interface IDeclaration extends Declaration {}
export interface IArgument extends Argument {}
export interface IOptionalArgument extends OptionalArgument {}