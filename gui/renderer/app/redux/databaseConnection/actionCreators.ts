import { IFunction } from '@opencv4nodejs-gen/persistence/index';
import { actionCreator } from '../reduxUtils';

export const connectToDatabaseSuccessAction = actionCreator<{}>('CONNECT_TO_DATABASE_SUCCESS')
