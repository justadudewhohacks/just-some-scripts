import { IFunctionMetaData } from '@opencv4nodejs/entities';
import { Checkbox, TextField } from 'material-ui';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../redux/rootReducer';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 5px;
`

type Props = {
  editedFunctionMetaData: IFunctionMetaData
}

function mapStateToProps(_: RootState) {
  return {}
}

function mapDispatchToProps(_: any) {
  return {
  }
}

class EditFunctionMetaData extends React.Component<Props> {
  render() {
    return (
      <Container>
        <TextField
          floatingLabelText="Function Name"
          hintText="Function Name"
          value={this.props.editedFunctionMetaData.fnName}
          onChange={() => console.log('onChange fnName')}
          style={{ width: 150 }}
        />
        <TextField
          floatingLabelText="Owner"
          hintText="Owner"
          value={this.props.editedFunctionMetaData.owner}
          onChange={() => console.log('onChange owner')}
          style={{ width: 150 }}
        />
        <TextField
          floatingLabelText="Cv Module"
          hintText="Cv Module"
          value={this.props.editedFunctionMetaData.cvModule}
          onChange={() => console.log('onChange cvModule')}
          style={{ width: 150 }}
        />
        <TextField
          floatingLabelText="Category"
          hintText="Category"
          value={this.props.editedFunctionMetaData.category}
          onChange={() => console.log('onChange category')}
          style={{ width: 150 }}
        />
        <Checkbox
          label="Has Async"
          checked={this.props.editedFunctionMetaData.hasAsync}
          onCheck={() => console.log('onChange onCheck')}
          style={{ width: 150 }}
        />
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFunctionMetaData)