import { ArgumentJson, OptionalArgumentJson, ReturnValueJson } from './ArgumentJson';
import { ISignature } from '../types';

export class SignatureJson implements ISignature {
  requiredArgs: ArgumentJson[]
  optionalArgs: OptionalArgumentJson[]
  returnValues: ReturnValueJson[]

  constructor(sig?: ISignature) {
    this.requiredArgs = sig ? sig.requiredArgs.map(arg => new ArgumentJson(arg)) : []
    this.optionalArgs = sig ? sig.optionalArgs.map(arg => new OptionalArgumentJson(arg)) : []
    this.returnValues = sig ? (sig.returnValues || []).map(arg => new ReturnValueJson(arg)) : []
  }
}