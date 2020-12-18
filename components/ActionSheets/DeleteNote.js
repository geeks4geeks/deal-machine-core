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
  DeleteButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
  updateNote,
  toggleActionSheet
} from 'app/NativeActions';

class DeleteNote extends Component {

  render() {

    if(this.props.actionSheet == "delete_note"){


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
                <Title style={{textAlign: "center"}}>Remove Note</Title>
                <Copy style={{textAlign: "center"}}>Are you sure you want to remove this note?</Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.props.updateNote({token: this.props.token, deal_id: this.props.active_property.deal.id, type: "remove_note", payload: {
                      note_id: this.props.editNote.id
                    }});
                    this.props.toggleActionSheet(null);
                  }}>
                    Remove Note
                  </DeleteButton>
                </Card>
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

const mapStateToProps = ({ auth, native, property_map, activity }) => {
  const { token } = auth;
  const { actionSheet, device } = native;
  const { active_property } = property_map;
  const { editNote } = activity;

  return {
    token,
    actionSheet,
    device,
    active_property,
    editNote
  }
}


export default connect(mapStateToProps, {
  updateNote,
  toggleActionSheet,
})(DeleteNote);
