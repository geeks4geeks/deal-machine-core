import React, { Component } from 'react';
import { YouTubeVideo } from 'app/NativeComponents/common';

import { Wrapper } from 'app/NativeComponents/common';
import {store} from 'app/store';


class VideoContainer extends Component{


   VideoOnReady(event) {

     const device = store.getState().native.device;

     // access to player in all event handlers via event.target
     if(device == "desktop"){
       event.target.playVideo();
     }
   }

  render() {
    if(this.props.video && this.props.video != ""){

        return (

          <YouTubeVideo
            video={this.props.video}
            height={150}
            width={536}
          />
        );
      }

      return <Wrapper />;

    }

}

export default VideoContainer;
