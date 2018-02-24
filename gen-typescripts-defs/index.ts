import { connection, connect } from 'mongoose'
import * as path from 'path'
import * as fs from 'fs'
import '../.env'
import { findByClassName } from './../persistence/class.model';
import { findFunctionsByOwner } from './../persistence/function.model';
import { IFunction } from './../types';
import { createFunctionSignatures } from './createFunctionSignatures';

const lineBreak = '\r\n'
const emptyLine = `${lineBreak}${lineBreak}`

function indent(line: string): string {
  return `  ${line}`
}

function writeToFile(fileName: string, lines: string[]) {
  fs.writeFileSync(path.resolve(__dirname, '../generated', fileName), lines.join(emptyLine))
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

  const classFnDefs = classFns
    .map(createFunctionSignatures)
    .map(
      fnDefs => fnDefs
        .map(indent)
        .join(lineBreak)
    )

  const result = [
    `export class ${className} {`
  ]
    .concat(classFnDefs)
    .concat('}')

  writeToFile(`${className}.d.ts`, result)

  console.log('done')
}

async function run() {
  try {
    await createClassDefinitions('Mat')
  } catch (err) {
    console.error(err)
  }
  connection.close()
}

connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PW}@${process.env.MLAB_ADDRESS}`)
  .then(run)
  .catch(err => console.error(err))