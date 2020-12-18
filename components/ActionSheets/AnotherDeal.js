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

class AnotherDeal extends Component {

  render() {

    if(this.props.actionSheet == "another_deal"){

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
                <Title style={{textAlign: "center"}}>Add Another Property</Title>
                <Copy style={{textAlign: "center"}}>Select type of deal to add:</Copy>
              </CardBody>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.appRedirect({redirect: "dashboard"});
                    this.props.toggleActionSheet(null);
                  }}>
                    Add an address
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

const mapStateToProps = ({ native }) => {
  const { device, platform, actionSheet } = native;
  return {
    device,
    platform,
    actionSheet
  }
}


export default connect(mapStateToProps, {
  appRedirect,
  toggleActionSheet
})(AnotherDeal);
