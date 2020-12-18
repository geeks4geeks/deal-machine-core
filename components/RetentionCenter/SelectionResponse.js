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
  MenuItem,
  RemoveTextButton,
  TextButton,
  PillButton
} from 'app/NativeComponents/snippets';

import {
  openUrl,
  displayIntercom
} from 'app/NativeActions';

class SelectionResponse extends Component{

  constructor(props){
    super(props);
  }

  render(){

    if(this.props.selected_option){
      return(
        <Scroll>

          <CardBody>
            <Copy>
              {this.props.selected_option.canned_response}
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
                video={this.props.selected_option.video}
                height={this.props.device == "desktop" ? 270 : 180}
                width={this.props.device == "desktop" ? 480 : 320}
                autoPlay={true}
                controls={true}
              />
            </Card>
          </Wrapper>

          <Card>
            {
              this.props.selected_option.resources.map((resource, i)=>{
                return(
                  <MenuItem
                    key={i}
                    onPress={()=>{
                      switch(resource.link){
                        default:
                          openUrl(resource.link);
                        break;

                        case "pause":

                          if(this.props.device == "desktop"){
                            openUrl("https://dealmachine.com/app/settings/billing/current-plan");
                          }else{
                            this.props.appRedirect({redirect: "settings"});
                            this.props.appRedirect({redirect: "currentPlan"});
                          }

                        break;

                        case "upgrade":
                          this.props.pauseMyPlan();
                        break;

                        case "chat":
                          displayIntercom();
                        break;
                      }
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: this.props.colors.border_color,
                      borderBottomStyle: "solid"
                    }}
                    title={resource.title}
                    icon={resource.icon}
                    fa_icon={resource.fa_icon}
                  />
                )
              })
            }
          </Card>


          <CardBody>
            <Copy>{this.props.pause_plan_info.paused_plan_text}</Copy>
          </CardBody>
          <Row style={{alignItems: "center", justifyContent: "center"}}>
            <PillButton primary={true}
              onPress={()=>{
                this.props.pauseMyPlan();
              }}
            >
              Pause Plan and Save my Data
            </PillButton>
          </Row>
          <RemoveTextButton
            style={{paddingBottom: 10}}
            text={"Cancel and Delete My "+this.props.billing_details.plan_module_title+" Plan"}
            onPress={()=>{
              this.props.startCancelPlan();
            }}
          />
          <TextButton
            style={{paddingTop: 10}}
            onPress={displayIntercom}
            text={"Need help? Chat with us."}
          />


        </Scroll>
      )
    }

    return <Wrapper />

  }

}

export default SelectionResponse;
