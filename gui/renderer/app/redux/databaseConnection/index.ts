import actionsFactory from './actions.factory';
import serviceFactory from './services.factory';

export const actions = actionsFactory(serviceFactory())