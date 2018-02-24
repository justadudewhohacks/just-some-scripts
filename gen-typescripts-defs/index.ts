import { connection, connect } from 'mongoose'
import * as path from 'path'
import * as fs from 'fs'
import '../.env'
import { findByClassName } from './../persistence/class.model';
import { findFunctionsByOwner } from './../persistence/function.model';
import { IFunction } from './../types';
import { createFunctionSignatures, createConstructor } from './createFunctionSignatures';
import { createClassFields } from './commons';

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

async function createClassDefinitions(className: string) {
  console.log('createClassDefinitions for %s', className)

  const clazz = await findByClassName(className)

  if (!clazz)
    throw new Error(`class '${className}' not found`)

  const classFns = orderByFnName(await findFunctionsByOwner(className))

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

async function run() {
  try {
    await createClassDefinitions('Vec')
  } catch (err) {
    console.error(err)
  }
  connection.close()
}

connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PW}@${process.env.MLAB_ADDRESS}`)
  .then(run)
  .catch(err => console.error(err))