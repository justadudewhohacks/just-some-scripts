import { connect } from 'mongoose'
import '../.env'

export function run() {







}

connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PW}@${process.env.MLAB_ADDRESS}`)
  .then(run)
  .catch(err => console.error(err))