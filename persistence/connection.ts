import * as mongoose from 'mongoose'
import './.env'

const connect = function() {
  return mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PW}@${process.env.MLAB_ADDRESS}`)
}

const close = function() {
  return mongoose.connection.close()
}

export const connection = {
  connect,
  close
}