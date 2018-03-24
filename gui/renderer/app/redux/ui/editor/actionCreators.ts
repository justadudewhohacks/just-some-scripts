import { actionCreator } from '../../reduxUtils';

export const searchFunctionsInputChangedAction = actionCreator<{ value: string }>('SEARCH_FUNCTION_INPUT_CHANGED')