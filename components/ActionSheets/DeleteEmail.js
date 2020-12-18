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
  editOPM,
  toggleActionSheet
} from 'app/NativeActions';

class DeleteEmail extends Component {

  render() {

    if(this.props.actionSheet == "delete_email_address"){


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
                <Title style={{textAlign: "center"}}>Remove Email Address</Title>
                <Copy style={{textAlign: "center"}}>Are you sure you want to remove this email address?</Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.props.editOPM({token: this.props.token, deal_id: this.props.info.id, type: "remove_email", payload: {
                      email_id: this.props.editHouse.email_id
                    }});
                    this.props.toggleActionSheet(null);
                  }}>
                    Remove Email Address
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
const mapStateToProps = ({ auth, house, native }) => {
  const { token } = auth;
  const { actionSheet, device } = native;
  const { editHouse, info } = house

  return {
    token,
    actionSheet,
    device,
    editHouse,
    info
  }
}


export default connect(mapStateToProps, {
  editOPM,
  toggleActionSheet,
})(DeleteEmail);
