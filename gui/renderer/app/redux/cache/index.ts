import actionsFactory from './actions.factory'
import serviceFactory from './services.factory'
import { State } from './types';

export const actions = actionsFactory(serviceFactory())

const types = ['string', 'number', 'boolean']

export const selectors = {
  selectTypes: function (state: State) {
    return state.classNames.concat(types)
  }
}