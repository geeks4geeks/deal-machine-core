import React, { Component } from 'react';
import { Scroll, Card, CardBody, Copy, Bold, Button, DeleteButton, MultiLineInput } from 'app/NativeComponents/common';
import { TextButton } from 'app/NativeComponents/snippets';
import {
  /* common functions */
  callPhoneNumber
} from 'app/NativeActions';

class Body extends Component{

  constructor(props){
    super(props);

    this.state = {
      canceled_reason: ''
    }
  }

  renderButton(){
    if(this.props.device == "mobile"){
      return(
        <TextButton
          text="Call 833-321-DEAL"
          onPress={()=>{
            callPhoneNumber("+18333213325");
          }}
        >

        </TextButton>
      );
    }
  }

  render(){

    if(this.props.stats.billing.plan.enterprise == 1){
      return (
        <Scroll>
          <CardBody>
            <Copy>
              You are currently on our Enterprise Plan. You have commited to {this.props.stats.billing.plan.commitment_length_months} months of service.
            </Copy>
          </CardBody>
        </Scroll>
      );
    }
    if(this.props.stats.billing.plan.enterprise == 1){
    return (
      <Scroll>
        <CardBody>
          <Copy>
            When you cancel your plan you can no longer track your deals. Any repeating mail will no longer be sent. You cannot use any DealCredit until you reactive your account.
          </Copy>
        </CardBody>
        <CardBody>
          <Copy>
            We are committed to your success. If you are unhappy with your service we encourage you to reach out to us.
          </Copy>
        </CardBody>
        <Card>
          <DeleteButton onPress={()=>this.props.toggleActionSheet("cancel_plan")}>
            Cancel Plan
          </DeleteButton>
        </Card>
      </Scroll>
    );
  }
  else{
    return (
      <Scroll>
        <CardBody>
          <Copy>
            When you cancel your plan you can no longer track your deals. Any repeating mail will no longer be sent. You cannot use any DealCredit until you reactive your account.
          </Copy>
        </CardBody>
        <CardBody>
          <Copy>
            We are committed to your success. If you are unhappy with your service we encourage you to reach out to us.
          </Copy>
        </CardBody>
        <Card>
          <MultiLineInput
            name="cancel_reason"
            autoCapitalize="sentences"
            blurOnSubmit={true}
            returnKeyType="done"
            keyboardType="default"
            label={this.props.device == "mobile" ? "Please tell us why you wish to cancel." : ""}
            placeholder={this.props.device == "desktop" ? "Please tell us why you wish to cancel." : "Enter your text here."}
            type={"text"}
            onChange={(value) => this.setState({canceled_reason: value})}
            value={this.state.canceled_reason}
          />
        </Card>
        <Card>
          <DeleteButton onPress={()=>this.props.toggleActionSheet("cancel_plan", this.state.canceled_reason)}>
            Cancel Plan
          </DeleteButton>
        </Card>
      </Scroll>
    );
  }
}

}

export default Body;
