import React, { Component } from "react";

import { ExternalImage, Wrapper, Card, Video } from "app/NativeComponents/common";

class Media extends Component {

  constructor(props){
    super(props);
  }

  renderImage(){

  }

  render() {

    if(!this.props.isCard){
      if(this.props.onboarding_info.video){
        return(
          <Wrapper style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Card style={{
              alignSelf: "center"
            }}>
              <Video
                video={this.props.onboarding_info.video.fields.file.url}
                height={!this.props.isMobile ? 270 : 180}
                width={!this.props.isMobile ? 480 : 320}
                autoPlay={true}
                controls={false}
                muted={true}
                loop={true}
              />
            </Card>
          </Wrapper>
        )
      }

      if(this.props.onboarding_info.image){
        return(
          <ExternalImage
            style={{
              resizeMode: "contain",
              width: 200,
              height: this.props.device == "desktop" ? 150 : 150
            }}
            contain={true}
            image={this.props.onboarding_info.image.fields.file.url}

          />
        )
      }
    }
    return <Wrapper />

  }
}
export default Media;
