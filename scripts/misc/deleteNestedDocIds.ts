import { ClassDao, connection } from '@opencv4nodejs-gen/persistence';

function removeIds(obj: any) {
  if (obj._id) {
    delete obj._id
  }
  Object.keys(obj).forEach((k) => {
    const obj2 = obj[k]
    if (obj2 && typeof obj2 === 'object') {
      removeIds(obj2)
    }
  })
}

function validate(sig: any) {
  console.log(sig)
  console.log('-------------------------')
  const clone = Object.assign({}, sig)
  delete clone._id
  if (JSON.stringify(clone).includes('_id')) {
    throw new Error(JSON.stringify(clone))
  }
  return
}

async function deleteNestedIds(sig: any, Model: any, Dao: any) {
  console.log(sig)
  console.log('-------------------------')
  const clone = Object.assign({}, sig)

  const { _id } = clone
  removeIds(clone)
  clone._id = _id

  const m = new Model(clone)
  console.log(JSON.stringify(m))

  const res = await Dao.update(_id, m)
  console.log(res)
}

async function run() {
  await connection.connect()
  try {
    //const sigs: any = await FunctionDao.findAll()
    const sigs: any = await ClassDao.findAll()
    for (let s of sigs) {
      //await deleteNestedIds(s, FunctionModel, FunctionDao)
      //await deleteNestedIds(s, ClassModel, ClassDao)
      validate(s)
    }

  } catch (err) {
    console.error(err)
  }
  connection.close()
}

run()