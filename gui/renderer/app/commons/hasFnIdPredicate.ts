import { Function } from '@opencv4nodejs-gen/entities';

export function hasFnIdPredicate(uuid: string) {
  return function(fn: Function) {
    return fn.uuid === uuid
  }
}