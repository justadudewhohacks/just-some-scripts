import { IFunction } from '@opencv4nodejs/entities';
import { ClassDao, FunctionDao } from '@opencv4nodejs/persistence';
import * as fs from 'fs';
import * as path from 'path';

import { createClassFields } from './commons';
import { createConstructor, createFunctionSignatures } from './createFunctionSignatures';

const lineBreak = '\r\n'

function indent(line: string): string {
  return `  ${line}`
}

function appendSemicolon(line: string): string {
  return `${line};`
}

function addLineBreak(line: string): string {
  return `${line}${lineBreak}`
}

function writeToFile(fileName: string, lines: string[]) {
  fs.writeFileSync(path.resolve(__dirname, '../generated', fileName), lines.join(''))
}

function orderByFnName(classFns: IFunction[]): IFunction[] {
  return classFns.sort((c1: any, c2: any) => c1.fnName < c2.fnName ? -1 : 1)
}

export async function createClassDefinitions(className: string) {
  console.log('createClassDefinitions for %s', className)

  const clazz = await ClassDao.findByName(className)

  if (!clazz)
    throw new Error(`class '${className}' not found`)

  const classFns = orderByFnName(await FunctionDao.findByOwner(className))

  console.log('found %s member functions for class %s', classFns.length, className)

  const fieldDefs = createClassFields(clazz.fields)
  const constructorDefs = clazz.constructors.map(createConstructor)

  const classFnDefs = classFns
    .map(createFunctionSignatures)
    .reduce((all, arr) => all.concat(arr), [])

  const allDefs = fieldDefs
    .concat(constructorDefs)
    .concat(classFnDefs)
    .map(indent)
    .map(appendSemicolon)

  const result = [
    `export class ${className} {`
  ]
    .concat(allDefs)
    .concat('}')
    .map(addLineBreak)

  writeToFile(`${className}.d.ts`, result)

  console.log('done')
}