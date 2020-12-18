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
  saveCampaign,
  toggleActionSheet
} from 'app/NativeActions';

class DeleteCampaign extends Component {

  render() {

    if(this.props.actionSheet == "delete_campaign" && this.props.editCampaign){

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
                  Delete Campaign
                </Title>
                <Copy style={{textAlign: "center"}}>
                  Are you sure you want to delete this campaign?
                </Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.props.toggleActionSheet(null);
                    this.props.saveCampaign({
                      token: this.props.token,
                      type: "delete",
                      campaign_id: this.props.editCampaign.id
                    });
                  }}>
                    Delete Campaign
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
const mapStateToProps = ({ auth, native, campaign }) => {
  const { token, user } = auth;
  const { actionSheet, device } = native;
  const {
    editCampaign
  } = campaign;
  return {
    token,
    user,
    device,
    actionSheet,
    editCampaign
  }
}

export default connect(mapStateToProps, {
  saveCampaign,
  toggleActionSheet,
})(DeleteCampaign);
