import React, { Component } from 'react';

import { Wrapper, Card, CardBody, YouTubeVideo, HTMLMarkdown } from 'app/NativeComponents/common';

class RoutesVideo extends Component{



  render(){

      if(this.props.user_dealfinder_page.include_video_6 == 1){

        return(
          <Card>
          <Wrapper style={{
          alignItems: "center",
          justifyContent: "center"}}>
              <YouTubeVideo
                video={this.props.user_dealfinder_page.video_6 ? this.props.user_dealfinder_page.video_6 : this.props.dealfinder_page_defaults.default_video_6}
                height={this.props.isMobile ? 202 : 301}
                width={this.props.isMobile ? 360 : 536}
                autoplay={true}

              />
            </Wrapper>

            <CardBody style={{padding: 10}}>


              <HTMLMarkdown source={this.props.user_dealfinder_page.video_description_6 ? this.props.user_dealfinder_page.video_description_6 : this.props.dealfinder_page_defaults.default_video_description_6} escapeHtml={false}/>

            </CardBody>
          </Card>
        );
      }

      return <Wrapper />

  }
}

export default RoutesVideo;
