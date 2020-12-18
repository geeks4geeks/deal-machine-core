import React, { Component } from 'react';

import { Wrapper, Card, Row, CardBody, Input, Copy, HTMLEditor, YouTubeVideo, HTMLMarkdown } from 'app/NativeComponents/common';
import { CardLabel, ToggleSwitch, RadioButton } from 'app/NativeComponents/snippets';

class PaymentVideo extends Component{


  renderVideo(){


    if(this.props.edit_user_dealfinder_page.include_video_2 == 1){
      switch(this.props.edit_user_dealfinder_page.payment_type){

        case "hourly":

          return(
            <Wrapper>

              <YouTubeVideo
                video={this.props.dealfinder_page_defaults.default_video_2_hourly}
                height={150}
                width={536}
              />
              <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_hourly} escapeHtml={false}/>

            </Wrapper>
          );

        break;

        case "property":

          return(
            <Wrapper>

              <YouTubeVideo
                video={this.props.dealfinder_page_defaults.default_video_2_property}
                height={150}
                width={536}
              />
              <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_property} escapeHtml={false}/>

            </Wrapper>
          );

        break;

        case "closed":

          return(
            <Wrapper>

              <YouTubeVideo
                video={this.props.dealfinder_page_defaults.default_video_2_closed}
                height={150}
                width={536}
              />
              <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_closed} escapeHtml={false}/>

            </Wrapper>
          );

        break;

        case "custom":
          return(
            <Wrapper>

              <YouTubeVideo
                video={this.props.edit_user_dealfinder_page.video_2 ? this.props.edit_user_dealfinder_page.video_2 : this.props.dealfinder_page_defaults.default_video_2}
                height={150}
                width={536}
              />
              <Input
                ref={"video_2"}
                name={"video_2"}
                placeholder={"Youtube Link"}
                onChange={(value)=>{
                  this.props.editTeamLinkInfo({prop: "video_2", value})
                }}
                value={this.props.edit_user_dealfinder_page.video_2 ? this.props.edit_user_dealfinder_page.video_2 : this.props.dealfinder_page_defaults.default_video_2}
                type="text"
              />

              <CardLabel
                title={"Payment Video Content:"}
                icon={"code"}
                hasButton={false}
                onPress={()=>{}}
                hasBorder={true}
              />
              <HTMLEditor
                data={this.props.edit_user_dealfinder_page.video_description_2 ? this.props.edit_user_dealfinder_page.video_description_2 : this.props.dealfinder_page_defaults.default_video_description_2}
                onChange={(data)=>{
                  this.props.editTeamLinkInfo({prop: "video_description_2", value: data})
                }}
              />

            </Wrapper>
          );
        break;

      }

    }
  }

  renderOptions(){
    if(this.props.edit_user_dealfinder_page.include_video_2 == 1){
      return(
        <Wrapper>
          <RadioButton
            onPress={()=>{
              this.props.editTeamLinkInfo({prop: "payment_type", value: "hourly"})
            }}
            value={this.props.edit_user_dealfinder_page.payment_type == "hourly" ? true : false}
            title={"Hourly"}
            style={{
                borderBottomWidth:1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
          />
          <RadioButton
            onPress={()=>{
              this.props.editTeamLinkInfo({prop: "payment_type", value: "property"})
            }}
            value={this.props.edit_user_dealfinder_page.payment_type == "property" ? true : false}
            title={"Per Property"}
            style={{
                borderBottomWidth:1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
          />
          <RadioButton
            onPress={()=>{
              this.props.editTeamLinkInfo({prop: "payment_type", value: "closed"})
            }}
            value={this.props.edit_user_dealfinder_page.payment_type == "closed" ? true : false}
            title={"Per Closed Deal"}
            style={{
                borderBottomWidth:1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
          />
          <RadioButton
            onPress={()=>{
              this.props.editTeamLinkInfo({prop: "payment_type", value: "custom"})
            }}
            value={this.props.edit_user_dealfinder_page.payment_type == "custom" ? true : false}
            title={"Custom"}
            style={{
                borderBottomWidth:1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
          />
          {this.renderVideo()}

        </Wrapper>
      )

    }
  }

  render(){
      return(
        <Card>

          <CardLabel
            title={"Payment Video:"}
            icon={"videocam"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <ToggleSwitch
            style={{
              borderBottomWidth:1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"
            }}
            value={this.props.edit_user_dealfinder_page.include_video_2 == 1 ? true : false}
            onChange={value => {
              //change approveDeals
              this.props.editTeamLinkInfo({ prop: "include_video_2", value: value == true ? 1 : 0 })
            }}
            title={'Include "Payment" Video?'}
            text={'Include one of the default "Payment" videos and text or use your own.'}
          />

          {this.renderOptions()}





        </Card>
      );



    return <Wrapper />

  }
}

export default PaymentVideo;
