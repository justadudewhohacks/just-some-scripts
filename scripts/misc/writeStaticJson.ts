import { IClass } from '@opencv4nodejs-gen/entities';
import { ClassDao, connection, FunctionDao } from '@opencv4nodejs-gen/persistence';
import * as fs from 'fs';
import * as path from 'path';

import { FunctionJson } from '../../entities/classes/FunctionJson';

const genDir = path.resolve(__dirname, '../generated')
const baseDir = path.resolve(genDir, 'docs')


function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
}

function ensureBaseDirectory() {
  ensureDir(genDir)
  ensureDir(baseDir)
}

function writeToFile(owner: string, file: string, json: string) {
  const dir = path.resolve(baseDir, owner)
  ensureDir(dir)
  fs.writeFileSync(path.resolve(dir, file), json)
}

async function writeClassJson(clazz: IClass) {
  try {
  } catch (err) {
    console.error(err)
  }
}

async function writeFunctions(owner: string) {
  try {
    const functions = await FunctionDao.findByOwner(owner)
    const jsons = functions.map(fn => new FunctionJson(fn))
    jsons.forEach(json => writeToFile(
      json.owner,
      `${json.fnName}.json`,
      JSON.stringify(json, null, 2)
    ))
  } catch (err) {
    console.error(err)
  }
}

async function run() {
  await connection.connect()
  try {
    ensureBaseDirectory()
    const classes = await ClassDao.findAll()
    await Promise.all(classes.map(c => c.className).concat('cv').map(writeFunctions))
    //await Promise.all(classes.map(writeClassJson))
  } catch (err) {
    console.error(err)
  }
  connection.close()
}

run()