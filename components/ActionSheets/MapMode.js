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
  switchMapMode,
  setModal,
  toggleModal
} from 'app/NativeActions';

class MapMode extends Component {


  renderCrossHairsButton(){
    if(this.props.isMobile){
      return(
        <Card>
          <SecondaryButton onPress={()=>{
            this.props.switchMapMode("glide")
            this.props.toggleActionSheet(null);
          }}>
            Crosshairs Mode
          </SecondaryButton>
        </Card>
      )
    }
  }
  render() {

    if(this.props.actionSheet == "switch_map_mode"){

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
                <Title style={{textAlign: "center"}}>Select a Map Mode</Title>
                <Copy style={{textAlign: "center"}}>How do you want to use the map?</Copy>
              </CardBody>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.switchMapMode("pin")
                    this.props.toggleActionSheet(null);
                  }}>
                    Pin Mode
                  </SecondaryButton>
                </Card>

                {this.renderCrossHairsButton()}

                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.switchMapMode("tap_to_add")
                    this.props.toggleActionSheet(null);
                  }}>
                    Tap-To-Add Mode
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

const mapStateToProps = ({ auth, native, property_map }) => {
  const { token } = auth;
  const { actionSheet, device, isMobile } = native;
  const { map_mode } = property_map;
  return {
    token,
    actionSheet,
    isMobile,
    device,
    map_mode
  }
}

export default connect(mapStateToProps, {
  toggleActionSheet,
  switchMapMode,
  setModal,
  toggleModal
})(MapMode);
