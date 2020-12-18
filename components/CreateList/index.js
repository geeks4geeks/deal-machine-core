import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  KeyboardView,
  Copy,
  ModalContainer
} from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  updateListSearch,
  createList,

  dismissMobileKeyboard
} from 'app/NativeActions';

import CreateListBar from './CreateListBar'

class CreateList extends Component {

  componentDidMount(){
    if(!this.props.list_modal){
      this.handleBack();
    }
  }

  newList(){

    dismissMobileKeyboard();

    if(!this.props.lists_loading){
      this.props.createList({
        token: this.props.token,
        title: this.props.list_search
      })
    }
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{remove: "create-list"}});
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
            title={"Create New List"}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={()=>{
              this.handleBack();
            }}

            rightButtonIcon={this.props.list_search.length > 0 ? "check" : ""}
            rightButtonAction={this.props.list_search.length > 0 ? this.newList.bind(this) : ()=>{}}
          />
          <KeyboardView style={{height: this.props.device === "desktop" ? 200 : "100%"}}>
            <Wrapper style={{
              padding: this.props.list_modal.popoverTarget && this.props.device === "desktop" ? 10 : 20
            }}>
              <Copy>Enter a name for your new list.</Copy>
            </Wrapper>
            <CreateListBar
              {...this.props}
              newList={this.newList.bind(this)}
            />
          </KeyboardView>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }

}

const mapStateToProps = ({ auth, native, modal, list }) => {
  const { token, user } = auth;
  const { platform, device } = native;
  const { is_loading } = modal;
  const { lists_loading, list_search, list_modal } = list;
  return {
    token,
    user,
    platform,
    device,
    is_loading,
    list_modal,
    lists_loading,
    list_search
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  updateListSearch,
  createList
})(CreateList);
