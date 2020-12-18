import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Scroll,
  Form,
  Copy,
  ModalContainer
} from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  toggleOnboarding,
  getAllStatuses,
  resetStatusModal,
  updateLead,

  getDealStatusSlug
} from 'app/NativeActions';

import Footer from './Footer';
import ListView from './ListView';

class DealStatuses extends Component {


  constructor(props){
    super(props);
    this.state = {
      selected_status: props.status_modal ? props.status_modal.selected_status : 0,
      selected_leads: props.status_modal ? props.status_modal.selected_leads : []
    }
  }

  componentDidMount(){
    if(!this.props.status_modal){
      this.props.appRedirect({redirect: "goBack", payload:{remove: "lead-status"}});
    }else if(this.props.all_statuses.length === 0){
      this.searchStatuses();
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.selected_status !== this.state.selected_status && this.props.status_modal){
      if(this.props.status_modal.fieldsUpdated){

        let status_title = "";
        for(let i = 0; i<this.props.all_statuses.length; i++){
          if(parseInt(this.props.all_statuses[i].id) === parseInt(this.state.selected_status)){
            status_title = this.props.all_statuses[i].title;
          }
        }
        this.props.status_modal.fieldsUpdated({
          status_id: this.state.selected_status,
          status_title: status_title
        });
      }
    }
  }

  checkItem(item){
    this.setState({
      selected_status: item.id
    })
  }

  confirmUpdate(){

    let user_has_onboarded = true;
    if(getDealStatusSlug(this.state.selected_status) == "with_marketing"){
      if(parseInt(this.props.user.team_set_signature) !== 1){
        user_has_onboarded = false;
      }
    }
    if(user_has_onboarded == true){
      if(this.props.status_modal.modalAction){
        this.props.status_modal.modalAction({
          selected_status:this.state.selected_status,
          selected_leads:this.state.selected_leads
        })
      }
    }else{
      this.props.toggleOnboarding(true);
      this.props.appRedirect({redirect: "goForward", payload: {add: "onboarding-signature"}});
    }
  }

  searchStatuses(load_type = "load", search = ""){
    if(!this.props.all_statuses_loading){
      this.props.getAllStatuses({
        token: this.props.token
      })
    }

  }

  renderRightButtonText(){

    switch(this.props.status_modal.type){

      case "select_status_for_uploaded_leads":
        return "Select Status";
      break;

      case "edit_status_for_lead":
      default:

        if(this.state.selected_leads.length > 1){
          return "Update Leads";
        }else{
          return "Update Lead";
        }

    }

  }

  handleBack(){
    if(this.props.status_modal){
      if(this.props.status_modal.cancelAction){
        this.props.status_modal.cancelAction();
      }
    }
    this.props.appRedirect({redirect: "goBack", payload:{remove: "lead-status"}});
  }

  render() {
    if(this.props.status_modal){
      return (
        <ModalContainer
          is_loading={this.props.is_loading}
          popoverWidth={300}
          popoverTarget={
            this.props.status_modal.popoverTarget ?
              this.props.status_modal.popoverTarget : null}
            hidePopover={this.props.status_modal.popoverTarget ? ()=>{
              this.handleBack();
            } : ()=>{}}
            popoverPlacement={this.props.status_modal.popoverPlacement}
        >
          <Header
            title={this.props.status_modal.title}
            leftButtonIcon={this.props.status_modal.popoverTarget && this.props.device === "desktop" ? "close" : "arrow-back"}
            leftButtonAction={()=>{
              this.handleBack();
            }}

            rightButtonTitle={!this.props.status_modal.popoverTarget || this.props.device !== "desktop" ? this.renderRightButtonText() : ""}
            rightButtonAction={()=>this.confirmUpdate()}
          />
          <Form onSubmit={()=>this.confirmUpdate()} style={{flex: 1}}>
            <Scroll style={{ height: this.props.status_modal.popoverTarget && this.props.device === "desktop" ? 300 : "100%" }}>
              <Wrapper style={{
                padding: this.props.status_modal.popoverTarget && this.props.device === "desktop" ? 10 : 20
              }}>
                <Copy>{this.props.status_modal.description}</Copy>
              </Wrapper>
              {/*<SearchBar {...this.props}/>*/}
              <ListView
                {...this.props}

                checkItem={this.checkItem.bind(this)}
                confirmUpdate={this.confirmUpdate.bind(this)}
                selected_leads={this.state.selected_leads}
                selected_status={this.state.selected_status}
                renderRightButtonText={this.renderRightButtonText.bind(this)}
              />
            </Scroll>
            <Footer {...this.props}
              confirmUpdate={this.confirmUpdate.bind(this)}
              selected_leads={this.state.selected_leads}
              selected_status={this.state.selected_status}
              renderRightButtonText={this.renderRightButtonText.bind(this)}
            />
          </Form>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }

}

const mapStateToProps = ({ auth, native, settings, modal, filter }) => {
  const { token, user } = auth;
  const { platform, device, isMobile } = native;
  const { colors } = settings;
  const { is_loading } = modal;
  const { all_statuses, all_statuses_loading, status_modal  } = filter;
  return {
    token,
    user,
    platform,
    device,
    isMobile,
    colors,
    is_loading,
    all_statuses,
    all_statuses_loading,
    status_modal
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  toggleOnboarding,
  getAllStatuses,
  resetStatusModal,
  updateLead
})(DealStatuses);
