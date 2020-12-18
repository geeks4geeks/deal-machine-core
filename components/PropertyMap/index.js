import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer, StatusBarStyle } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import PopupTutorial from 'app/DealMachineCore/snippets/PopupTutorial'
import OnboardingContainer from 'app/DealMachineCore/snippets/OnboardingContainer';
import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  changeTab,
  appRedirect,
  toggleOnboarding,
  checkIfUserHasModule
} from 'app/NativeActions';

import Body from './Body'


class PropertyMap extends PureComponent{

  constructor(props){
    super(props);

    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})
    this.state = {
      plan_module_info: plan_module_info
    }
  }

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false)
    }

    this.props.changeTab("map");
  }

  renderTutorial(){
    if(this.props.user.user_default_lat && this.props.user.user_default_lng){
      return(
        <PopupTutorial
          tutorial_slug={
            this.props.user.team_owner == 1 && this.props.stats.billing.plan.enterprise == 1 ? "new_team_owner_enterprise" : "new_account"
          }
        />
      )
    }
  }
  render(){

    if(
      ((!this.state.plan_module_info.has_module && this.props.user.team_clearance_level > 0) || this.props.card_info.bad_card == 1) && this.props.isMobile
    ){
      //render onboarding
      return(
        <OnboardingContainer
          slug="driving"
          contentful_slug="drivingMobileMap"

          title={"Driving"}
          plan_module_info={this.state.plan_module_info}

          leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
          leftButtonAction={this.props.device == "desktop"
              ? () => {}
              : () => this.props.toggleDrawer("open")
          }
        />
      );
    }

    return(
      <Container fill>
        <StatusBarStyle style="dark-content"/>
        <Body {...this.props}/>
        {this.renderTutorial()}
      </Container>
    );

  }
}

const mapStateToProps = ({ auth, native, drawer, billing }) => {
  const { token, user } = auth;
  const { device, platform, isMobile } = native;
  const { plan_modules, card_info } = billing;
  const { stats } = drawer;
  return {
    token,
    user,
    plan_modules,
    card_info,
    device,
    platform,
    isMobile,
    stats
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  changeTab,
  appRedirect,
  toggleOnboarding,
  checkIfUserHasModule

})(PropertyMap);
