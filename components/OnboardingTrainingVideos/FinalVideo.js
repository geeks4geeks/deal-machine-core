import React, { Component } from 'react';

import { Wrapper, Card, CardBody, YouTubeVideo, HTMLMarkdown } from 'app/NativeComponents/common';

class FinalVideo extends Component{

  componentDidMount(){
    if(this.props.step == 7 && this.props.user_dealfinder_page.include_video_7 == 0){
      this.props.nextStep(parseInt(this.props.index)+1);
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.step == 7 && prevProps.user_dealfinder_page.include_video_7 == 0){
      this.props.nextStep(parseInt(prevProps.index)+1);
    }
  }

  render(){

      if(this.props.step == 7 && this.props.user_dealfinder_page.include_video_7 == 1){

        return(
          <Wrapper style={{
            marginTop: 20
          }}>

          <Wrapper style={{
          alignItems: "center",
          justifyContent: "center"}}>
              <YouTubeVideo
                video={this.props.user_dealfinder_page.video_7 ? this.props.user_dealfinder_page.video_7 : this.props.dealfinder_page_defaults.default_video_7}
                height={this.props.isMobile ? 202 : 301}
                width={this.props.isMobile ? 360 : 536}
                autoplay
              />
            </Wrapper>

              <CardBody style={{padding: 10}}>


              <HTMLMarkdown source={this.props.user_dealfinder_page.video_description_7 ? this.props.user_dealfinder_page.video_description_7 : this.props.dealfinder_page_defaults.default_video_description_7} escapeHtml={false}/>

            </CardBody>
          </Wrapper>
        );
      }

      return <Wrapper />

  }
}

export default FinalVideo;
