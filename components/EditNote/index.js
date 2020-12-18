import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModalContainer, KeyboardView, Wrapper, Scroll } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  toggleActionSheet,
  editNoteFieldChanged,
  updateNote,

  /* common functions */
  dismissMobileKeyboard
} from 'app/NativeActions';

import Body from './Body';


class EditNote extends Component{

  componentDidMount(){
    if(!this.props.active_property){
      this.props.appRedirect({redirect: "goBack", payload: {remove: "edit-note"}})
    }else if(!this.props.active_property.deal){
      this.props.appRedirect({redirect: "goBack", payload: {remove: "edit-note"}})
    }
  }

  handleBack(){
    /*mobile*/
    dismissMobileKeyboard();

    this.props.appRedirect({redirect: "goBack", payload: {remove: "edit-note"}})
  }

  checkIfNeedsToSave(){
    if(this.props.editNote.text != "" && this.props.editNote.text != this.props.originalNote.text){
      return true;
    }

    return false;
  }

  saveNote(){
    /*mobile*/
    dismissMobileKeyboard();

    //edit note
    this.props.updateNote({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "edit_note", payload: {
      note_id: this.props.editNote.id,
      text: this.props.editNote.text
    }});
  }

  render(){
    if(this.props.active_property){
      if(this.props.active_property.deal){
        return(
          <ModalContainer style={{maxWidth: 500, flex: 1}}>

            <Header
              title="Edit Note"

              leftButtonIcon="arrow-back"
              leftButtonAction={this.handleBack.bind(this)}
              rightButtonIcon={this.checkIfNeedsToSave() ? "check": ""}
              rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.saveNote() : ()=>{}}
            />
            <KeyboardView style={{flex: 1}}>
              <Body {...this.props}
                saveNote={this.saveNote.bind(this)}
                checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
              />
            </KeyboardView>
          </ModalContainer>
        )
      }
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, property_map, activity }) => {
  const { token, user } = auth;
  const { active_property } = property_map;
  const { note_id, originalNote, editNote } = activity;
  return {
    token,
    user,
    active_property,
    originalNote,
    editNote
  }
}



export default connect(mapStateToProps, {
  appRedirect,
  toggleActionSheet,
  editNoteFieldChanged,
  updateNote
})(EditNote);
