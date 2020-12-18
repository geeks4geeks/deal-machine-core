import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  /* mobile actions */
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  /* actions */
  changeTab,
  teamFieldChanged,
  editTeam,
  resetInvite,
  appRedirect,
  toggleActionSheet,
  selectActiveTeamMember,
  /* common functions */
  checkIfUserHasModule,
  dismissMobileKeyboard
} from 'app/NativeActions';

import OnboardingContainer from 'app/DealMachineCore/snippets/OnboardingContainer';

class CollectDealFinders extends Component {

  constructor(props){
    super(props);

    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})
    this.state = {
      edit_user_dealfinder_page: this.props.user_dealfinder_page ? this.props.user_dealfinder_page : {},
      edit_team_link: this.props.user_team_link,
      edit_live_page: this.props.live_page,
      edit_team_link_toggle: "site",
      plan_module_info: plan_module_info
    }

  }


  componentDidUpdate(prevProps){
    if(this.props.user_dealfinder_page != prevProps.user_dealfinder_page ||
      this.props.user_team_link != prevProps.user_team_link ||
      this.props.live_page != prevProps.live_page
    ){
      this.setState({
        edit_user_dealfinder_page: this.props.user_dealfinder_page ? this.props.user_dealfinder_page : {},
        edit_team_link: this.props.user_team_link,
        edit_live_page: this.props.live_page
      })
    }


    if(prevProps.user && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules || this.props.user.plan_modules !== prevProps.user.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.user, slug: "driving"});
        this.setState({plan_module_info: plan_module_info})
      }
    }

  }

  componentDidMount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer(false);
      this.props.lockDrawer(true);
    }



  }

  componentWillUnmount(){
    if(this.props.device == "mobile"){
      this.props.lockDrawer(false);
      this.props.toggleCanPop("");
    }

    this.props.selectActiveTeamMember(null)

  }

  /* native functions */
  handleBack(){
    dismissMobileKeyboard();
    this.props.selectActiveTeamMember(null)
    if(this.props.device == "mobile"){
      this.props.lockDrawer(false);
    }
    this.props.appRedirect({redirect: "goBack", payload:{remove: "collect-dealfinders"}});
  }

  saveLink(){
    dismissMobileKeyboard();

    const { token } = this.props;
    this.props.editTeam({
      token,
      team: this.props.user.team_id,
      type: "update_team_link",
      payload: {
        ...this.state.edit_user_dealfinder_page,
        live_page: this.state.edit_live_page,
        team_link: this.state.edit_team_link
      }
    });

  }



  editTeamLink({prop, value}){
    this.setState({
      [prop]: value
    })
  }

  editTeamLinkInfo({prop, value}){
    this.setState({
      edit_user_dealfinder_page: {
        ...this.state.edit_user_dealfinder_page,
        [prop]: value
      }
    })
  }

  checkIfNeedsToSave(){

    if(
      this.props.user_dealfinder_page != this.state.edit_user_dealfinder_page ||
      this.props.live_page != this.state.edit_live_page ||
      this.props.user_team_link != this.state.edit_team_link
    ){
      return true;
    }


    return false;
  }

  render(){

    if(this.state.plan_module_info.has_module && this.state.plan_module_info.tier < 3){
      return(
        <OnboardingContainer
          plan_module_info={this.state.plan_module_info}
          slug="driving"
          contentful_slug="drivingCollectDealFinders"
          require_tier={3}

          leftButtonIcon={this.props.device == "desktop" ? "close" : "arrow-back"}
          leftButtonAction={()=>this.handleBack()}
        />
      );
    }

    return(
      <Container>

        <Header
          title="Build Funnel"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.saveLink() : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            saveLink={this.saveLink.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
            editTeamLink={this.editTeamLink.bind(this)}
            editTeamLinkInfo={this.editTeamLinkInfo.bind(this)}

            edit_user_dealfinder_page={this.state.edit_user_dealfinder_page}
            edit_team_link={this.state.edit_team_link}
            edit_live_page={this.state.edit_live_page}
            edit_team_link_toggle={this.state.edit_team_link_toggle}
          />
        </KeyboardView>

      </Container>

    )
  }
}



const mapStateToProps = ({ auth, native, settings, team, drawer, team_link, billing }) => {
  const { token, user } = auth;
  const { device } = native;
  const { colors } = settings;
  const { stats } = drawer;
  const { plan_modules } = billing;
  const {
    invite_link
  } = team;

  const {
    live_page,
    user_team_link,
    user_dealfinder_page,
    dealfinder_page_defaults
  } = team_link;

  return {
    token,
    user,
    device,
    stats,
    invite_link,
    colors,
    live_page,
    user_team_link,
    user_dealfinder_page,
    dealfinder_page_defaults,
    plan_modules
  };
}

export default connect(mapStateToProps, {
  /* mobile actions */
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  /* actions */
  changeTab,
  teamFieldChanged,
  editTeam,
  resetInvite,
  appRedirect,
  toggleActionSheet,
  selectActiveTeamMember
})(CollectDealFinders);
