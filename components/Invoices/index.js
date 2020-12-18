import React, { Component } from 'react';
import { connect } from 'react-redux';

import Body from './Body';


import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,

  changeTab,
  appRedirect,

  getInvoices,
  /*common functions*/
  dismissMobileKeyboard

} from 'app/NativeActions';

class Invoices extends Component{

  componentDidMount(){

    if(this.props.user.team_owner != 1 || this.props.user.team_clearance_level < 2 || this.props.user.user_version == 0){
      this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
    }else{

      //get invoices
      this.props.getInvoices({token: this.props.token, type: "invoices", begin: 0});

      if(this.props.device == "mobile"){
        if(this.props.onboarding){
          this.props.toggleCanPop("");
        }else{
          this.props.toggleCanPop("normal");
        }
        this.props.toggleDrawer("close");
        this.props.lockDrawer(true);
      }
      this.props.changeTab("settings");
    }
  }

  render() {

    return (
      <Body
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ auth, native, billing, drawer, settings }) => {
  const { token, user, onboarding } = auth;
  const { device, platform } = native;
  const { colors } = settings;
  const {
    invoices,
    invoices_loading,
    invoices_refreshing,
    invoices_loaded_all,
    invoices_error,
    total_spent,
    start_date,
    end_date,
    begin
  } = billing;
  const { stats } = drawer;

  return {
    token,
    user,
    onboarding,
    device,
    platform,
    invoices,
    invoices_loading,
    invoices_refreshing,
    invoices_loaded_all,
    invoices_error,
    total_spent,
    start_date,
    end_date,
    stats,
    begin,
    colors
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,

  changeTab,
  appRedirect,

  getInvoices
})(Invoices);
