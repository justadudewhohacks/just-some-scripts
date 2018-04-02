import { Signature } from '.';
import { IFunction, IFunctionEntity } from '../types';

export class Function implements IFunction {
  cvModule: string
  owner: string
  fnName: string
  hasAsync: boolean
  signatures: Signature[]
  category?: string

  constructor(fun?: IFunction) {
    this.cvModule = fun ? fun.cvModule : ''
    this.owner = fun ? fun.owner : ''
    this.fnName = fun ? fun.fnName : ''
    this.hasAsync = fun ? fun.hasAsync : false
    this.category = fun ? fun.category : ''
    this.signatures = fun ? fun.signatures.map(sig => new Signature(sig)) : []
  }
}

export class FunctionEntity extends Function implements IFunctionEntity {
  _id: string

  constructor(fun: IFunctionEntity) {
    super(fun)
    fun && fun._id && (this._id = fun._id)
  }
}