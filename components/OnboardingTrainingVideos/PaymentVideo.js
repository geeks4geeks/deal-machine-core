import React, { Component } from 'react';

import { Wrapper, Card, CardBody, YouTubeVideo, Copy, HTMLMarkdown } from 'app/NativeComponents/common';

class PaymentVideo extends Component{

  componentDidMount(){
    if(this.props.step == 2 && this.props.user_dealfinder_page.include_video_2 == 0){
      this.props.nextStep(parseInt(this.props.index)+1);
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.step == 2 && prevProps.user_dealfinder_page.include_video_2 == 0){
      this.props.nextStep(parseInt(prevProps.index)+1);
    }
  }

  render(){

      if(this.props.step == 2 && this.props.user_dealfinder_page.include_video_2 == 1){

        switch(this.props.user_dealfinder_page.payment_type){

          case "hourly":
            return(
              <Wrapper style={{
                marginTop: 20
              }}>

              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_2_hourly}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay
                  />
                </Wrapper>

                  <CardBody style={{padding: 10}}>


                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_hourly} escapeHtml={false}/>

                </CardBody>
              </Wrapper>
            );

          break;

          case "property":
            return(
              <Wrapper style={{
                marginTop: 20
              }}>

              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_2_property}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay
                  />
                </Wrapper>

                  <CardBody style={{padding: 10}}>


                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_property} escapeHtml={false}/>

                </CardBody>
              </Wrapper>
            );
          break;

          case "closed":
            return(
              <Wrapper style={{
                marginTop: 20
              }}>

              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_2_closed}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay
                  />
                </Wrapper>

                  <CardBody style={{padding: 10}}>
                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_closed} escapeHtml={false}/>
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
                    video={this.props.user_dealfinder_page.video_2 ? this.props.user_dealfinder_page.video_2 : this.props.dealfinder_page_defaults.default_video_2}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay
                  />
                </Wrapper>

                  <CardBody style={{padding: 10}}>


                  <HTMLMarkdown source={this.props.user_dealfinder_page.video_description_2 ? this.props.user_dealfinder_page.video_description_2 : this.props.dealfinder_page_defaults.default_video_description_2} escapeHtml={false}/>

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

export default PaymentVideo;
