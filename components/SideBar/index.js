import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Gradient, Wrapper, Scroll, Row } from 'app/NativeComponents/common';

import {
  changeTab,
  toggleDealsOptions,
  setModal,
  toggleModal,
  appRedirect,
  getStats,
  toggleDealCreditModal,
  toggleDrawer,
  mobileToggleDrawer,
  getBilling,
  toggleActionSheet,
  selectActiveProperty,
  setActiveList,
  /*common functions*/
  displayIntercom
} from 'app/NativeActions';

import NavigationHandler from './NavigationHandler';
import BackgroundLocation from 'app/Router/BackgroundLocation';

import Profile from './Profile';
import SideBarButton from './SideBarButton';
import PartnerLogos from './Partner/PartnerLogos';

import PartnerButton from './Partner/PartnerButton';

import DealsButton from './DealsButton';
import MailerButtons from './MailerButtons';
import SettingsButtons from './SettingsButtons';
import ListsButton from './ListsButton';



class SideBar extends Component{

  constructor(props){
    super(props);

    this.state = {
      intercom_opened: false
    };

  }

  renderSupportButton(props){
    //temp fix until intercom works on mobile safari
    //if(this.props.web_platform != "ios"){
      return(
        <SideBarButton
          {...this.props}
          id={"intercom_button"}
          active={false}
          title="Help & Support"
          icon="help"
          onPress={()=>{
            if(this.props.track_route == true &&
              this.state.intercom_opened == false &&
              this.props.platform == "android"
            ){
              this.props.toggleActionSheet(null);
              this.props.setModal({
                  title: 'Are you sure you want to continue?',
                  description: "This may cause Driving Routes to slow down or even crash",
                  icon: "error",
                  submit: 'Continue',
                  onPress: ()=>{
                    displayIntercom();
                  },
                  cancel: 'Nevermind.',
                  onCancel: ()=>{}
                });
                this.props.toggleModal({show: true, type: "normal"});
                this.setState({intercom_opened: true})


            }else{
              displayIntercom();
            }
          }}
          hideButton={false}

        />
      )
    //}
  }

  renderHandlers(){
    if(this.props.device != "desktop"){
      return (
        <Wrapper>
          <NavigationHandler {...this.props}/>
          <BackgroundLocation />
        </Wrapper>
      )
    }else{
      return <BackgroundLocation />;
    }
  }

  renderDashboardButton(){
    if(this.props.user.team_clearance_level > 0){
      return(
        <Wrapper>
          <SideBarButton
            {...this.props}
            to="/app/dashboard"
            active={"dashboard" == this.props.tab ? true : false}
            title="Dashboard"
            icon="home"
            onPress={()=>{
              this.props.appRedirect({redirect: "dashboard"});
              this.props.changeTab("dashboard", this.props.tab)
            }}
            mobile_toggle_drawer={this.props.mobile_toggle_drawer}
            colors={this.props.colors}

          />
        </Wrapper>
      )
    }
  }

  render(){

    if(this.props.user){
      return(

        <Gradient
          style={{flex: 1}}
          color1={this.props.colors.side_gradient_color_1}
          color2={this.props.colors.side_gradient_color_2}
        >
            <Wrapper style={{
              paddingTop: this.props.isIphoneX ?  40 : this.props.platform == "ios" ? 20 : 0,
            }}>

              <PartnerLogos {...this.props} />
              <Profile {...this.props}/>

            </Wrapper>


            {this.renderHandlers()}
            <Scroll style={{
              flex: 1
            }}>
              <PartnerButton {...this.props} />
              {
              this.renderDashboardButton()
              }
              <DealsButton {...this.props}/>


              <SideBarButton
                to="/app/driving"
                active={"driving" == this.props.tab ? true : false}
                title="Driving"
                icon="drive-eta"
                onPress={()=>{
                  this.props.appRedirect({redirect: "driving"});
                  this.props.changeTab("driving", this.props.tab)
                }}
                hideButton={false}
                mobile_toggle_drawer={this.props.mobile_toggle_drawer}
                colors={this.props.colors}

              />
              <ListsButton {...this.props}/>

              <MailerButtons {...this.props}/>
              <SettingsButtons {...this.props}/>


              {this.renderSupportButton(this.props)}

            </Scroll>


        </Gradient>
      );
    }

    return <Wrapper />
  }
}


const mapStateToProps = ({ auth, native, drawer, billing, settings, badges, partner, team_link, route }) => {
  const { user, token } = auth;
  const { device, isIphoneX, isMobile, platform, web_platform, mobile_toggle_drawer } = native;
  const { tab, open } = drawer;
  const { trigger_deal_credit_reload, deal_credits, deal_credits_loading } = billing;

  const { dark_mode, colors } = settings;
  const { all_badges, my_badges, top_badges } = badges;
  const { is_partner } = partner;
  const { user_dealfinder_page } = team_link;
  const { track_route } = route;

  return {
    user,
    token,
    device,
    isIphoneX,
    platform,
    web_platform,
    tab,
    open,
    dark_mode,
    colors,
    all_badges,
    my_badges,
    top_badges,
    is_partner,
    isMobile,
    user_dealfinder_page,
    mobile_toggle_drawer,
    trigger_deal_credit_reload,
    deal_credits,
    deal_credits_loading,
    track_route
  }
}


export default connect(mapStateToProps, {
  changeTab,
  toggleDealsOptions,
  setModal,
  toggleModal,
  appRedirect,
  getStats,
  toggleDealCreditModal,
  toggleDrawer,
  mobileToggleDrawer,
  getBilling,
  toggleActionSheet,
  selectActiveProperty,
  setActiveList
})(SideBar);
