import { IFunction, IFunctionEntity } from '../types';
import { SignatureJson } from './SignatureJson';

export class FunctionJson implements IFunction {
  cvModule: string
  owner: string
  fnName: string
  hasAsync: boolean
  signatures: SignatureJson[]
  category?: string

  constructor(fun?: IFunction | IFunctionEntity) {
    this.cvModule = fun ? fun.cvModule : ''
    this.owner = fun ? fun.owner : ''
    this.fnName = fun ? fun.fnName : ''
    this.hasAsync = fun ? fun.hasAsync : false
    this.category = fun ? fun.category : ''
    this.signatures = fun ? fun.signatures.map(sig => new SignatureJson(sig)) : []
  }
}