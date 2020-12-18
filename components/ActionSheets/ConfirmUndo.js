import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ModalOverlay,
  Modal,
  Card,
  CardBody,
  Title,
  Copy,
  DeleteButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
  undoAction,
  toggleActionSheet
} from 'app/NativeActions';

class ConfimUndo extends Component {

  render() {

    if(this.props.actionSheet == "confirm_undo"){



      return (

        <ModalOverlay
          isVisible={true}
          onPress={()=>this.props.toggleActionSheet(null)}
        >
          <Modal actionSheet>
            <Card style={{
              minWidth: "95%",
              paddingBottom: this.props.device == "mobile" ? 10 : 0
            }}>
              <CardBody>
                <Title style={{textAlign: "center"}}>Undo Action</Title>
                <Copy style={{textAlign: "center"}}>Are you sure you want to undo this action?</Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.props.undoAction({token: this.props.token, change_group_id: this.props.change_log.change_group_id})
                    this.props.toggleActionSheet(null);
                  }}>
                    Undo
                  </DeleteButton>
                </Card>
                <TextButton
                  onPress={()=>this.props.toggleActionSheet(null)}
                  text={"Cancel"}
                />
            </Card>
          </Modal>
        </ModalOverlay>

      );
    }
    return <Wrapper />
  }
}
const mapStateToProps = ({ auth, modal, native }) => {
  const { token } = auth;
  const { change_log } = modal;
  const { actionSheet, device } = native;
  return {
    token,
    change_log,
    actionSheet,
    device
  }
}


export default connect(mapStateToProps, {
  undoAction,
  toggleActionSheet,
})(ConfimUndo);
