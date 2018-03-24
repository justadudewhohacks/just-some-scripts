import { IFunctionMetaData } from '@opencv4nodejs-gen/persistence';
import { RootState } from "../../rootReducer";

function flatMap<T>(arr: T[][]): T[] {
  return arr.reduce((all, curr) => all.concat(curr), [])
}

export function autoCompleteFunctionName(state: RootState, like: string): string[] {
  const { functionMetaDataByOwner } = state.cache
  const [first = '', classNameLike = ''] = like.split('.').map(s => s.trim())
  const ownerLike = `${(first[0] || '').toUpperCase()}${first.substr(1)}`

  return flatMap(
    Array.from(functionMetaDataByOwner.keys())
      .filter(owner => owner.toLowerCase().startsWith(ownerLike.toLowerCase()))
      .map(matchingOwner => functionMetaDataByOwner.get(matchingOwner))
  )
    .filter(meta => !classNameLike || meta.fnName.toLowerCase().startsWith(classNameLike.toLowerCase()))
    .map(meta => `${meta.owner}.${meta.fnName}`)
}