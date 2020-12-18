import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Copy } from 'app/NativeComponents/common';
import { MenuButton } from 'app/NativeComponents/snippets';

class DefaultSendingMode extends Component{


  render(){
    if(this.props.select_default_sending_options && !this.props.onboarding){
      return (
        <Wrapper>
          <Card>
            <MenuButton
              onPress={()=>this.props.toggleActionSheet("sending_mode")}
              fa_icon="sort"
              title="Sending Mode"
              text={
                this.props.editUser.pause_sending == 1 ?
                  "Sending Mode: Stop All Sending" :
                this.props.editUser.auto_approve == 1 ?
                  "Sending Mode: Automatically Send" :
                  "Sending Mode: Approve Deals Individually"
              }
            />
          </Card>
          <CardBody>
            <Copy>
              {
                this.props.editUser.pause_sending == 1 ?
                  "No mailers will be sent until you change this setting. Then campaigns/mail will resume based on how many days it's been since the last mailer was sent." :
                this.props.editUser.auto_approve == 1 ?
                  "All campaigns/mailers will start as soon as a deal is added and an owner address is found." :
                  "You'll need to manually start each campaign/mailer after a deal is added."
              }
            </Copy>
          </CardBody>
        </Wrapper>

      );
    }

    return <Wrapper />
  }

}

export default DefaultSendingMode;
