import { IType, IArgument, IOptionalArgument, ISignature } from '../types';

export function typeOrArrayType(t: IType) : string {
  return `${t.type}${Array(t.arrayDepth || 0).fill(0).map(_ => '[]').join('')}`
}

export function argWithType(arg: IArgument, opt = false) : string {
  return `${arg.name}${opt ? '?' : ''}: ${typeOrArrayType(arg)}`
}

export function returnValue(returnValues: IArgument[]) : string {
  return returnValues.length
    ? (
      returnValues.length === 1
        ? typeOrArrayType(returnValues[0])
        : `{ ${returnValues.map(rv => argWithType(rv)).join(', ')} }`
    )
    : 'void'
}

export function argList(requiredArgs: IArgument[], optionalArgs: IOptionalArgument[]) : string {
  return requiredArgs.map(arg => argWithType(arg, false))
    .concat(optionalArgs.map(arg => argWithType(arg, true)))
    .join(', ')
}

export function functionSignature(name: string, sig: ISignature) : string {
  const args = argList(sig.requiredArgs, sig.optionalArgs)
  const ret = returnValue(sig.returnValues)
  return `${name}(${args}): ${ret}`
}