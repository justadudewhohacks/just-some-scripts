import { createClassDefinitions } from './createClassDefinitions'
import { connection } from '@opencv4nodejs-gen/persistence'

async function run(className: string) {
  await connection.connect()
  try {
    await createClassDefinitions(className)
  } catch (err) {
    console.error(err)
  }
  connection.close()
}

const className = 'Vec'

run(className)