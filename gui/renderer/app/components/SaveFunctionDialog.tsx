import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'material-ui';
import { IFunction } from '@opencv4nodejs-gen/persistence';
import styled from 'styled-components';

type Props = {
  resultFunction: IFunction
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

const Indent = styled.span`
  margin-left: 20px;
`

export default class SaveFunctionDialog extends React.Component<Props> {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.onClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.onSave}
      />,
    ];

    return (
      <Dialog
        title="Save Function"
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.onClose}
        autoScrollBodyContent
      >
        {
          (JSON.stringify(this.props.resultFunction, null, '\t') || '')
            .split('\n')
            .map(l =>
              <p>
                {
                  Array((l.match(/\t/g) || []).length)
                    .fill(0)
                    .map(() => <Indent />)
                }
                { l }
              </p>)
        }
      </Dialog>
    );
  }
}