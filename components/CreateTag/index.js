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
  updateTagSearch,
  createTeamTag,

  dismissMobileKeyboard
} from 'app/NativeActions';

import CreateTagBar from './CreateTagBar'

class CreateTag extends Component {

  componentDidMount(){
    if(!this.props.tag_modal){
      this.handleBack();
    }
  }

  newTag(){

    dismissMobileKeyboard();

    if(!this.props.tags_loading){
      this.props.createTeamTag({
        token: this.props.token,
        title: this.props.tag_search,
        type: "create"
      })
    }
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{remove: "create-tag"}});
  }


  render() {
    if(this.props.tag_modal){

      return (

        <ModalContainer
          is_loading={this.props.is_loading}
          popoverWidth={300}
          popoverTarget={
            this.props.tag_modal.popoverTarget ?
              this.props.tag_modal.popoverTarget : null}
            hidePopover={this.props.tag_modal.popoverTarget ? ()=>{

              this.handleBack();
            } : ()=>{}}
            popoverPlacement={this.props.tag_modal.popoverPlacement}
        >
          <Header
            title={"Create New Tag"}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={()=>{
              this.handleBack();
            }}

            rightButtonIcon={this.props.tag_search.length > 0 ? "check" : ""}
            rightButtonAction={this.props.tag_search.length > 0 ? this.newTag.bind(this) : ()=>{}}
          />
          <KeyboardView style={{height: 200}}>
            <Wrapper style={{
              padding: this.props.tag_modal.popoverTarget && this.props.device === "desktop" ? 10 : 20
            }}>
              <Copy>Enter a name for your new tag.</Copy>
            </Wrapper>
            <CreateTagBar
              {...this.props}
              newTag={this.newTag.bind(this)}
            />
          </KeyboardView>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }

}

const mapStateToProps = ({ auth, native, modal, deal, property_tags, filter }) => {
  const { token, user } = auth;
  const { platform, device } = native;
  const { all_tags } = deal;
  const { is_loading } = modal;
  const { tags_loading } = property_tags;
  const { tag_modal, tag_search} = filter;

  return {
    token,
    user,
    platform,
    device,
    is_loading,
    all_tags,
    tags_loading,
    tag_modal,
    tag_search
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  updateTagSearch,
  createTeamTag
})(CreateTag);
