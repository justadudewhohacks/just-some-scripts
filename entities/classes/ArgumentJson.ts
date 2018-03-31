import { IArgument, IOptionalArgument } from '../types';

export class ArgumentJson implements IArgument {
  type: string
  name: string
  arrayDepth?: number

  constructor(arg?: IArgument) {
    this.type = arg ? arg.type : ''
    this.name =  arg ? arg.name : ''
    this.arrayDepth =  arg ? arg.arrayDepth : 0
  }
}

export class ReturnValueJson extends ArgumentJson {}

export class OptionalArgumentJson extends ArgumentJson implements IOptionalArgument {
  defaultValue: string

  constructor(arg?: IArgument) {
    super(arg)
    this.defaultValue = arg ? (arg.defaultValue || '') : ''
  }
}
