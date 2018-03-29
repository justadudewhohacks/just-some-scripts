import { IFunctionMetaData } from '../../../../../persistence';
import { State } from "./types";

const types = ['string', 'boolean', 'number', 'int', 'uint', 'char', 'uchar']

function selectTypes(state: State): string[] {
  return state.classNames.concat(types)
}

export const selectors = {
  selectTypes
}