import 'mocha';
import { expect } from 'chai';

import { typeOrArrayType, argWithType, returnValue, argList, functionSignature } from '../gen-typescripts-defs';


describe('gen-typescripts-defs', () => {

  describe('typeOrArrayType', () => {

    it('should return plain type if arrayDepth undefined', () => {
      expect(
        typeOrArrayType({
          type: 'string'
        })
      ).to.equal('string')
    })

    it('should return plain type if arrayDepth is 0', () => {
      expect(
        typeOrArrayType({
          arrayDepth: 0,
          type: 'string'
        })
      ).to.equal('string')
    })

    it('should return single array type', () => {
      expect(
        typeOrArrayType({
          arrayDepth: 1,
          type: 'string'
        })
      ).to.equal('string[]')
    })

    it('should return double array type', () => {
      expect(
        typeOrArrayType({
          arrayDepth: 2,
          type: 'string'
        })
      ).to.equal('string[][]')
    })

  })

  describe('argWithType', () => {

    it('should return prop name with plain type', () => {
      expect(
        argWithType({
          type: 'string',
          name: 'foo'
        })
      ).to.equal('foo: string')
    })

    it('should return prop name with array type', () => {
      expect(
        argWithType({
          arrayDepth: 1,
          type: 'string',
          name: 'foo'
        })
      ).to.equal('foo: string[]')
    })

  })

  describe('returnValue', () => {

    it('should return void', () => {
      expect(
        returnValue([])
      ).to.equal('void')
    })

    it('should return single type', () => {
      expect(
        returnValue([
          {
            type: 'string',
            name: 'foo'
          }
        ])
      ).to.equal('string')
    })

    it('should return json', () => {
      expect(
        returnValue([
          {
            type: 'string',
            name: 'foo'
          },
          {
            type: 'number',
            name: 'bar'
          }
        ])
      ).to.equal('{ foo: string, bar: number }')
    })

  })

  describe('argList', () => {

    it('should be empty', () => {
      expect(
        argList([], [])
      ).to.equal('')
    })

    it('should have required arg', () => {
      expect(
        argList([
          {
            type: 'string',
            name: 'foo'
          }
        ], [])
      ).to.equal('foo: string')
    })

    it('should have required args', () => {
      expect(
        argList([
          {
            type: 'string',
            name: 'foo'
          },
          {
            type: 'number',
            name: 'bar'
          }
        ], [])
      ).to.equal('foo: string, bar: number')
    })

    it('should have optional arg', () => {
      expect(
        argList([], [
          {
            type: 'string',
            name: 'foo',
            defaultValue: '...'
          }
        ])
      ).to.equal('foo?: string')
    })

    it('should have optional args', () => {
      expect(
        argList([], [
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
        ])
      ).to.equal('foo?: string, bar?: number')
    })

    it('should have required and optional args', () => {
      expect(
        argList([
          {
            type: 'string',
            name: 'foo'
          },
          {
            type: 'number',
            name: 'bar'
          }
        ], [
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
        ])
      ).to.equal('foo: string, bar: number, foobar?: string, barfoo?: number')
    })

  })

  describe('argList', () => {

    it('should have no args and return void', () => {
      expect(
        functionSignature(
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
        functionSignature(
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
        functionSignature(
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
        functionSignature(
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
        functionSignature(
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
        functionSignature(
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

  })

})