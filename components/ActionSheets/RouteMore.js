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
  setModal,
  toggleModal,
  toggleActionSheet,
  removeTrackedRoute

} from 'app/NativeActions';

class RouteMore extends Component {


  render() {

    if(this.props.actionSheet == "route_more" && this.props.active_route){

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
                  this.props.setModal({
                    title: "Delete Route",
                    description: "Are you sure you want to delete this route?",
                    icon: "delete",
                    submit: "Delete Route",
                    buttonType: "destroy",
                    onPress: ()=>{
                      this.props.removeTrackedRoute({
                        token: this.props.token,
                        route_id: this.props.active_route.route_id,
                        route_type: this.props.active_route.route_type
                      })
                    },
                    cancel: 'Cancel',
                    onCancel: ()=>{}
                  });
                  this.props.toggleModal({show: true, type: "normal"});
                }}>
                  Delete Route
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

const mapStateToProps = ({ auth, native, route }) => {
  const { token, user } = auth
  const { actionSheet, device } = native;
  const { active_route } = route;

  return {
    token,
    user,
    actionSheet,
    device,
    active_route
  }
}


export default connect(mapStateToProps, {
  setModal,
  toggleModal,
  toggleActionSheet,
  removeTrackedRoute
})(RouteMore);
