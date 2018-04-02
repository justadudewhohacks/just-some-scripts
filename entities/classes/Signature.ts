import { ISignature } from '../types';
import { ISignatureBody, IConstructor } from '../types/Signature';
import { Argument, OptionalArgument, ReturnValue } from './Argument';

export class SignatureBody implements ISignatureBody {
  requiredArgs: Argument[]
  optionalArgs: OptionalArgument[]

  constructor(sig?: ISignatureBody) {
    this.requiredArgs = sig ? sig.requiredArgs.map(arg => new Argument(arg)) : []
    this.optionalArgs = sig ? sig.optionalArgs.map(arg => new OptionalArgument(arg)) : []
  }
}

export class Signature extends SignatureBody implements ISignature {
  returnValues: ReturnValue[]

  constructor(sig?: ISignature) {
    super(sig)
    this.returnValues = sig ? (sig.returnValues || []).map(arg => new ReturnValue(arg)) : []
  }
}

export class Constructor extends SignatureBody implements IConstructor {
  returnsOther?: string

  constructor(cons?: IConstructor) {
    super(cons)
    cons && (this.returnsOther = cons.returnsOther)
  }
}