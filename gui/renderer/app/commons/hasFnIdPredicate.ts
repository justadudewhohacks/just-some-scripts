import { IFunction } from "@opencv4nodejs-gen/persistence";

export function hasFnIdPredicate(_id: string) {
  return function(fn: IFunction) {
    return fn._id === _id
  }
}