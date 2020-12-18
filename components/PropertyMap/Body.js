import React, {Component} from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import Map from 'app/NativeComponents/components/Map';

class Body extends Component {

  componentDidMount(){
    if(!this.props.user.user_default_lat && !this.props.user.user_default_lng){
      this.props.toggleOnboarding(true);
      this.props.appRedirect({redirect: "defaultLocation"});
    }
  }

  render() {
    return (
      <Map {...this.props}/>
    )
  }
}


export default Body;
