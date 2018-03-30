import { ISignature } from './Signature';

export interface IFunctionMetaData {
  cvModule: string
  owner: string
  fnName: string
  hasAsync: boolean
  category?: string
}

export interface IFunction extends IFunctionMetaData {
  signatures: ISignature[]
}

export interface IFunctionEntity extends IFunction {
  _id: string
}