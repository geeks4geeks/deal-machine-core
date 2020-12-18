import React, { Component } from 'react';

import { Wrapper, Card, CardBody, YouTubeVideo, Copy, HTMLMarkdown } from 'app/NativeComponents/common';

class PaymentVideo extends Component{

  render(){

      if(this.props.user_dealfinder_page.include_video_2 == 1){

        switch(this.props.user_dealfinder_page.payment_type){

          case "hourly":
            return(
              <Card>
                <Wrapper style={{
                alignItems: "center",
                justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_2_hourly}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                  />
                </Wrapper>

                <CardBody style={{padding: 10}}>


                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_hourly} escapeHtml={false}/>

                </CardBody>
              </Card>
            );

          break;

          case "property":
            return(
              <Card>
              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_2_property}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay={true}

                  />
                </Wrapper>

                <CardBody style={{padding: 10}}>


                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_property} escapeHtml={false}/>

                </CardBody>
              </Card>
            );
          break;

          case "closed":
            return(
              <Card>
              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.dealfinder_page_defaults.default_video_2_closed}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay={true}

                  />
                </Wrapper>

                <CardBody style={{padding: 10}}>
                  <HTMLMarkdown source={this.props.dealfinder_page_defaults.default_video_description_2_closed} escapeHtml={false}/>
                </CardBody>
              </Card>
            );

          break;

          case "custom":
            return(
              <Card>
              <Wrapper style={{
              alignItems: "center",
              justifyContent: "center"}}>
                  <YouTubeVideo
                    video={this.props.user_dealfinder_page.video_2 ? this.props.user_dealfinder_page.video_2 : this.props.dealfinder_page_defaults.default_video_2}
                    height={this.props.isMobile ? 202 : 301}
                    width={this.props.isMobile ? 360 : 536}
                    autoplay={true}

                  />
                </Wrapper>

                <CardBody style={{padding: 10}}>


                  <HTMLMarkdown source={this.props.user_dealfinder_page.video_description_2 ? this.props.user_dealfinder_page.video_description_2 : this.props.dealfinder_page_defaults.default_video_description_2} escapeHtml={false}/>

                </CardBody>
              </Card>
            );
          break;



        }


        return(
          <Card>
            <CardBody>
              <Copy>No video found...please click "Next"</Copy>
            </CardBody>
          </Card>
        )
      }

      return <Wrapper />

  }
}

export default PaymentVideo;
