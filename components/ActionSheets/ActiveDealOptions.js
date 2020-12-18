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
  toggleActionSheet,
  updateHouse
} from 'app/NativeActions';

class ActiveDealOptions extends Component {

  renderApproveButton(){
    if(this.props.active_property.deal.status != 2){
      if(this.props.active_property.deal.approved != 1 && this.props.active_property.deal.archived != 1 && this.props.active_property.deal.closed != 1){
        if(this.props.user.team_clearance_level > 1 || this.props.user.can_approve_mail == 1){
          if(this.props.active_property.deal.campaign_id != 0){
            return (
              <Card>
                <SecondaryButton onPress={()=>{
                  this.props.updateHouse({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "approve_main"});
                  this.props.toggleActionSheet(null);
                }}>
                {this.props.active_property.deal.paused == 1 ? "Resume Campaign" : "Start Campaign"}

                </SecondaryButton>
              </Card>
            )
          }else{
            return (
              <Card>
                <SecondaryButton onPress={()=>{
                  this.props.updateHouse({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "approve_main"});
                  this.props.toggleActionSheet(null);
                }}>

                {this.props.active_property.deal.paused == 1 ? "Resume Mailers" : "Start Mailers"}
                </SecondaryButton>
              </Card>
            )
          }
        }

      }else if(this.props.active_property.deal.approved == 1 && this.props.active_property.deal.archived != 1 && this.props.active_property.deal.closed != 1){
        return (
          <Card>
            <SecondaryButton onPress={()=>{
              this.props.updateHouse({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "pause_main"});
              this.props.toggleActionSheet(null);
            }}>
              {this.props.active_property.deal.campaign_id != 0 ? "Pause Campaign" : "Pause Mailers"}
            </SecondaryButton>
          </Card>
        )
      }
    }
  }

  renderRestoreDealButton(){
    if(this.props.active_property.deal.status != 2){
      if(this.props.active_property.deal.archived == 1){
        return (
          <Card>
            <SecondaryButton onPress={()=>{
              this.props.updateHouse({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "unarchive"});
              this.props.toggleActionSheet(null);
            }}>
              Restore Deal
            </SecondaryButton>
          </Card>
        )
      }
    }
  }
  renderOpenDealButton(){
    if(this.props.active_property.deal.status != 2){
      if(this.props.active_property.deal.closed == 1){
        if(this.props.user.team_clearance_level > 0){
          return (
            <Card>
              <SecondaryButton onPress={()=>{
                this.props.updateHouse({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "open"});
                this.props.toggleActionSheet(null);
              }}>
                Open Deal
              </SecondaryButton>
            </Card>
          )
        }
      }
    }
  }

  renderTrashDealButton(){
    if(this.props.active_property.deal.status != 2){
      if(this.props.active_property.deal.archived != 1){
        return (
          <Card>
            <SecondaryButton onPress={()=>{
              this.props.updateHouse({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "archive"});
              this.props.toggleActionSheet(null);
            }}>
              Trash Deal
            </SecondaryButton>
          </Card>
        )
      }
    }
  }

  renderDeleteDealButton(){
    if(this.props.active_property.deal.archived == 1 || this.props.active_property.deal.status == 2){
      return (
        <Card>
          <SecondaryButton onPress={()=>{
            this.props.updateHouse({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "delete", property_id: this.props.active_property.id});
            this.props.toggleActionSheet(null);
          }}>
            Permanently Delete Lead
          </SecondaryButton>
        </Card>
      )
    }
  }

  showUndo(){
    if(this.props.change_log){
      if(
        (this.props.change_log.item_type == "houses" && this.props.change_log.item_id == this.props.active_property.deal.id) ||
        (this.props.change_log.item_type == "opm" && this.props.change_log.item_id == this.props.active_property.deal.id)
      ){
        return "Undo Last Action";
      }
    }

    return false;
  }
  renderUndoButton(){
    if(this.showUndo()){
      return (
        <Card>
          <SecondaryButton onPress={()=>{
            this.props.toggleActionSheet("confirm_undo");
          }}>
            {this.showUndo()}
          </SecondaryButton>
        </Card>
      )
    }
  }



  render() {

    if(this.props.active_property){
      if(this.props.actionSheet == "active_deal_options" && this.props.active_property.deal){



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


                  {this.renderApproveButton()}

                  {this.renderRestoreDealButton()}
                  {this.renderOpenDealButton()}
                  {this.renderTrashDealButton()}
                  {this.renderDeleteDealButton()}
                  {this.renderUndoButton()}
                  <TextButton
                    onPress={()=>this.props.toggleActionSheet(null)}
                    text={"Cancel"}
                  />
              </Card>
            </Modal>
          </ModalOverlay>

        );
      }
    }
    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, deal, property_map, native, modal }) => {
  const { token, user } = auth
  const { actionSheet, device } = native;
  const { change_log } = modal;
  const { active_property } = property_map;
  return {
    token,
    user,
    actionSheet,
    device,
    change_log
  }
}


export default connect(mapStateToProps, {
  appRedirect,
  toggleActionSheet,
  updateHouse
})(ActiveDealOptions);
