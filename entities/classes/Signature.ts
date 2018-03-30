import { v1 as uuid } from 'uuid'
import { Argument, OptionalArgument, ReturnValue } from './Argument';
import { ISignature } from '../types';

export class Signature implements ISignature {
  uuid: string
  requiredArgs: Argument[]
  optionalArgs: OptionalArgument[]
  returnValues: ReturnValue[]

  constructor(sig?: ISignature) {
    this.uuid = uuid()
    this.requiredArgs = sig ? sig.requiredArgs.map(arg => new Argument(arg)) : []
    this.optionalArgs = sig ? sig.optionalArgs.map(arg => new OptionalArgument(arg)) : []
    this.returnValues = sig ? (sig.returnValues || []).map(arg => new ReturnValue(arg)) : []
  }
}