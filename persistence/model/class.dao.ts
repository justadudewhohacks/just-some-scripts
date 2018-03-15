import { ClassModel, IClassModel } from './class.model';

function findByClassName(className: string): Promise<IClassModel | null> {
  return ClassModel.findOne({ className }).exec()
}

async function findAllClasses(): Promise<string[]> {
  return (
    await ClassModel
      .find({}, 'className')
      .select({ 'className': 1, '_id': 0})
      .exec()
  )
    .map(doc => doc.className)
}

export const ClassDao = {
  findAllClasses,
  findByClassName
}
