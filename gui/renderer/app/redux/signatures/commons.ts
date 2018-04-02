import { ArgumentInstance, SignatureInstance } from '../../classes';
import { ArgsArrayName } from './types';

function hasArgument(
  args: ArgumentInstance[],
  uuid: string
): boolean {
  return findArgument(args, uuid)[0] !== -1
}

export function findArgument(args: ArgumentInstance[], uuid: string): [number, ArgumentInstance | null] {
  const idx = args.findIndex(arg => arg.uuid === uuid)
  return [idx, args[idx]]
}

export function findArgsArrayNameByArgUuid(
  argsArrayNames: ArgsArrayName[],
  uuid: string,
  signature: SignatureInstance
): ArgsArrayName | null {
  return argsArrayNames.find(argsArrayName => hasArgument(signature[argsArrayName] || [], uuid))
}