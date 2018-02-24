import { argList, returnValue } from './commons';
import { ISignature, IFunction } from '../types';

export function syncFunctionSignature(name: string, sig: ISignature) : string {
  const args = argList(sig.requiredArgs, sig.optionalArgs)
  const ret = returnValue(sig.returnValues)
  return `${name}(${args}): ${ret}`
}

export function asyncFunctionSignature(name: string, sig: ISignature) : string {
  const args = argList(sig.requiredArgs, sig.optionalArgs)
  const ret = returnValue(sig.returnValues)
  return `${name}Async(${args}): Promise<${ret}>`
}

export function createFunctionSignatures(fn: IFunction): string[] {
  return fn.signatures.map(sig => syncFunctionSignature(fn.fnName, sig))
    .concat(fn.hasAsync ? fn.signatures.map(sig => asyncFunctionSignature(fn.fnName, sig)) : [])
}

export function createConstructor(con: ISignature): string {
  const args = argList(con.requiredArgs, con.optionalArgs)
  return `constructor(${args})`
}