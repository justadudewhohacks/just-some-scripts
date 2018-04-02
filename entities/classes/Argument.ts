import { IArgument, IOptionalArgument } from '../types';
import { Declaration } from './Declaration';

export class Argument extends Declaration implements IArgument {
  constructor(arg?: IArgument) {
    super(arg)
  }
}

export class ReturnValue extends Argument {}

export class OptionalArgument extends Argument implements IOptionalArgument {
  defaultValue: string

  constructor(arg?: IArgument) {
    super(arg)
    this.defaultValue = arg ? (arg.defaultValue || '') : ''
  }
}
