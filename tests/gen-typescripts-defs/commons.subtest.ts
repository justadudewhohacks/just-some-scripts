import 'mocha';
import { expect } from 'chai';
import { typeOrArrayType, argWithType, returnValue, argList } from '../../gen-typescripts-defs/commons';

export function commonTests() {

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

}