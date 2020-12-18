import React, { Component } from 'react';

import { Wrapper, Card, Row, CardBody, Input, Copy, HTMLEditor, YouTubeVideo, HTMLMarkdown } from 'app/NativeComponents/common';
import { CardLabel, ToggleSwitch, RadioButton } from 'app/NativeComponents/snippets';

class DistressVideo extends Component{


  renderVideo(){


    if(this.props.edit_user_dealfinder_page.include_video_3 == 1){
      switch(this.props.edit_user_dealfinder_page.distressed_level){

        case "distressed_level_1":

          return(
            <Wrapper>

              <YouTubeVideo
                video={this.props.dealfinder_page_defaults.default_video_3_level_1}
                height={150}
                width={536}
              />
              <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_3_level_1} escapeHtml={false}/>

            </Wrapper>
          );

        break;

        case "distressed_level_2":

          return(
            <Wrapper>

              <YouTubeVideo
                video={this.props.dealfinder_page_defaults.default_video_3_level_2}
                height={150}
                width={536}
              />
              <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_3_level_2} escapeHtml={false}/>

            </Wrapper>
          );

        break;

        case "distressed_level_3":

          return(
            <Wrapper>

              <YouTubeVideo
                video={this.props.dealfinder_page_defaults.default_video_3_level_3}
                height={150}
                width={536}
              />
              <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_3_level_3} escapeHtml={false}/>

            </Wrapper>
          );

        break;

        case "custom":
          return(
            <Wrapper>

              <YouTubeVideo
                video={this.props.edit_user_dealfinder_page.video_3 ? this.props.edit_user_dealfinder_page.video_3 : this.props.dealfinder_page_defaults.default_video_3}
                height={150}
                width={536}
              />
              <Input
                ref={"video_3"}
                name={"video_3"}
                placeholder={"Youtube Link"}
                onChange={(value)=>{
                  this.props.editTeamLinkInfo({prop: "video_3", value})
                }}
                value={this.props.edit_user_dealfinder_page.video_3 ? this.props.edit_user_dealfinder_page.video_3 : this.props.dealfinder_page_defaults.default_video_3}
                type="text"
              />

              <CardLabel
                title={"Distressed Level Video Content:"}
                icon={"code"}
                hasButton={false}
                onPress={()=>{}}
                hasBorder={true}
              />
              <HTMLEditor
                data={this.props.edit_user_dealfinder_page.video_description_3 ? this.props.edit_user_dealfinder_page.video_description_3 : this.props.dealfinder_page_defaults.default_video_description_3}
                onChange={(data)=>{
                  this.props.editTeamLinkInfo({prop: "video_description_3", value: data})
                }}
              />

            </Wrapper>
          );
        break;

      }

    }
  }

  renderOptions(){
    if(this.props.edit_user_dealfinder_page.include_video_3 == 1){
      return(
        <Wrapper>
          <RadioButton
            onPress={()=>{
              this.props.editTeamLinkInfo({prop: "distressed_level", value: "distressed_level_1"})
            }}
            value={this.props.edit_user_dealfinder_page.distressed_level == "distressed_level_1" ? true : false}
            title={"Distressed Level 1"}
            style={{
                borderBottomWidth:1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
          />
          <RadioButton
            onPress={()=>{
              this.props.editTeamLinkInfo({prop: "distressed_level", value: "distressed_level_2"})
            }}
            value={this.props.edit_user_dealfinder_page.distressed_level == "distressed_level_2" ? true : false}
            title={"Distressed Level 2"}
            style={{
                borderBottomWidth:1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
          />
          <RadioButton
            onPress={()=>{
              this.props.editTeamLinkInfo({prop: "distressed_level", value: "distressed_level_3"})
            }}
            value={this.props.edit_user_dealfinder_page.distressed_level == "distressed_level_3" ? true : false}
            title={"Distressed Level 3"}
            style={{
                borderBottomWidth:1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
          />
          <RadioButton
            onPress={()=>{
              this.props.editTeamLinkInfo({prop: "distressed_level", value: "custom"})
            }}
            value={this.props.edit_user_dealfinder_page.distressed_level == "custom" ? true : false}
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
            title={"Distressed Video:"}
            icon={"videocam"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <ToggleSwitch
            style={{
              borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"
            }}
            value={this.props.edit_user_dealfinder_page.include_video_3 == 1 ? true : false}
            onChange={value => {
              //change approveDeals
              this.props.editTeamLinkInfo({ prop: "include_video_3", value: value == true ? 1 : 0 })
            }}
            title={'Include "Distressed Level" Video?'}
            text={'Include one of the default "Distressed Level" videos and text or use your own.'}
          />

          {this.renderOptions()}





        </Card>
      );



    return <Wrapper />

  }
}

export default DistressVideo;
