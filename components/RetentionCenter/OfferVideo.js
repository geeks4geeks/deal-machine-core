
import React, { Component } from 'react';
import {
  Wrapper,
  CardBody,
  Copy,
  Video,
  Title,
  Card
 } from 'app/NativeComponents/common';
import {
  PillButton
} from 'app/NativeComponents/snippets'

class OfferVideo extends Component{


  render(){

    if(this.props.pause_plan_info.show_offer && this.props.pause_plan_info.offer){
      return(
        <Wrapper>
          <CardBody>
            <Title>
              {this.props.pause_plan_info.offer.offer_title}
            </Title>
          </CardBody>
          <Wrapper style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Card style={{
              alignSelf: "center"
            }}>
              <Video
                video={this.props.pause_plan_info.offer.offer_video}
                height={this.props.device == "desktop" ? 270 : 180}
                width={this.props.device == "desktop" ? 480 : 320}
                autoPlay={true}
                controls={true}
              />
            </Card>
          </Wrapper>

          <CardBody>
            <Copy>
              {this.props.pause_plan_info.offer.offer_description}
            </Copy>
            <Wrapper style={{alignItems:"center", justifyContent: "center", marginTop: 10}}>
              <PillButton primary={true} onPress={()=>{
                switch(this.props.pause_plan_info.offer.offer_button_type){
                  case "upgrade":
                  default:
                    this.props.setModal({
                      title: this.props.pause_plan_info.offer.offer_button_confirm_title,
                      description: this.props.pause_plan_info.offer.offer_button_confirm_text,
                      icon: "",
                      submit: this.props.pause_plan_info.offer.offer_button_confirm_button_text,
                      //buttonType: "destroy",
                      onPress: ()=>{
                        this.props.pauseOrCancelPlan({
                          token: this.props.token,
                          type: "offer",
                          module_type: this.props.pause_plan_info.offer.offer_module_type,
                          slug: this.props.pause_plan_info.offer.offer_slug,
                          url: this.props.pause_plan_info.offer.offer_button_url
                        });
                      },
                      cancel: 'Nevermind'
                    });
                    this.props.toggleModal({show: true, type: "normal"});
                  break;
                }
              }}>
              {this.props.pause_plan_info.offer.offer_button_text}
              </PillButton>
            </Wrapper>
          </CardBody>

        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <CardBody>
          <Copy>
            {this.props.pause_plan_info.start_text}
          </Copy>
        </CardBody>
        <Wrapper style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Card style={{
            alignSelf: "center"
          }}>
            <Video
              video={this.props.pause_plan_info.retention_center_video}
              height={this.props.device == "desktop" ? 270 : 180}
              width={this.props.device == "desktop" ? 480 : 320}
              autoPlay={true}
              controls={true}
            />
          </Card>
        </Wrapper>
      </Wrapper>
    )
  }

}

export default OfferVideo;
