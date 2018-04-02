import { IClass } from '@opencv4nodejs/entities';

import { ClassModel, IClassModel } from './class.model';

async function findAll(): Promise<IClassModel[]> {
  return ClassModel.find({}).lean().exec()
}

async function findAllClassNames(): Promise<string[]> {
  return (
    await ClassModel
      .find({}, 'className')
      .select({ 'className': 1, '_id': 0})
      .exec()
  )
    .map(doc => doc.className)
}

function findByName(className: string): Promise<IClassModel | null> {
  return ClassModel.findOne({ className }).lean().exec()
}

function update(_id: string, doc: IClass): Promise<any> {
  return ClassModel.update({ _id }, doc).exec()
}

export const ClassDao = {
  findAll,
  findAllClassNames,
  findByName,
  update
}
