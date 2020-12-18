import React, { Component } from 'react';

import { Wrapper, Card, CardBody, YouTubeVideo, Copy, HTMLMarkdown } from 'app/NativeComponents/common';

class DistressedVideo extends Component{

  componentDidMount(){
    if(this.props.step == 3 && this.props.user_dealfinder_page.include_video_3 == 0){
      this.props.nextStep(parseInt(this.props.index)+1);
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.step == 3 && prevProps.user_dealfinder_page.include_video_3 == 0){
      this.props.nextStep(parseInt(prevProps.index)+1);
    }
  }

  render(){

      if(this.props.step == 3 && this.props.user_dealfinder_page.include_video_3 == 1){

        switch(this.props.user_dealfinder_page.distressed_level){

          case "distressed_level_1":
            return(
              <Wrapper style={{
                marginTop: 20
              }}>
                <Wrapper style={{
                alignItems: "center",
                justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_3_level_1}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay
                  />
                </Wrapper>

                  <CardBody style={{padding: 10}}>

                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_3_level_1} escapeHtml={false}/>

                </CardBody>
              </Wrapper>
            );

          break;

          case "distressed_level_2":
            return(
              <Wrapper style={{
                marginTop: 20
              }}>

              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_3_level_2}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay
                  />
                </Wrapper>

                <CardBody>


                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_3_level_2} escapeHtml={false}/>

                </CardBody>
              </Wrapper>
            );
          break;

          case "distressed_level_3":
            return(
              <Wrapper style={{
                marginTop: 20
              }}>

              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_3_level_3}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay
                  />
                </Wrapper>

                <CardBody>
                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_3_level_3} escapeHtml={false}/>
                </CardBody>
              </Wrapper>
            );

          break;

          case "custom":
            return(
              <Wrapper style={{
                marginTop: 20
              }}>

              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.user_dealfinder_page.video_3 ? this.props.user_dealfinder_page.video_3 : this.props.dealfinder_page_defaults.default_video_3}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay
                  />
                </Wrapper>

                <CardBody>


                  <HTMLMarkdown source={this.props.user_dealfinder_page.video_description_3 ? this.props.user_dealfinder_page.video_description_3 : this.props.dealfinder_page_defaults.default_video_description_3} escapeHtml={false}/>

                </CardBody>
              </Wrapper>
            );
          break;



        }


        return(
          <CardBody>
            <Copy>No video found...please click "Next"</Copy>
          </CardBody>
        )
      }

      return <Wrapper />

  }
}

export default DistressedVideo;
