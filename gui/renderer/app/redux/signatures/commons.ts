import { Argument, Signature } from '@opencv4nodejs-gen/entities';

import { ArgsArrayName } from './types';

function hasArgument(
  args: Argument[],
  uuid: string
): boolean {
  return findArgument(args, uuid)[0] !== -1
}

export function findArgument(args: Argument[], uuid: string): [number, Argument | null] {
  const idx = args.findIndex(arg => arg.uuid === uuid)
  return [idx, args[idx]]
}

export function findArgsArrayNameByArgUuid(
  argsArrayNames: ArgsArrayName[],
  uuid: string,
  signature: Signature
): ArgsArrayName | null {
  return argsArrayNames.find(argsArrayName => hasArgument(signature[argsArrayName] || [], uuid))
}