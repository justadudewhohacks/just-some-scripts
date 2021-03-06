import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as React from 'react';
import styled from 'styled-components';

import { FunctionInstance } from '../classes';

type Props = {
  resultFunction: FunctionInstance
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

const Indent = styled.span`
  margin-left: 20px;
`

function removeIdsAndVersion(result: string[]): string[] {
  return result.filter(l => !l.includes('"uuid":'))
}

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
          removeIdsAndVersion(
            (JSON.stringify(this.props.resultFunction, null, '\t') || '').split('\n')
          )
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