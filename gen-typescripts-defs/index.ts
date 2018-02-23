import { IType, IArgument, IFunction } from '../types';

export function typeOrArrayType(t: IType) : string {
  return `${t.type}${Array(t.arrayDepth || 0).fill(0).map(_ => '[]').join('')}`
}

export function jsonPropWithType(arg: IArgument) : string {
  return `${arg.name}: ${typeOrArrayType(arg)}`
}

export function returnValue(returnValues: IArgument[]) : string {
  return returnValues.length
    ? (
      returnValues.length === 1
        ? typeOrArrayType(returnValues[0])
        : `{ ${returnValues.map(rv => jsonPropWithType(rv)).join(', ')} }`
    )
    : 'void'
}