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
  callPhoneNumber,
  textPhoneNumber
} from 'app/NativeActions';

const PhoneMore = (props) => {

  if(props.selected_phone !== null){

    return (

      <ModalOverlay
        isVisible={true}
        onPress={()=>props.selectPhone(null)}
      >
        <Modal actionSheet>
          <Card style={{
            minWidth: "95%",
            paddingBottom: props.device == "mobile" ? 10 : 0
          }}>
            <CardBody>
              <Title style={{textAlign: "center"}}>Phone Number Options</Title>
              <Copy style={{textAlign: "center"}}>
                Select an option
              </Copy>
            </CardBody>


              <Card>
                <SecondaryButton onPress={()=>{
                  callPhoneNumber(props.selected_phone.phone_number);
                  props.selectPhone(null)
                }}>
                  Call {props.selected_phone.phone_number}
                </SecondaryButton>
              </Card>

              <Card>
                <SecondaryButton onPress={()=>{
                  textPhoneNumber(props.selected_phone.phone_number);
                  props.selectPhone(null)
                }}>
                  Text {props.selected_phone.phone_number}
                </SecondaryButton>
              </Card>

              <TextButton
                onPress={()=>props.selectPhone(null)}
                text={"Cancel"}
              />
          </Card>
        </Modal>
      </ModalOverlay>
    )
  }

  return <Wrapper />


}



export default PhoneMore;
