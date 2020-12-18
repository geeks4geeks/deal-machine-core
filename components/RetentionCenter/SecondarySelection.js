import React, { Component } from 'react';
import {
  Wrapper,
  Scroll,
  Card,
  CardBody,
  Title,
  Copy,
  Bold,
  Spin,
  Video,
  PrimaryButton,
  Row
 } from 'app/NativeComponents/common';

import {
  RadioButton,
  RemoveTextButton,
  TextButton,
  PillButton
} from 'app/NativeComponents/snippets';

import {
  openUrl,
  displayIntercom
} from 'app/NativeActions';

class SecondarySelection extends Component{

  constructor(props){
    super(props);
  }

  renderPrimaryButton(){
    if(this.props.selected_option.primary_cta){
      if(this.props.selected_option.primary_cta.include == true){
        return(
          <PillButton primary={true} onPress={()=>{
            switch(this.props.selected_option.primary_cta.type){
              case "link":
              default:
                openUrl(this.props.selected_option.primary_cta.url);
                this.props.appRedirect({redirect: "dashboard"});
              break;

              case "credit":

              break;

              case "offer":
              case "upgrade":
                if(this.props.selected_option.primary_cta.offer){
                  this.props.setModal({
                    title: this.props.selected_option.primary_cta.offer.offer_button_confirm_title,
                    description: this.props.selected_option.primary_cta.offer.offer_button_confirm_text,
                    icon: "",
                    submit: this.props.selected_option.primary_cta.offer.offer_button_confirm_button_text,
                    //buttonType: "destroy",
                    onPress: ()=>{
                      this.props.pauseOrCancelPlan({
                        token: this.props.token,
                        type: "offer",
                        module_type: this.props.selected_option.primary_cta.offer.offer_module_type,
                        slug: this.props.selected_option.primary_cta.offer.offer_slug,
                        url: this.props.selected_option.primary_cta.offer.offer_button_url
                      });
                    },
                    cancel: 'Nevermind',
                    onCancel: ()=>{
                    }
                  });
                  this.props.toggleModal({show: true, type: "normal"});
                }


              break;
            }
          }}>
          {this.props.selected_option.primary_cta.title}
          </PillButton>
        )
      }

    }
  }

  renderSecondaryButton(){
    if(this.props.selected_option.secondary_cta){
      if(this.props.selected_option.secondary_cta.include == true){
        return(
          <PillButton primary={false} onPress={()=>{
            switch(this.props.selected_option.secondary_cta.type){
              case "link":
              default:
                openUrl(this.props.selected_option.secondary_cta.url);
                this.props.appRedirect({redirect: "dashboard"});
              break;

              case "credit":

              break;

              case "offer":
              case "upgrade":
                if(this.props.selected_option.secondary_cta.offer){
                  this.props.setModal({
                    title: this.props.selected_option.secondary_cta.offer.offer_button_confirm_title,
                    description: this.props.selected_option.secondary_cta.offer.offer_button_confirm_text,
                    icon: "",
                    submit: this.props.selected_option.secondary_cta.offer.offer_button_confirm_button_text,
                    //buttonType: "destroy",
                    onPress: ()=>{
                      this.props.pauseOrCancelPlan({
                        token: this.props.token,
                        type: "offer",
                        module_type: this.props.selected_option.secondary_cta.offer.offer_module_type,
                        slug: this.props.selected_option.secondary_cta.offer.offer_slug,
                        url: this.props.selected_option.secondary_cta.offer.offer_button_url
                      });
                    },
                    cancel: 'Nevermind',
                    onCancel: ()=>{
                    }
                  });
                  this.props.toggleModal({show: true, type: "normal"});
                }


              break;
            }
          }}>
            {this.props.selected_option.secondary_cta.title}
          </PillButton>
        )
      }

    }
  }

  renderPausePlan(){
    if(this.props.selected_option.allow_pause){
      return(
        <CardBody>
          <Title>{this.props.selected_option.pause_title}</Title>
          <Copy>
            {this.props.selected_option.pause_description}
          </Copy>
          <Row style={{justifyContent: "center", marginTop: 10}}>
            <PillButton primary={true} onPress={()=>{
              this.props.pauseMyPlan();
            }}>
            {this.props.selected_option.pause_button_title}
            </PillButton>
          </Row>
        </CardBody>
      )

    }
  }


  render(){

    if(this.props.selected_option){
      return(
        <Scroll>

          <Wrapper style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Card style={{
              alignSelf: "center"
            }}>
              <Video
                video={this.props.selected_option.video}
                height={this.props.device == "desktop" ? 270 : 180}
                width={this.props.device == "desktop" ? 480 : 320}
                autoPlay={true}
                controls={true}
              />
            </Card>
          </Wrapper>

          <CardBody>
            <Title>{this.props.selected_option.response_title}</Title>
            <Copy>
              {this.props.selected_option.response_description}
            </Copy>

            <Row style={{justifyContent: "center", marginTop: 10}}>
              {this.renderPrimaryButton()}
              {this.renderSecondaryButton()}
            </Row>
          </CardBody>


          {this.renderPausePlan()}

          <CardBody>
            <Title>{this.props.selected_option.cancel_title}</Title>
            <Copy>
              {this.props.selected_option.cancel_text}
            </Copy>


          </CardBody>

          <Card>

            {
              this.props.selected_option.secondary_reasons.map((reason, i)=>{
                return(


                  <RadioButton
                    key={i}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: this.props.colors.border_color,
                      borderBottomStyle: "solid"
                    }}
                    onPress={()=>{
                      this.props.startCancelPlan(reason.title);
                    }}
                    value={false}
                    title={reason.title}
                  />
                )
              })
            }
          </Card>


          <CardBody>
            <Copy>{this.props.pause_plan_info.paused_plan_text}</Copy>
          </CardBody>
        
          <TextButton
            style={{paddingTop: 10}}
            onPress={()=>displayIntercom()}
            text={"Need help? Chat with us."}
          />


        </Scroll>
      )
    }

    return <Wrapper />

  }

}

export default SecondarySelection;
