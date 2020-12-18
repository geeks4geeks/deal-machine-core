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
  cancelPlan,
  toggleActionSheet
} from 'app/NativeActions';

class CancelPlan extends Component {

  render() {

    if(this.props.actionSheet == "cancel_plan"){


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
                <Title style={{textAlign: "center"}}>Cancel Plan?</Title>
                <Copy style={{textAlign: "center"}}>Are you sure you want to cancel your DealMachine account?</Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.props.cancelPlan({
                      token: this.props.token,
                      canceled_reason: this.props.actionSheetData ? this.props.actionSheetData : ''
                    })
                    this.props.toggleActionSheet(null);
                  }}>
                    Cancel My Plan
                  </DeleteButton>
                </Card>
                <TextButton
                  onPress={()=>this.props.toggleActionSheet(null)}
                  text={"No, I Love DealMachine!"}
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
  const { actionSheet, actionSheetData, device } = native;

  return {
    token,
    actionSheet,
    actionSheetData,
    device
  }
}


export default connect(mapStateToProps, {
  cancelPlan,
  toggleActionSheet,
})(CancelPlan);
