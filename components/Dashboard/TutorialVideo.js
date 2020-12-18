import React, { Component } from "react";

import {
  Container,
  Title,
  YouTubeVideo,
  Spin,
  CenterCenter,
  Wrapper,
} from "app/NativeComponents/common";

import {
  loadDashboardVideoTutorial,
  textStyleFromContentful
} from "app/NativeActions";

class TutorialVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: null,
      titleStyle: {},
      video: null
    }
  }

  componentDidMount() {
    this.setState(() => ({loading: true}));

    loadDashboardVideoTutorial()
    .then((data) => {
      if (data && data.items && data.items.length > 0) {
        this.setState(() => ({
          video: data.items[0].fields.videoUrl,
          title: data.items[0].fields.title,
          titleStyle: textStyleFromContentful(data.items[0].fields.titleStyle)
        }));
      }
      this.setState(() => ({loading: false}));
    })
    .catch((err) => {
      console.error(err);
      this.setState(() => ({loading: false}));
    });
  }

  onVideoContainerResize(w, h) {
    let videoW = Math.floor(w - 20);
    let videoH = Math.floor(h - 20);

    const ratioH = Math.floor(videoW * 9.0 / 16.0);
    if (videoH <= 0) {
      videoH = ratioH;
    } else if (ratioH > videoH) {
      const ratioW = Math.floor(videoH * 16.0 / 9.0);
      videoW = ratioW;
    } else {
      videoH = ratioH;
    }

    this.setState(() => ({videoWidth: videoW, videoHeight: videoH}));
  }

  render() {

    return (
      <Wrapper>

        <Wrapper style={{
          alignItems: "center", justifyContent: "center"
        }}>
          { this.state.video && <YouTubeVideo video={this.state.video}
          height={this.props.isMobile ? 202 : 301}
          width={this.props.isMobile ? 360 : 536}
          platform = {this.props.platform}
          withCard/> }
        </Wrapper>
      </Wrapper>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 0
  },

  videoContainer: {
    padding: 10,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
}

export default TutorialVideo;
