import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { TextField } from 'material-ui'

type SignatureEditorProps = {
  message: string
  sayHello: (message: string) => void
}

export const SignatureEditor: React.SFC<SignatureEditorProps> = function(props) {
  return (
    <div>
      <TextField
        hintText="Load Function Signature"
        floatingLabelText="Load Function Signature"
      />
    </div>
  )
}