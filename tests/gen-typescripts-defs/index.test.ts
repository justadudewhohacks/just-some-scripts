import { expect } from 'chai';
import { IFunction } from './../../types';
import { commonTests } from "./commons.subtest";
import { syncFunctionSignatureTests } from './syncFunctionSignature.subtest';
import { asyncFunctionSignatureTests } from './asyncFunctionSignature.subtest';
import { createFunctionSignatures } from '../../gen-typescripts-defs/createFunctionSignatures';


describe('gen-typescripts-defs', () => {

  describe('commons', commonTests)

  describe('syncFunctionSignature', syncFunctionSignatureTests)

  describe('asyncFunctionSignature', asyncFunctionSignatureTests)

  describe('createFunctionSignatures', () => {
    function getExampleFunction (hasAsync: boolean): IFunction {
      const returnValues = [
        {
          type: 'string',
          name: 'foo'
        },
        {
          type: 'number',
          name: 'bar'
        }
      ]

      const optionalArgs = [
        {
          type: 'string',
          name: 'foobar',
          defaultValue: '...'
        }
      ]

      return {
        cvModule: 'whoCares...',
        owner: 'whoCares...',
        category: 'whoCares...',
        fnName: 'myFunc',
        hasAsync,
        signatures: [
          {
            requiredArgs: [
              {
                type: 'string',
                name: 'foo'
              }
            ],
            optionalArgs,
            returnValues
          },
          {
            requiredArgs: [
              {
                type: 'number',
                name: 'bar'
              }
            ],
            optionalArgs,
            returnValues
          }
        ]
      }
    }

    it('should create only sync function type definitions', () => {
      const defs = createFunctionSignatures(getExampleFunction(false))
      expect(defs).to.be.an('array').lengthOf(2)
      expect(defs[0]).to.equal(
        'myFunc(foo: string, foobar?: string): { foo: string, bar: number }'
      )
      expect(defs[1]).to.equal(
        'myFunc(bar: number, foobar?: string): { foo: string, bar: number }'
      )
    })

    it('should create sync and async function type definitions', () => {
      const defs = createFunctionSignatures(getExampleFunction(true))
      expect(defs).to.be.an('array').lengthOf(4)
      expect(defs[0]).to.equal(
        'myFunc(foo: string, foobar?: string): { foo: string, bar: number }'
      )
      expect(defs[1]).to.equal(
        'myFunc(bar: number, foobar?: string): { foo: string, bar: number }'
      )
      expect(defs[2]).to.equal(
        'myFuncAsync(foo: string, foobar?: string): Promise<{ foo: string, bar: number }>'
      )
      expect(defs[3]).to.equal(
        'myFuncAsync(bar: number, foobar?: string): Promise<{ foo: string, bar: number }>'
      )
    })

  })

})
