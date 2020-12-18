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
    logout,
    editTeam,
    toggleActionSheet
} from 'app/NativeActions';

class RequestedTeamMoreOptions extends Component {

  render() {

    if(this.props.actionSheet == "requested_team_more_options" && this.props.user){

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
                <Copy style={{textAlign: "center"}}>Select an option:</Copy>
              </CardBody>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.editTeam({
                      token: this.props.token,
                      team: this.props.user.requested_team,
                      type: "cancel_request",
                      payload: {
                        user: this.props.user.id,
                        team: this.props.user.requested_team
                      }
                    });
                    this.props.toggleActionSheet(null);
                  }}>
                    Cancel Request
                  </SecondaryButton>
                </Card>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.logout({token: this.props.token});
                    this.props.toggleActionSheet(null);
                  }}>
                    Logout
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
  logout,
  editTeam,
  toggleActionSheet
})(RequestedTeamMoreOptions);
