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
  toggleActionSheet,
  setPropertiesLimit
} from 'app/NativeActions';

class LeadsPerPage extends Component {



  render() {

    if(this.props.actionSheet == "leads_per_page"){

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
                <Title style={{textAlign: "center"}}>Number of leads per page.</Title>
                <Copy style={{textAlign: "center"}}>How many leads do you want displayed per page?</Copy>
              </CardBody>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.setPropertiesLimit(25)
                    this.props.toggleActionSheet(null);
                  }}>
                    25 Per Page
                  </SecondaryButton>
                </Card>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.setPropertiesLimit(50)
                    this.props.toggleActionSheet(null);
                  }}>
                    50 Per Page
                  </SecondaryButton>
                </Card>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.setPropertiesLimit(100)
                    this.props.toggleActionSheet(null);
                  }}>
                    100 Per Page
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
  const { token } = auth;
  const { actionSheet, device } = native;
  return {
    token,
    actionSheet,
    device
  }
}

export default connect(mapStateToProps, {
  toggleActionSheet,
  setPropertiesLimit
})(LeadsPerPage);
