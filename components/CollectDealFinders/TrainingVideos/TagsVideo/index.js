import React, { Component } from 'react';

import { Wrapper, Card, Row, CardBody, Input, Copy, HTMLEditor, YouTubeVideo } from 'app/NativeComponents/common';
import { CardLabel, ToggleSwitch } from 'app/NativeComponents/snippets';


class TagsVideo extends Component{


  renderVideo(){
    if(this.props.edit_user_dealfinder_page.include_video_5 == 1){
      return(
        <Wrapper>

          <YouTubeVideo
            video={this.props.edit_user_dealfinder_page.video_5 ? this.props.edit_user_dealfinder_page.video_5 : this.props.dealfinder_page_defaults.default_video_5}
            height={150}
            width={536}
          />
          <Input
            ref={"video_5"}
            name={"video_5"}
            placeholder={"Youtube Link"}
            onChange={(value)=>{
              this.props.editTeamLinkInfo({prop: "video_5", value})
            }}
            value={this.props.edit_user_dealfinder_page.video_5 ? this.props.edit_user_dealfinder_page.video_5 : this.props.dealfinder_page_defaults.default_video_5}
            type="text"
          />

          <CardLabel
            title={"Tags and Notes Video Content:"}
            icon={"code"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <HTMLEditor
            data={this.props.edit_user_dealfinder_page.video_description_5 ? this.props.edit_user_dealfinder_page.video_description_5 : this.props.dealfinder_page_defaults.default_video_description_5}
            onChange={(data)=>{
              this.props.editTeamLinkInfo({prop: "video_description_5", value: data})
            }}
          />

        </Wrapper>
      )
    }
  }

  render(){
      return(
        <Card>

          <CardLabel
            title={"Tags and Notes Video:"}
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
            value={this.props.edit_user_dealfinder_page.include_video_5 == 1 ? true : false}
            onChange={value => {
              //change approveDeals
              this.props.editTeamLinkInfo({ prop: "include_video_5", value: value == true ? 1 : 0 })
            }}
            title={'Include "Tags and Notes" Video?'}
            text={'Include the default "Tags and Notes" video and text or use your own.'}
          />

          {this.renderVideo()}





        </Card>
      );



    return <Wrapper />

  }
}

export default TagsVideo;
