import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Scroll,
  Form,
  Wrapper,
  KeyboardView,
  ModalContainer
} from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  setModal,
  toggleModal,

  dismissMobileKeyboard
} from 'app/NativeActions';

import Body from './Body';
import Footer from './Footer';

class EditInfoModal extends Component {

  constructor(props){
    super(props);
    this.state = props.edit_modal ? props.edit_modal.fields : {}
  }

  updateField({prop, value}){

    this.setState({[prop]: value})
  }

  componentDidMount(){
    if(!this.props.edit_modal){
      this.props.appRedirect({redirect: "dashboard"})
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state && prevState && this.props.edit_modal){
      for (const [key, last_value] of Object.entries(prevState)) {
        if(this.state[key] !== last_value){
          if(this.props.edit_modal.fieldsUpdated){
            this.props.edit_modal.fieldsUpdated(this.state)
          }
          break;
        }
      }
    }
  }

  handleBack(){

    dismissMobileKeyboard();

    if(this.props.edit_modal){
      if(this.props.edit_modal.cancelAction){
        this.props.edit_modal.cancelAction()
      }
    }

    this.props.appRedirect({redirect: "goBack", payload:{remove: this.props.edit_modal.slug}});

  }

  componentWillUnmount(){
    dismissMobileKeyboard();

    if(this.props.edit_modal){
      if(this.props.edit_modal.cancelAction){
        this.props.edit_modal.cancelAction()
      }
    }
  }

  checkIfNeedsToSave(){
    if(this.props.edit_modal.always_save){
      return true;
    }
    if(this.props.edit_modal){
      if(this.props.edit_modal.fields){
        for (const [key, original_value] of Object.entries(this.props.edit_modal.fields)) {
          if(this.state[key] !== original_value){
            return true;
          }
        }
      }
    }

    return false;
  }

  saveInfo(){

    dismissMobileKeyboard();

    if(this.checkIfNeedsToSave()){
      this.props.edit_modal.modalAction({fields: this.state})
    }
  }

  renderFooter(){
    if(this.props.edit_modal.popoverTarget && this.props.device === "desktop"){
      return  <Footer
                {...this.props}
                checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
                saveInfo={this.saveInfo.bind(this)}
              />
    }
  }

  render() {
    if(this.props.edit_modal){
      return (

        <ModalContainer
          is_loading={this.props.is_loading}

          popoverTarget={
            this.props.edit_modal.popoverTarget ?
              this.props.edit_modal.popoverTarget : null}
            hidePopover={this.props.edit_modal.popoverTarget ? ()=>{
              this.handleBack();
            } : ()=>{}}
            popoverPlacement={this.props.edit_modal.popoverPlacement}
        >
          <Header

            title={this.props.edit_modal.title}
            leftButtonIcon={this.props.edit_modal.popoverTarget && this.props.device === "desktop" ? "close" : "arrow-back"}
            leftButtonAction={()=>{
              this.handleBack();
            }}

            rightButtonIcon={this.checkIfNeedsToSave() && (!this.props.edit_modal.popoverTarget || this.props.device !== "desktop") ? "check" : ""}
            rightButtonAction={()=>this.saveInfo()}

          />
          <Form onSubmit={()=>this.saveInfo()} style={{flex: 1}}>
            <KeyboardView style={{
              [
                this.props.edit_modal.type === "edit_mailing_options" ? "height" : "maxHeight"
              ]: this.props.edit_modal.popoverTarget && this.props.device === "desktop" ? 300 : "100%" }}>

                <Body
                  {...this.props}
                  fields={this.state}
                  updateField={this.updateField.bind(this)}
                  checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
                  saveInfo={this.saveInfo.bind(this)}
                />
            </KeyboardView>
            {this.renderFooter()}
          </Form>
        </ModalContainer>
      );
    }

    return <Wrapper />;
  }

}

const mapStateToProps = ({ auth, native, owner, modal, settings }) => {
  const { token, user } = auth;
  const { device, window_height, window_width, isMobile } = native;
  const { edit_modal, is_loading } = modal;
  const { states, colors } = settings;

  return{
    token,
    user,
    device,
    window_height, window_width,
    edit_modal,
    is_loading,
    isMobile,
    states,
    colors
  }
}


export default connect(mapStateToProps, {
  appRedirect,
  setModal,
  toggleModal,

})(EditInfoModal);
