import { IArgument, IOptionalArgument } from './Argument';

export class Signature {
  requiredArgs: IArgument[]
  optionalArgs: IOptionalArgument[]
  returnValues: IArgument[] | null

  constructor() {
    this.requiredArgs = []
    this.optionalArgs = []
    this.returnValues = []
  }
}

export interface ISignature extends Signature {}