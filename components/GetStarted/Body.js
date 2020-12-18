import React, { Component } from 'react';
import { Wrapper, Spinner } from 'app/NativeComponents/common';

import GetStartedWrapper from 'app/NativeComponents/components/GetStartedWrapper';
import TitleScreen from './TitleScreen';

class Body extends Component{



  render(){
    if(!this.props.loading && this.props.init && !this.props.user){
      return (
        <GetStartedWrapper
          {...this.props}
          titleScreen={()=>{
            return <TitleScreen {...this.props} />;
          }}
        >


          {/*this.renderTabs()*/}
        </GetStartedWrapper>
      );
    }else{
      return <Spinner background_color={this.props.colors.background_color} color={this.props.colors.active_color}/>
    }
  }

}

export default Body;
