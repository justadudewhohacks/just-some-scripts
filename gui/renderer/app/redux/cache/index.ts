import actionsFactory from './actions.factory'
import serviceFactory from './services.factory'

export * from './selectors'

export const actions = actionsFactory(serviceFactory())
