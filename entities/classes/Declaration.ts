import { IDeclaration } from '../types';

export class Declaration {
  type: string
  name: string
  arrayDepth?: number
  defaultValue?: string

  constructor(decl?: IDeclaration) {
    this.type = decl ? decl.type : ''
    this.name =  decl ? decl.name : ''
    this.arrayDepth =  decl ? decl.arrayDepth : 0
    this.defaultValue =  decl ? decl.defaultValue : ''
  }
}