import 'mocha';

import { expect } from 'chai';

import { asyncFunctionSignature } from '../../gen-typescripts-defs/createFunctionSignatures';

export function asyncFunctionSignatureTests() {

  it('should have no args and return void', () => {
    expect(
      asyncFunctionSignature(
        'myFunc',
        {
          requiredArgs: [],
          optionalArgs: [],
          returnValues: []
        }
      )
    ).to.equal('myFuncAsync(): Promise<void>')
  })

  it('should return string', () => {
    expect(
      asyncFunctionSignature(
        'myFunc',
        {
          requiredArgs: [],
          optionalArgs: [],
          returnValues: [
            {
              type: 'string',
              name: 'foo'
            }
          ]
        }
      )
    ).to.equal('myFuncAsync(): Promise<string>')
  })

  it('should return json', () => {
    expect(
      asyncFunctionSignature(
        'myFunc',
        {
          requiredArgs: [],
          optionalArgs: [],
          returnValues: [
            {
              type: 'string',
              name: 'foo'
            },
            {
              type: 'number',
              name: 'bar'
            }
          ]
        }
      )
    ).to.equal('myFuncAsync(): Promise<{ foo: string, bar: number }>')
  })

  it('should have required args', () => {
    expect(
      asyncFunctionSignature(
        'myFunc',
        {
          requiredArgs: [
            {
              type: 'string',
              name: 'foo'
            },
            {
              type: 'number',
              name: 'bar'
            }
          ],
          optionalArgs: [],
          returnValues: []
        }
      )
    ).to.equal('myFuncAsync(foo: string, bar: number): Promise<void>')
  })

  it('should have optional args', () => {
    expect(
      asyncFunctionSignature(
        'myFunc',
        {
          requiredArgs: [],
          optionalArgs: [
            {
              type: 'string',
              name: 'foo',
              defaultValue: '...'
            },
            {
              type: 'number',
              name: 'bar',
              defaultValue: '1'
            }
          ],
          returnValues: []
        }
      )
    ).to.equal('myFuncAsync(foo?: string, bar?: number): Promise<void>')
  })

  it('should have required and optional args', () => {
    expect(
      asyncFunctionSignature(
        'myFunc',
        {
          requiredArgs: [
            {
              type: 'string',
              name: 'foo'
            },
            {
              type: 'number',
              name: 'bar'
            }
          ],
          optionalArgs: [
            {
              type: 'string',
              name: 'foobar',
              defaultValue: '...'
            },
            {
              type: 'number',
              name: 'barfoo',
              defaultValue: '1'
            }
          ],
          returnValues: []
        }
      )
    ).to.equal('myFuncAsync(foo: string, bar: number, foobar?: string, barfoo?: number): Promise<void>')
  })

}