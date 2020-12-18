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
  SecondaryButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
    appRedirect,
    updateUserFieldChange,
    toggleActionSheet
} from 'app/NativeActions';

class SendingMode extends Component {

  render() {

    if(this.props.actionSheet == "sending_mode"){

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
                <Title style={{textAlign: "center"}}>Set Team Sending Mode</Title>
                <Copy style={{textAlign: "center"}}>Select an option:</Copy>
              </CardBody>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.updateUserFieldChange({prop: "pause_sending", value: 0});
                    this.props.updateUserFieldChange({prop: "auto_approve", value: 1});
                    this.props.toggleActionSheet(null);
                  }}>
                    Automatically Send
                  </SecondaryButton>
                </Card>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.updateUserFieldChange({prop: "pause_sending", value: 0});
                    this.props.updateUserFieldChange({prop: "auto_approve", value: 0});
                    this.props.toggleActionSheet(null);
                  }}>
                    Approve Deals Individually
                  </SecondaryButton>
                </Card>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.updateUserFieldChange({prop: "pause_sending", value: 1});
                    this.props.updateUserFieldChange({prop: "auto_approve", value: 0});
                    this.props.toggleActionSheet(null);
                  }}>
                    Stop All Sending
                  </SecondaryButton>
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
  const { token, user } = auth;
  const { device, platform, actionSheet } = native;
  return {
    token,
    user,
    device,
    platform,
    actionSheet
  }
}



export default connect(mapStateToProps, {
  appRedirect,
  updateUserFieldChange,
  toggleActionSheet
})(SendingMode);
