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
  saveSignature,
  toggleActionSheet
} from 'app/NativeActions';

class DeleteSignature extends Component {

  render() {

    if(this.props.actionSheet == "delete_signature" && this.props.editSignature){

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
                <Title style={{textAlign: "center"}}>
                  Delete Signature
                </Title>
                <Copy style={{textAlign: "center"}}>
                  Are you sure you want to delete this signature?
                </Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.props.toggleActionSheet(null);
                    this.props.saveSignature({
                      token: this.props.token,
                      type: "delete",
                      signature_id: this.props.editSignature.id
                    });
                  }}>
                    Delete Signature
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
const mapStateToProps = ({ auth, native, signature }) => {
  const { token, user } = auth;
  const { actionSheet, device } = native;
  const {
    editSignature
  } = signature;
  return {
    token,
    user,
    actionSheet,
    device,
    editSignature
  }
}

export default connect(mapStateToProps, {
  saveSignature,
  toggleActionSheet,
})(DeleteSignature);
