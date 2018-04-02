import { IType, IArgument, IOptionalArgument, IDeclaration } from '@opencv4nodejs/entities';

const numberTypes = ['uint', 'int', 'uchar']

export function transformType(type: string): string {
  return numberTypes.some(t => t === type)  ? 'number' : type
}

export function typeOrArrayType(t: IType) : string {
  return `${transformType(t.type)}${Array(t.arrayDepth || 0).fill(0).map(_ => '[]').join('')}`
}

export function argWithType(arg: IDeclaration, opt = false) : string {
  return `${arg.name}${opt ? '?' : ''}: ${typeOrArrayType(arg)}`
}

export function returnValue(returnValues: IArgument[] | null) : string {
  return returnValues && returnValues.length
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

export function createClassFields(fields: IDeclaration[]) {
  return fields.map(f => `readonly ${argWithType(f)}`)
}