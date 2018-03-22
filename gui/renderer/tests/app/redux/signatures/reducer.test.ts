import 'mocha'
import { commonsTests } from './commons.unit';
import { reduceSignatureTests } from './reduceSignature.unit';

describe('signatures', () => {

  describe('commons', commonsTests)

  describe('reduceSignature', reduceSignatureTests)

})