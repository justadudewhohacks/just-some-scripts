import { IFunction } from '../../../../../persistence/index';
import { actionCreator } from '../reduxUtils';

export const connectToDatabaseSuccessAction = actionCreator<{}>('CONNECT_TO_DATABASE_SUCCESS')
