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
  toggleDealsOptions,
  selectAllDeals,
  getDeals,

  AppConfig
} from 'app/NativeActions';

class DashboardMore extends Component {

  renderSelectAllButton(){
    if(this.props.deals_count > 0){
      return (
        <Card>
          <SecondaryButton onPress={()=>{
            this.props.selectAllDeals();
            this.props.appRedirect({redirect: "editDeals"});
            this.props.toggleActionSheet(null);
          }}>
            Select All Deals ({this.props.deals_count})
          </SecondaryButton>
        </Card>
      )
    }
  }

  exportAllDealsButton(){
      if(this.props.deals_count > 0 && this.props.device == "desktop"){
        if(this.props.user.team_owner == 1 || this.props.user.team_clearance_level > 1 ||
          (this.props.user.team_clearance_level > 0 && this.props.user.can_export_data == 1)
        ){
          return (
            <Card>
              <SecondaryButton onPress={()=>{

                let filtervalues = AppConfig().api_url+"deals/?token="+this.props.token+"&is_export=true&filter_status="+this.props.filters.status+"&filter_team_member="+this.props.filters.team_member+"&filter_enhanced_search="+this.props.filters.enhanced_search+"&filter_times_mailed_type="+this.props.filters.times_mailed_type+"&filter_times_mailed_value="+this.props.filters.times_mailed_value+"&filter_campaign="+this.props.filters.campaign+"&filter_mail_template="+this.props.filters.mail_template+"&filter_property_tag="+this.props.filters.property_tag+"&filter_owner_properties="+this.props.filters.owner_properties+"&filter_routes="+this.props.filters.routes+"&filter_start_date="+this.props.filters.start_date+"&filter_end_date="+this.props.filters.end_date;

                if(this.props.filters.start_date == null || this.props.filters.end_date == null){

                  filtervalues = AppConfig().api_url+"deals/?token="+this.props.token+"&is_export=true&filter_status="+this.props.filters.status+"&filter_team_member="+this.props.filters.team_member+"&filter_enhanced_search="+this.props.filters.enhanced_search+"&filter_times_mailed_type="+this.props.filters.times_mailed_type+"&filter_times_mailed_value="+this.props.filters.times_mailed_value+"&filter_campaign="+this.props.filters.campaign+"&filter_mail_template="+this.props.filters.mail_template+"&filter_property_tag="+this.props.filters.property_tag+"&filter_owner_properties="+this.props.filters.owner_properties+"&filter_routes="+this.props.filters.routes;

                }


                window.open(filtervalues, "_blank");
                this.props.toggleActionSheet(null);
              }}>
                Export All Deals ({this.props.deals_count})
              </SecondaryButton>
            </Card>
          )
        }
      }
  }

  showUndo(){
    if(this.props.change_log){
      if(this.props.change_log.item_type == "houses"){
        if(this.props.change_log.action_type == "bulk_edit"){
          return "Undo: Bulk Edit";
        }else if(this.props.change_log.action_type == "approve"){
          return "Undo: Start Mailers";
        }else if(this.props.change_log.action_type == "archive"){
          return "Undo: Trash Deal";
        }
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

    if(this.props.actionSheet == "dashboard_more"){



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
                    this.props.toggleDealsOptions("select");
                    this.props.toggleActionSheet(null);
                  }}>
                    Select Deals
                  </SecondaryButton>
                </Card>
                {this.renderSelectAllButton()}
                {this.exportAllDealsButton()}
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
    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, native, deal, modal }) => {
  const { actionSheet, device } = native;
  const { token, user } = auth
  const { deals_count, filters } = deal;
  const { change_log } = modal;
  return {
    token,
    user,
    filters,
    actionSheet,
    device,
    deals_count,
    change_log
  }
}

export default connect(mapStateToProps, {
  appRedirect,
    toggleActionSheet,
    toggleDealsOptions,
    selectAllDeals,
    getDeals
})(DashboardMore);
