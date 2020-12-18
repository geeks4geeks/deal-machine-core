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
  setModal,
  toggleModal,
  toggleActionSheet,
  updateList

} from 'app/NativeActions';

class ListMore extends Component {


  render() {

    if(this.props.actionSheet == "list_more" && this.props.active_list){

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

                  this.props.toggleActionSheet(null);
                  this.props.setModal({
                    title: "Delete List",
                    description: "Are you sure you want to delete this list? This will only delete the list. Leads within the list will remain on your account.",
                    icon: "delete",
                    submit: "Delete List",
                    buttonType: "destroy",
                    onPress: ()=>{
                      this.props.updateList({
                        token: this.props.token,
                        type: "remove_list",
                        list_id: this.props.active_list.id
                      })
                    },
                    cancel: 'Nevermind.',
                    onCancel: ()=>{}
                  });
                  this.props.toggleModal({show: true, type: "normal"});
                }}>
                  Delete List
                </SecondaryButton>
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

const mapStateToProps = ({ auth, native, list }) => {
  const { token, user } = auth
  const { actionSheet, device } = native;
  const { active_list } = list;

  return {
    token,
    user,
    actionSheet,
    device,
    active_list
  }
}


export default connect(mapStateToProps, {
  setModal,
  toggleModal,
  toggleActionSheet,
  updateList
})(ListMore);
