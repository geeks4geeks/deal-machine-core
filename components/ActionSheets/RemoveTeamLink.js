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
  editTeam,
  toggleActionSheet
} from 'app/NativeActions';

class RemoveTeamLink extends Component {

  render() {

    if(this.props.actionSheet == "remove_team_link"){


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
                <Title style={{textAlign: "center"}}>
                  Deactivate Landing Page
                </Title>
                <Copy style={{textAlign: "center"}}>
                  Are you sure you want to deactivate your landing page?
                </Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{

                    this.props.editTeam({
                      token:this.props.token,
                      team: this.props.user.team_id,
                      type: "remove_team_link",
                      payload: null
                    });
                    this.props.toggleActionSheet(null);
                  }}>
                    Deactivate
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
  const { token, user } = auth;
  const { actionSheet, device } = native;

  return {
    token,
    user,
    actionSheet,
    device
  }
}


export default connect(mapStateToProps, {
  editTeam,
  toggleActionSheet,
})(RemoveTeamLink);
