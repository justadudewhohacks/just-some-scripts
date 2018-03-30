import { v1 as uuid } from 'uuid'
import { IFunction, IFunctionEntity } from '../types';
import { Signature } from './Signature';

export class Function implements IFunction {
  uuid: string
  cvModule: string
  owner: string
  fnName: string
  hasAsync: boolean
  signatures: Signature[]
  _id?: string
  category?: string

  constructor(fun?: IFunction | IFunctionEntity) {
    this.uuid = uuid()
    if (fun && (fun as IFunctionEntity)._id) {
      this._id = (fun as IFunctionEntity)._id
    }
    this.cvModule = fun ? fun.cvModule : ''
    this.owner = fun ? fun.owner : ''
    this.fnName = fun ? fun.fnName : ''
    this.hasAsync = fun ? fun.hasAsync : false
    this.category = fun ? fun.category : ''
    this.signatures = fun ? fun.signatures.map(sig => new Signature(sig)) : []
  }
}