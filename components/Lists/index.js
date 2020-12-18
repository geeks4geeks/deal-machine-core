import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Card,
  KeyboardView,
  Copy,
  Form,
  ModalContainer
} from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import ListView from './ListView';
import {
  appRedirect,
  getLists,
  resetListModal,
  updateListSearch,
  setListModal,

  updateLead,

  dismissMobileKeyboard
} from 'app/NativeActions';

import SearchBar from './SearchBar';
import Footer from './Footer';

class Lists extends Component {


  constructor(props){
    super(props);

    this.state = {
      selected_lists: props.list_modal ? props.list_modal.selected_lists : [],
      selected_leads: props.list_modal ? props.list_modal.selected_leads : []
    }
  }

  componentDidMount(){
    if(!this.props.list_modal){
      this.handleBack();
    }else{
      this.searchLists("refresh");
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.list_modal && prevProps.list_modal){
      if(prevProps.list_modal.selected_lists && this.props.list_modal.selected_lists && this.props.list_modal){
        if(prevProps.list_modal.selected_lists.length !== this.props.list_modal.selected_lists.length){
          if(this.props.list_modal.fieldsUpdated){
            this.props.list_modal.fieldsUpdated(this.props.list_modal.selected_lists);
          }
        }
      }
    }
  }

  checkListItem(list_item){

    let found_list = false;
    for(let i = 0; i<this.props.list_modal.selected_lists.length; i++){
      if(this.props.list_modal.selected_lists[i].id === list_item.id){
        found_list = true;
      }
    }
    if(found_list){
      this.props.setListModal({
        ...this.props.list_modal,
        selected_lists: this.props.list_modal.selected_lists.filter(({id}) => id !== list_item.id)
      })
    }else{
      this.props.setListModal({
        ...this.props.list_modal,
        selected_lists: [...this.props.list_modal.selected_lists, list_item]
      })
    }
  }

  confirmUpdate(){

    dismissMobileKeyboard();

    if(this.props.list_modal.modalAction){
      this.props.list_modal.modalAction({
        selected_leads:this.state.selected_leads,
        selected_lists:this.props.list_modal.selected_lists
      })
    }
  }

  clearAll(){
    this.props.setListModal({
      ...this.props.list_modal,
      selected_lists: []
    })
  }

  searchLists(load_type = "load", search = ""){
    if(!this.props.lists_loading && !this.props.lists_refreshing){
      this.props.getLists({
        token: this.props.token,
        load_type: load_type,
        search: search,
        begin: load_type === "refresh" ? 0 : this.props.lists_begin,
        limit: this.props.lists_limit
      })
    }

  }

  renderRightButtonText(){



    switch(this.props.list_modal.type){
      case "add_leads_to_lists":
      default:
        if(this.props.isMobile){
          return "Update Lead(s)";
        }

        return this.props.list_modal.selected_lists.length > 0 ? this.props.list_modal.selected_lists.length === 1 ?
            "Use 1 Selected List" :
            "Use "+this.props.list_modal.selected_lists.length+" Selected Lists" : "Use 1 Selected List";

      case "edit_lists_for_lead":
        return "Update Lead";

      case "filter_lists_for_leads":
        return "Update Filters";
    }
  }

  handleBack(){

    dismissMobileKeyboard();

    if(this.props.list_modal){
      if(this.props.list_modal.cancelAction){
        this.props.list_modal.cancelAction();
      }
    }
    this.props.appRedirect({redirect: "goBack", payload:{remove: "lists"}});
  }

  render() {
    if(this.props.list_modal){
      return (

        <ModalContainer
          is_loading={this.props.is_loading}
          popoverWidth={300}
          popoverTarget={
            this.props.list_modal.popoverTarget ?
              this.props.list_modal.popoverTarget : null}
            hidePopover={this.props.list_modal.popoverTarget ? ()=>{
              this.handleBack();
            } : ()=>{}}
            popoverPlacement={this.props.list_modal.popoverPlacement}
        >

          <Header
            title={this.props.list_modal.title}

            leftButtonIcon={this.props.list_modal.popoverTarget && this.props.device === "desktop" ? "close" : "arrow-back"}
            leftButtonAction={()=>{
              this.handleBack();

            }}

            rightButtonTitle={this.props.list_modal.selected_lists.length > 0 ? "Clear All" : ""}

            rightButtonAction={
              this.props.list_modal.selected_lists.length > 0 ? ()=>this.clearAll() : ()=>{}
            }

            rightButtonTitle2={!this.props.list_modal.popoverTarget || this.props.device !== "desktop" ? this.renderRightButtonText() : ""}

            rightButtonAction2={
              this.props.list_modal.selected_lists.length > 0 ||
              this.props.list_modal.type === "edit_lists_for_lead" ||
              this.props.list_modal.type === "filter_lists_for_leads" ?
              ()=>this.confirmUpdate() : ()=>{}
            }
          />
          <Form onSubmit={()=>this.confirmUpdate()} style={{flex: 1}}>
            <KeyboardView style={{height: this.props.list_modal.popoverTarget && this.props.device === "desktop" ? 300 : "100%" }}>
              <Wrapper style={{
                padding: this.props.list_modal.popoverTarget && this.props.device === "desktop" ? 10 : 20
              }}>
                <Copy>{this.props.list_modal.description}</Copy>
              </Wrapper>
              <Card>
                <SearchBar
                  {...this.props}
                  searchLists={this.searchLists.bind(this)}
                />
              </Card>
              <ListView
                {...this.props}
                searchLists={this.searchLists.bind(this)}
                selected_lists={this.props.list_modal.selected_lists}
                checkListItem={this.checkListItem.bind(this)}
                confirmUpdate={this.confirmUpdate.bind(this)}
                renderRightButtonText={this.renderRightButtonText.bind(this)}
              />
            </KeyboardView>

            <Footer {...this.props}
              confirmUpdate={this.confirmUpdate.bind(this)}
              selected_leads={this.state.selected_leads}
              selected_lists={this.props.list_modal.selected_lists}
              renderRightButtonText={this.renderRightButtonText.bind(this)}
            />
          </Form>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }

}

const mapStateToProps = ({ auth, native, settings, modal, list }) => {
  const { token, user } = auth;
  const { platform, device, isMobile } = native;
  const { colors } = settings;
  const { is_loading } = modal;
  const { lists, lists_loading, lists_refreshing, lists_begin, lists_loaded_all, lists_limit, list_modal, list_search } = list;
  return {
    token,
    user,
    isMobile,
    platform,
    device,
    colors,
    is_loading,
    lists,
    lists_loading,
    lists_refreshing,
    lists_begin,
    lists_loaded_all,
    lists_limit,
    list_modal,

    list_search
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  getLists,
  resetListModal,
  updateListSearch,
  setListModal,

  updateLead
})(Lists);
