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
  setEditModal,
  updateOwnerInfo,
  toggleActionSheet,
  updateHouse,
  updateLead,

  determineDisplayProperty
} from 'app/NativeActions';

class HouseMore extends Component {

  renderRestoreDealButton(){
    if(this.props.active_property.deal.status != 2){
      if(this.props.active_property.deal.archived == 1){
        return (
          <Card>
            <SecondaryButton onPress={()=>{
              this.props.updateLead({token: this.props.token, deal_ids: this.props.active_property.deal.id, type: "edit_status_for_lead", deal_status_slug: "pending_approval"});
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
                this.props.updateLead({token: this.props.token, deal_ids: this.props.active_property.deal.id, type: "edit_status_for_lead", deal_status_slug: "pending_approval"});
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

  renderPauseMailersButton(){
    if(this.props.active_property.deal.status != 2 && this.props.active_property.deal.archived != 1 && this.props.active_property.deal.closed != 1){
      if(this.props.active_property.deal.paused == 1){
        if(this.props.user.team_clearance_level > 1 || this.props.user.can_approve_deals == 1){
          return (
            <Card>
              <SecondaryButton onPress={()=>{
                this.props.updateLead({token: this.props.token, deal_ids: this.props.active_property.deal.id, type: "start_mailers"});
                this.props.toggleActionSheet(null);
              }}>
                {this.props.active_property.deal.campaign_id != 0 ? "Resume Campaign" : "Resume Mailers"}
              </SecondaryButton>
            </Card>
          )
        }
      }else if(this.props.active_property.deal.approved == 1){
        if(this.props.user.team_clearance_level > 1 || this.props.user.can_approve_deals == 1){
          return (
            <Card>
              <SecondaryButton onPress={()=>{
                this.props.updateLead({token: this.props.token, deal_ids: this.props.active_property.deal.id, type: "pause_mailers"});
                this.props.toggleActionSheet(null);
              }}>
                {this.props.active_property.deal.campaign_id != 0 ? "Pause Campaign" : "Pause Mailers"}
              </SecondaryButton>
            </Card>
          )
        }
      }
    }
  }

  renderRestorePropertyButton(){
    const display_property = determineDisplayProperty(this.props.active_property);

     if(this.props.active_property.deal.archived != 1 && this.props.active_property.deal.closed != 1 && display_property.custom_property == true){
      return (
        <Card>
          <SecondaryButton onPress={()=>{
            this.props.toggleActionSheet(null);
            this.props.updateOwnerInfo({
              token: this.props.token,
              deal_id: this.props.active_property.deal.id,
              type: "restore_property_address",
              address: this.props.active_property.property_address,
              address2: this.props.active_property.property_address2,
              city: this.props.active_property.property_address_city,
              state: this.props.active_property.property_address_state,
              zip: this.props.active_property.property_address_zip
            })
          }}>
            Restore Original Property Address
          </SecondaryButton>
        </Card>
      )
    }
  }

  renderEditPropertyButton(){
    if(this.props.active_property.deal.archived != 1 && this.props.active_property.deal.closed != 1){
      const display_property = determineDisplayProperty(this.props.active_property);
      return (
        <Card>
          <SecondaryButton onPress={()=>{
            this.props.toggleActionSheet(null);
            this.props.setEditModal({
              title:"Edit Property Address Display",
              description: "Edit the display of this lead's property address. This will reflect your mailers.",
              slug: "edit-property-address",
              type: "edit_property_address",
              fields:{
                address: display_property.property_address,
                address2: display_property.property_address2,
                city: display_property.property_address_city,
                state: display_property.property_address_state,
                zip: display_property.property_address_zip
              },
              save_button_text: "Save Property Address",
              modalAction: ({fields})=>{
                this.props.updateOwnerInfo({
                  token: this.props.token,
                  deal_id: this.props.active_property.deal.id,
                  type: "edit_property_address",
                  address: fields.address,
                  address2: fields.address2,
                  city: fields.city,
                  state: fields.state,
                  zip: fields.zip
                })
              }
            })
            this.props.appRedirect({redirect: "goForward", payload:{add: "edit-property-address"}});
          }}>
            Edit Property Address Display
          </SecondaryButton>
        </Card>
      )
    }
  }

  renderTrashDealButton(){
    if(this.props.active_property.deal.status != 2){
      if(this.props.active_property.deal.archived != 1){
        return (
          <Card>
            <SecondaryButton onPress={()=>{
              this.props.updateLead({token: this.props.token, deal_ids: this.props.active_property.deal.id, type: "edit_status_for_lead", deal_status_slug: "in_trash"});
              this.props.toggleActionSheet(null);
            }}>
              Send to Trash
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
            this.props.updateLead({token: this.props.token, deal_ids: this.props.active_property.deal.id, type: "permanently_delete"});
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

    if(this.props.actionSheet == "house_more" && this.props.active_property){

      if(this.props.active_property.deal){

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
                  {this.renderEditPropertyButton()}
                  {this.renderRestorePropertyButton()}

                  {this.renderRestoreDealButton()}
                  {this.renderPauseMailersButton()}

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

const mapStateToProps = ({ auth, native, modal, property_map }) => {
  const { token, user } = auth
  const { actionSheet, device } = native;
  const { change_log } = modal;
  const { active_property } = property_map;

  return {
    token,
    user,
    actionSheet,
    device,
    change_log,
    active_property
  }
}


export default connect(mapStateToProps, {
  appRedirect,
  setEditModal,
  updateOwnerInfo,
  toggleActionSheet,
  updateHouse,
  updateLead
})(HouseMore);
