export * from './Argument'
export * from './Class'
export * from './Function'
export * from './Signature'

import { IFunction } from './Function';
import { ISignature } from './Signature';

export interface ICppSignature extends ISignature {
  allArgs: string
}

export interface ICppFunction extends IFunction {
  signatures: ICppSignature[]
}
