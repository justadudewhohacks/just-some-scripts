import { ISignature } from './Signature';

export class FunctionMetaData {
  cvModule: string
  owner: string
  fnName: string
  hasAsync: boolean
  category?: string

  constructor() {
    this.cvModule = ''
    this.owner = ''
    this.fnName = ''
    this.hasAsync = false
  }
}

export class FunctionDocument extends FunctionMetaData {
  signatures: ISignature[]
  constructor() {
    super()
    this.signatures = []
  }
}

export class Function extends FunctionDocument {
  _id: string
  constructor(_id: string, fnName: string) {
    super()
    this._id = _id
    this.fnName = fnName
  }
}

export interface IFunctionMetaData extends FunctionMetaData {}
export interface IFunctionDocument extends FunctionDocument {}
export interface IFunction extends Function {}