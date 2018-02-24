import { expect } from 'chai';
import { syncFunctionSignature } from '../../gen-typescripts-defs/createFunctionSignatures';

export function syncFunctionSignatureTests() {

  it('should have no args and return void', () => {
    expect(
      syncFunctionSignature(
        'myFunc',
        {
          requiredArgs: [],
          optionalArgs: [],
          returnValues: []
        }
      )
    ).to.equal('myFunc(): void')
  })

  it('should return string', () => {
    expect(
      syncFunctionSignature(
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
    ).to.equal('myFunc(): string')
  })

  it('should return json', () => {
    expect(
      syncFunctionSignature(
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
    ).to.equal('myFunc(): { foo: string, bar: number }')
  })

  it('should have required args', () => {
    expect(
      syncFunctionSignature(
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
    ).to.equal('myFunc(foo: string, bar: number): void')
  })

  it('should have optional args', () => {
    expect(
      syncFunctionSignature(
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
              defaultValue: 1
            }
          ],
          returnValues: []
        }
      )
    ).to.equal('myFunc(foo?: string, bar?: number): void')
  })

  it('should have required and optional args', () => {
    expect(
      syncFunctionSignature(
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
              defaultValue: 1
            }
          ],
          returnValues: []
        }
      )
    ).to.equal('myFunc(foo: string, bar: number, foobar?: string, barfoo?: number): void')
  })

}