import React, { Component } from 'react';

import { Wrapper, Card, Row, CardBody, Input, Copy, HTMLEditor, YouTubeVideo } from 'app/NativeComponents/common';
import { CardLabel, ToggleSwitch } from 'app/NativeComponents/snippets';


class PhotoVideo extends Component{


  renderVideo(){
    if(this.props.edit_user_dealfinder_page.include_video_4 == 1){
      return(
        <Wrapper>

          <YouTubeVideo
            video={this.props.edit_user_dealfinder_page.video_4 ? this.props.edit_user_dealfinder_page.video_4 : this.props.dealfinder_page_defaults.default_video_4}
            height={150}
            width={536}
          />
          <Input
            ref={"video_4"}
            name={"video_4"}
            placeholder={"Youtube Link"}
            onChange={(value)=>{
              this.props.editTeamLinkInfo({prop: "video_4", value})
            }}
            value={this.props.edit_user_dealfinder_page.video_4 ? this.props.edit_user_dealfinder_page.video_4 : this.props.dealfinder_page_defaults.default_video_4}
            type="text"
          />

          <CardLabel
            title={"Photo Video Content:"}
            icon={"code"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <HTMLEditor
            data={this.props.edit_user_dealfinder_page.video_description_4 ? this.props.edit_user_dealfinder_page.video_description_4 : this.props.dealfinder_page_defaults.default_video_description_4}
            onChange={(data)=>{
              this.props.editTeamLinkInfo({prop: "video_description_4", value: data})
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
            title={"Taking Photos Video:"}
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
            value={this.props.edit_user_dealfinder_page.include_video_4 == 1 ? true : false}
            onChange={value => {
              //change approveDeals
              this.props.editTeamLinkInfo({ prop: "include_video_4", value: value == true ? 1 : 0 })
            }}
            title={'Include "Taking Photos" Video?'}
            text={'Include the default "Taking Photos" video and text or use your own.'}
          />

          {this.renderVideo()}





        </Card>
      );



    return <Wrapper />

  }
}

export default PhotoVideo;
