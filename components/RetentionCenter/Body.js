import React, { Component } from 'react';
import {
  Wrapper,
  Scroll,
  Card,
  CardBody,
  MultiLineInput,
  Title,
  Copy,
  Bold,
  Video,
  DeleteButton
 } from 'app/NativeComponents/common';
import { TextButton, RadioButton, CardLabel } from 'app/NativeComponents/snippets';

import SecondarySelection from './SecondarySelection';
import OfferVideo from './OfferVideo';

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

  renderLosingItems(){
    if(this.props.pause_plan_info.losing_items){
      if(this.props.pause_plan_info.losing_items.length > 0){
        return(
          <Wrapper>
            {
              this.props.pause_plan_info.losing_items.map((losing_item, i)=>{
                if(losing_item.number){
                  return(
                    <Copy key={i}>- <Bold>{losing_item.number}</Bold> {losing_item.text}</Copy>
                  )
                }else{
                  return(
                    <Copy key={i}>- <Bold>{losing_item.text}</Bold></Copy>
                  )
                }
              })
            }
          </Wrapper>
        )
      }
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

    if(this.props.is_canceling){
      return(
        <Scroll>
          <CardBody>
            <Title style={{
              marginBottom: 10
            }}>{this.props.pause_plan_info.final_text}</Title>
            {this.renderLosingItems()}

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
              onChange={(value) => this.props.updateCanceledReason(value)}
              value={this.props.canceled_reason}
            />
          </Card>

          <Card>
            <DeleteButton
              onPress={()=>{
                this.props.cancelMyPlan();
              }}
            >
              Cancel and Delete My {this.props.billing_details.plan_module_title} Plan
            </DeleteButton>
          </Card>

          <TextButton
            onPress={()=>{
              this.props.appRedirect({redirect: "goBack", payload:{type: "billing"}})
            }}
            text={"Nevermind. I want to keep my account"}
          />
        </Scroll>
      )
    }

    if(this.props.selected_option){
      return(
        <SecondarySelection selected_option={this.props.selected_option} {...this.props}/>
      )
    }

    if(this.props.pause_plan_info){



      return (
        <Scroll>

          <OfferVideo {...this.props}/>
          <Card>

            <CardLabel
              title={this.props.pause_plan_info.cancel_options_title}
              icon={""}
              hasButton={false}
              onPress={()=>{}}
              hasBorder={true}
            />
            {this.props.pause_plan_info.cancel_options.map((option, i)=>{

              return(
                <RadioButton
                  key={i}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: this.props.colors.border_color,
                    borderBottomStyle: "solid"
                  }}
                  onPress={()=>this.props.selectCancelOption(option)}
                  value={this.props.selected_option ?
                  this.props.selected_option.id == option.id ? true : false : false}
                  title={option.subtitle+" "+option.title}
                />
              )

            })}

          </Card>



        </Scroll>
      );
    }

    return <Wrapper />
  }

}

export default Body;
