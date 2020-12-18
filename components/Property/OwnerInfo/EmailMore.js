import React from 'react';

import {
  ModalOverlay,
  Wrapper,
  Modal,
  Card,
  CardBody,
  Title,
  Copy,
  Bold,
  PrimaryButton,
  SecondaryButton
} from 'app/NativeComponents/common';


import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
  openEmail
} from 'app/NativeActions';

const EmailMore = (props) => {

  if(props.selected_email !== null){

    return (

      <ModalOverlay
        isVisible={true}
        onPress={()=>props.selectEmail(null)}
      >
        <Modal actionSheet>
          <Card style={{
            minWidth: "95%",
            paddingBottom: props.device == "mobile" ? 10 : 0
          }}>
            <CardBody>
              <Title style={{textAlign: "center"}}>Email Address Options</Title>
              <Copy style={{textAlign: "center"}}>
                Select an option
              </Copy>
            </CardBody>


              <Card>
                <SecondaryButton onPress={()=>{
                  openEmail({email: props.selected_email.email_address, subject: ""})
                  props.selectEmail(null)
                }}>
                  Email {props.selected_email.email_address}
                </SecondaryButton>
              </Card>

              <TextButton
                onPress={()=>props.selectEmail(null)}
                text={"Cancel"}
              />
          </Card>
        </Modal>
      </ModalOverlay>
    )
  }

  return <Wrapper />


}



export default EmailMore;
