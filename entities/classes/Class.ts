import { Constructor } from '.';
import { IClass, IClassEntity } from '../types';
import { Declaration } from './Declaration';

export class Class implements IClass {
  _id?: string
  className: string
  cvModule: string
  fields: Declaration[]
  constructors: Constructor[]

  constructor(clazz?: IClass | IClassEntity) {
    if (clazz && (clazz as IClassEntity)._id) {
      this._id = (clazz as IClassEntity)._id
    }
    this.className = clazz ? clazz.className : ''
    this.cvModule = clazz ? clazz.cvModule : ''
    this.fields = clazz? clazz.fields.map(f => new Declaration(f)) : []
    this.constructors = clazz? clazz.constructors.map(sig => new Constructor(sig)) : []
  }
}

export class ClassEntity extends Class implements ClassEntity {
  _id: string

  constructor(clazz: IClassEntity) {
    super(clazz)
    clazz && clazz._id && (this._id = clazz._id)
  }
}