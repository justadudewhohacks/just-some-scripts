import { ClassModel, IClassModel } from './class.model';

async function findAll(): Promise<string[]> {
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

export const ClassDao = {
  findAll,
  findByName
}
