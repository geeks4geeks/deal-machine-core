import React, { Component } from 'react';

import { Wrapper, Card, Row, CardBody, Input, Copy, HTMLEditor, YouTubeVideo } from 'app/NativeComponents/common';
import { CardLabel, ToggleSwitch } from 'app/NativeComponents/snippets';


class RoutesVideo extends Component{


  renderVideo(){
    if(this.props.edit_user_dealfinder_page.include_video_7 == 1){
      return(
        <Wrapper>

          <YouTubeVideo
            video={this.props.edit_user_dealfinder_page.video_7 ? this.props.edit_user_dealfinder_page.video_7 : this.props.dealfinder_page_defaults.default_video_7}
            height={150}
            width={536}
          />
          <Input
            ref={"video_7"}
            name={"video_7"}
            placeholder={"Youtube Link"}
            onChange={(value)=>{
              this.props.editTeamLinkInfo({prop: "video_7", value})
            }}
            value={this.props.edit_user_dealfinder_page.video_7 ? this.props.edit_user_dealfinder_page.video_7 : this.props.dealfinder_page_defaults.default_video_7}
            type="text"
          />

          <CardLabel
            title={"Tracking Video Content:"}
            icon={"code"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <HTMLEditor
            data={this.props.edit_user_dealfinder_page.video_description_7 ? this.props.edit_user_dealfinder_page.video_description_7 : this.props.dealfinder_page_defaults.default_video_description_7}
            onChange={(data)=>{
              this.props.editTeamLinkInfo({prop: "video_description_7", value: data})
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
            title={"Tracking Video:"}
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
            value={this.props.edit_user_dealfinder_page.include_video_7 == 1 ? true : false}
            onChange={value => {
              //change approveDeals
              this.props.editTeamLinkInfo({ prop: "include_video_7", value: value == true ? 1 : 0 })
            }}
            title={'Include "Tracking" Video?'}
            text={'Include the default "Tracking" video and text or use your own.'}
          />

          {this.renderVideo()}





        </Card>
      );



    return <Wrapper />

  }
}

export default RoutesVideo;
