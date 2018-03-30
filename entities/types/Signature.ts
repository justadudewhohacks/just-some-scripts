import { IArgument, IOptionalArgument } from './Argument';

export interface ISignature {
  requiredArgs: IArgument[]
  optionalArgs: IOptionalArgument[]
  returnValues: IArgument[] | null
}