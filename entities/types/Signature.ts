import { IArgument, IOptionalArgument } from './Argument';

export interface ISignatureBody {
  requiredArgs: IArgument[]
  optionalArgs: IOptionalArgument[]
}

export interface ISignature extends ISignatureBody {
  returnValues: IArgument[] | null
}

export interface IConstructor extends ISignatureBody {
  returnsOther?: string
}