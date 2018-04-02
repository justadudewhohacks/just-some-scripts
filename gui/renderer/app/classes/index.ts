import { Argument, FunctionEntity, IArgument, IFunctionEntity, ISignature, Signature } from '@opencv4nodejs/entities';
import { v1 as uuid } from 'uuid';

// TODO: didn't came up with a more reasonable class name then FunctionInstance
export class ArgumentInstance extends Argument implements IArgument {
  uuid: string

  constructor(arg?: IArgument) {
    super(arg)
    this.uuid = uuid()
  }
}

export class ReturnValueInstance extends ArgumentInstance {}

export class OptionalArgumentInstance extends ArgumentInstance {
  defaultValue: string

  constructor(arg?: IArgument) {
    super(arg)
    if (arg) {
      this.defaultValue = arg.defaultValue || ''
    }
  }
}

export class SignatureInstance extends Signature implements ISignature {
  uuid: string
  requiredArgs: ArgumentInstance[]
  optionalArgs: OptionalArgumentInstance[]
  returnValues: ReturnValueInstance[]

  constructor(sig?: ISignature) {
    super(sig)
    this.uuid = uuid()
    if (sig) {
      this.requiredArgs = sig.requiredArgs.map(arg => new ArgumentInstance(arg))
      this.optionalArgs = sig.optionalArgs.map(arg => new OptionalArgumentInstance(arg))
      this.returnValues = (sig.returnValues || []).map(arg => new ReturnValueInstance(arg))
    }
  }
}

export class FunctionInstance extends FunctionEntity implements IFunctionEntity {
  uuid: string
  signatures: SignatureInstance[]

  constructor(fun?: IFunctionEntity) {
    super(fun)
    this.uuid = uuid()
    if (fun) {
      this.signatures = fun.signatures.map(sig => new SignatureInstance(sig))
    }
  }
}