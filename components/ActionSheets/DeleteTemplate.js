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
  saveTemplate,
  toggleActionSheet
} from 'app/NativeActions';

class DeleteTemplate extends Component {

  render() {

    if(this.props.actionSheet == "delete_template" && this.props.editTemplate){

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
                <Title style={{textAlign: "center"}}>
                  Delete Mail Template
                </Title>
                <Copy style={{textAlign: "center"}}>
                  Are you sure you want to delete this template?
                </Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    this.props.toggleActionSheet(null);
                    this.props.saveTemplate({
                      token: this.props.token,
                      type: "delete",
                      template_id: this.props.editTemplate.id
                    });
                  }}>
                    Delete Template
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
const mapStateToProps = ({ auth, native, template }) => {
  const { token, user } = auth;
  const { actionSheet, device } = native;
  const {
    editTemplate
  } = template;
  return {
    token,
    user,
    actionSheet,
    device,
    editTemplate
  }
}

export default connect(mapStateToProps, {
  saveTemplate,
  toggleActionSheet,
})(DeleteTemplate);
