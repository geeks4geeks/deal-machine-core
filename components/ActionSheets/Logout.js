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
  logout,
  toggleActionSheet
} from 'app/NativeActions';

class Logout extends Component {

  render() {

    if(this.props.actionSheet == "logout"){


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
                <Title style={{textAlign: "center"}}>Logout of your account</Title>
                <Copy style={{textAlign: "center"}}>Are you sure you want to logout?</Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.props.logout();
                    this.props.toggleActionSheet(null);
                  }}>
                    Logout
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
const mapStateToProps = ({ auth, native }) => {
  const { token } = auth;
  const { actionSheet, device } = native;

  return {
    token,
    device,
    actionSheet
  }
}


export default connect(mapStateToProps, {
  logout,
  toggleActionSheet,
})(Logout);
