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
  Bold,
  DeleteButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
  initEditDeals,
  editDeals,
  saveEditDeals,
  toggleActionSheet
} from 'app/NativeActions';

class ConfirmPurchase extends Component {

  handleSave(){

    this.props.toggleActionSheet(null);

    var selected_array = "";
    for(var i = 0; i<this.props.selected_deals.length; i++){
      if(i == this.props.selected_deals.length-1){
        selected_array += this.props.selected_deals[i].id;
      }else{
        selected_array += this.props.selected_deals[i].id+",";
      }
    }

    if(this.props.dealEdits.approve.toggled || this.props.dealEdits.enhanced_search.toggled){

      this.props.saveEditDeals({
        token: this.props.token,
        payload: {
          search: this.props.select_all_deals ? this.props.search : "",
          filters: this.props.select_all_deals ? this.props.filters : [],
          select_all: this.props.select_all_deals,
          selected_deals: this.props.select_all_deals ? [] : selected_array,
          edits: {
            approve: this.props.dealEdits.approve.toggled ? 1 : 0,
            enhanced_search: this.props.dealEdits.enhanced_search.toggled ? 1 : 0,
            edit_status: this.props.dealEdits.status.toggled ? 1 : 0,
            status: this.props.dealEdits.status.toggled ? this.props.dealEdits.status.status : null,


            campaign: this.props.dealEdits.mailing_options.toggled && this.props.dealEdits.mailing_options.campaign_id != 0 ? 1 : 0,
            campaign_id: this.props.dealEdits.mailing_options.toggled && this.props.dealEdits.mailing_options.campaign_id != 0 ? this.props.dealEdits.mailing_options.campaign_id : 0,
            repeat_mail: this.props.dealEdits.mailing_options.toggled && this.props.dealEdits.mailing_options.campaign_id == 0 ? 1 : 0,
            mail_template: this.props.dealEdits.mailing_options.toggled && this.props.dealEdits.mailing_options.campaign_id == 0 ? 1 : 0,
            template_id: this.props.dealEdits.mailing_options.toggled && this.props.dealEdits.mailing_options.campaign_id == 0 ? this.props.dealEdits.mailing_options.template_id : null,
            resend_freq: this.props.dealEdits.mailing_options.toggled && this.props.dealEdits.mailing_options.campaign_id == 0 ? this.props.dealEdits.mailing_options.resend_freq_switch == "on" ? this.props.dealEdits.mailing_options.resend_freq : 0 : null,
            resend_limit: this.props.dealEdits.mailing_options.toggled && this.props.dealEdits.mailing_options.campaign_id == 0 ? this.props.dealEdits.mailing_options.resend_limit_switch == "on" ? 0 : this.props.dealEdits.mailing_options.resend_limit : null
          }
        }
      })



    }
  }

  handleCancel(){
    this.props.toggleActionSheet(null)
    this.props.initEditDeals();
  }


  render() {

    if(this.props.actionSheet == "confirm_purchase"){
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
                <Title style={{textAlign: "center"}}>Confirm Bulk Edit?</Title>
                <Copy style={{textAlign: "center"}}>This bulk edit can use up to {this.props.total_purchase_amount == 1 ? "1 DealCredit" : this.props.total_purchase_amount+" DealCredits"}. Are you sure you want to complete this action?</Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.handleSave()
                  }}>
                    {"Confirm Bulk Edit"}
                  </DeleteButton>
                </Card>
                <TextButton
                  onPress={()=>this.handleCancel()}
                  text={"Nevermind. Not right now."}
                />
            </Card>
          </Modal>
        </ModalOverlay>

      );
    }
    return <Wrapper />
  }
}
const mapStateToProps = ({ auth, native, deal }) => {
  const { token, user } = auth;
  const { device, actionSheet } = native;
  const {
    search,
    filters,
    deals_count,
    selected_deals,
    select_all_deals,
    originalDealEdits,
    dealEdits,
    total_purchase_amount,
    all_statuses
  } = deal;

  return {
    token,
    user,
    device,
    search,
    filters,
    deals_count,
    selected_deals,
    select_all_deals,
    originalDealEdits,
    dealEdits,
    actionSheet,
    total_purchase_amount
  }
}


export default connect(mapStateToProps, {
  initEditDeals,
  editDeals,
  saveEditDeals,
  toggleActionSheet
})(ConfirmPurchase);
