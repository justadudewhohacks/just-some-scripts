import 'mocha';
import { expect } from 'chai';

import { typeOrArrayType, jsonPropWithType, returnValue } from '../gen-typescripts-defs';


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

  describe('jsonPropWithType', () => {

    it('should return prop name with plain type', () => {
      expect(
        jsonPropWithType({
          type: 'string',
          name: 'foo'
        })
      ).to.equal('foo: string')
    })

    it('should return prop name with array type', () => {
      expect(
        jsonPropWithType({
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

})