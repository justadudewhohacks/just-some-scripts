import { actionCreator } from '../../reduxUtils';

export const searchFunctionsInputChangedAction = actionCreator<{ value: string }>('SEARCH_FUNCTION_INPUT_CHANGED')
export const openSaveFunctionDialogAction = actionCreator<void>('OPEN_SAVE_FUNCTION_DIALOG')
export const closeSaveFunctionDialogAction = actionCreator<void>('CLOSE_SAVE_FUNCTION_DIALOG')