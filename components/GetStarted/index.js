import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  /*mobile*/
  toggleCanPop,

  getMainPlans,
  toggleCopy,
  appRedirect

} from 'app/NativeActions';

import Body from './Body';

import NavigationService from 'app/Router/NavigationService';


class GetStarted extends Component{

  componentWillUnmount(){

  }

  componentDidMount(){
    //set navigation service for router...very important
    NavigationService.setTopLevelNavigator(this.props.navigation);

    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
    }
    this.props.getMainPlans();

  }

  render(){

    return(
      <Container>
        <Body
          {...this.props}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({ auth, native, drawer, marketing, settings }) => {

  const { init, user, loading, copy_tab, plans, plans_loading, plans_error } = auth;
  const { stats } = drawer;
  const { device, isIphoneX, platform, window_height, window_width, isMobile } = native;
  const { user_info, partner_info } = marketing;
  const { colors } = settings;

  return {
    init,
    loading,
    copy_tab,
    plans,
    plans_loading,
    plans_error,

    device,
    isIphoneX,
    platform,
    window_height,
    window_width,
    isMobile,

    user_info,
    partner_info,
    user,
    stats,
    colors
  };
}

export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,

  getMainPlans,
  toggleCopy,
  appRedirect
})(GetStarted);
