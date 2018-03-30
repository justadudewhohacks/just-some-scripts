import { ObjectID } from 'bson'

export function stringifyId<T>(doc: any & { _id: ObjectID }): T {
  return Object.assign({}, doc, { _id: doc._id.toHexString() })
}