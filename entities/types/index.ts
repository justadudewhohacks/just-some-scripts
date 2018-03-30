export * from './Argument'
export * from './Class'
export * from './Function'
export * from './Signature'

import { IFunctionEntity } from './Function';
import { ISignature } from './Signature';

export interface ICppSignature extends ISignature {
  allArgs: string
}

export interface ICppFunction extends IFunctionEntity {
  signatures: ICppSignature[]
}
