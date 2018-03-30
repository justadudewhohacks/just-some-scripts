import { v1 as uuid } from 'uuid'
import { IArgument, IOptionalArgument } from '../types';

export class Argument implements IArgument {
  uuid: string
  type: string
  name: string
  arrayDepth?: number

  constructor(arg?: IArgument) {
    this.uuid = uuid()
    this.type = arg ? arg.type : ''
    this.name =  arg ? arg.name : ''
    this.arrayDepth =  arg ? arg.arrayDepth : 0
  }
}

export class OptionalArgument extends Argument implements IOptionalArgument {
  defaultValue: string

  constructor(arg?: IArgument) {
    super(arg)
    this.defaultValue = arg ? (arg.defaultValue || '') : ''
  }
}
