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
  toggleActionSheet
} from 'app/NativeActions';

class BillingMore extends Component {


  render() {

    if(this.props.actionSheet == "billing_more"){

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
                <Title style={{textAlign: "center"}}>More Options</Title>
                <Copy style={{textAlign: "center"}}>Select one of the following options</Copy>
              </CardBody>
              <Card>
                <SecondaryButton onPress={()=>{

                  this.props.toggleActionSheet(null);
                  this.props.appRedirect({redirect: "goForward", payload:{add: "update-card"}})
                }}>
                  Update Card On File
                </SecondaryButton>
              </Card>
              <Card>
                <SecondaryButton onPress={()=>{

                  this.props.toggleActionSheet(null);
                  this.props.appRedirect({redirect: "goForward", payload:{add: "invoices"}})
                }}>
                  View Invoices
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
  const { token, user } = auth
  const { actionSheet, device } = native;

  return {
    token,
    user,
    actionSheet,
    device
  }
}


export default connect(mapStateToProps, {
  appRedirect,
  toggleActionSheet
})(BillingMore);
