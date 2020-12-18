import React, { Component } from "react";
import { connect } from "react-redux";

import { Scroll, Container, LeftPanelContainer, WebContainer, Wrapper, Row, KeyboardView, Title, Copy } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import OnboardingContainer from 'app/DealMachineCore/snippets/OnboardingContainer';

import DrivingAnalytics from './DrivingRoutes/DrivingAnalytics';

import {
  lockDrawer,
  toggleDrawer,
  toggleCanPop,
  changeTab,
  appRedirect,
  getRoutes,
  selectActiveRoute,
  selectActiveProperty,
  updateMapLocation,
  toggleModal,
  setModal,
  startTrackedRoute,
  selectActiveTeamMember,

  getTeamMembers,
  setInviteType,
  checkIfUserHasModule,

  updateSingleRouteFilter,
  toggleDrivingImages
} from "app/NativeActions";

import DrivingTabs from './DrivingTabs'
import DrivingRoutes from './DrivingRoutes';
import DealFinders from './DealFinders';

class Driving extends Component {

  constructor(props){
    super(props);
    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})
    this.state = {
      plan_module_info: plan_module_info,
      tab: props.device == "desktop" ? window.location.pathname.indexOf("drivers") !== -1 ? "dealfinders" : "routes" : "routes"
    }
  }
  toggleTab(toggle){
    this.setState({
      tab: toggle
    })
  }

  componentDidMount() {
    if (this.props.device == "mobile") {
      this.props.toggleCanPop("");
      this.props.lockDrawer(false);
    }

    this.props.changeTab("driving");


    this.props.selectActiveRoute(null);
    //TODO double check billing?
    this.loadItems();

  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.tab !== this.state.tab){
      this.loadItems();
    }

    if(prevProps.user && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules || this.props.user.plan_modules !== prevProps.user.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.user, slug: "driving"});
        this.setState({plan_module_info: plan_module_info})
      }
    }

    if(prevProps.route_filters !== this.props.route_filters){
      this.props.getRoutes({
        token: this.props.token,
        type: "refresh",
        filters: this.props.route_filters,
        begin: 0
      });
    }
  }

  loadItems(){
    switch(this.state.tab){
      case "routes":
        this.props.getRoutes({
          token: this.props.token,
          type: "load",
          filters: this.props.route_filters,
          begin: 0
        });
      break;

      case "dealfinders":
        this.props.getTeamMembers({
          token: this.props.token,
          load_type: "load",
          type: "driving_and_dealfinders",
          search: this.props.team_members_search,
          begin: 0
        });
      break;
    }
  }

  renderMiddle(){
    if(this.state.tab == "routes"){
      return(
        <Container fill>
          <Wrapper style={{flex:1, alignItems: "center", justifyContent: "center"}}>
            <Title style={{textAlign: "center"}}>Select a route</Title>
            <Copy>Select a route on the left panel to display it here.</Copy>
          </Wrapper>
        </Container>
      )
    }
    if(this.state.tab == "dealfinders"){
      return(
        <Container fill>
          <Wrapper style={{flex:1, alignItems: "center", justifyContent: "center"}}>
            <Title style={{textAlign: "center"}}>Select a team member</Title>
            <Copy>Select a team member on the left panel to display them here.</Copy>
          </Wrapper>
        </Container>
      )
    }
  }


  render() {


    if((!this.state.plan_module_info.has_module || this.props.card_info.bad_card == 1) && this.props.user.team_clearance_level > 0){
      return(
        <OnboardingContainer
          slug="driving"
          contentful_slug="driving"
          title={"Driving"}
          plan_module_info={this.state.plan_module_info}
          leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
          leftButtonAction={
            this.props.device == "desktop"
              ? () => {}
              : () => this.props.toggleDrawer("open")
          }
        />
      );

    }



    if(!this.props.isMobile || (this.props.active_team_member == null && this.state.tab == "dealfinders") || (this.props.active_route == null && this.state.tab == "routes") || this.props.device == "mobile"){

      if(this.props.isMobile){
        return(
          <Container>
            <Header
              title="Driving"

              leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
              leftButtonAction={
                this.props.device == "desktop"
                  ? () => {}
                  : () => this.props.toggleDrawer("open")
              }


            />
            <Scroll style={{flex: 1}}>
              <DrivingTabs
                tab={this.state.tab}
                toggleTab={this.toggleTab.bind(this)}
                {...this.props}
              />

              <DrivingRoutes tab={this.state.tab} {...this.props}/>
              <DealFinders tab={this.state.tab} plan_module_info={this.state.plan_module_info} {...this.props}/>
              <Wrapper style={{marginBottom: 50}} />

            </Scroll>
          </Container>
        );
      }

      if((this.props.active_team_member == null && this.state.tab == "dealfinders") ||
      (this.props.active_route == null && this.state.tab == "routes")
      ){
        return(
          <Row style={{alignItems: "flex-start", flex: 1}}>
            <LeftPanelContainer type="list" style={{overflowY: "auto"}}>
              <Header
                title="Driving"

                leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
                leftButtonAction={
                  this.props.device == "desktop"
                    ? () => {}
                    : () => this.props.toggleDrawer("open")
                }


              />
              <Scroll style={{flex: 1}}>
                <DrivingTabs
                  tab={this.state.tab}
                  toggleTab={this.toggleTab.bind(this)}
                  {...this.props}
                />

                <DrivingRoutes tab={this.state.tab} {...this.props}/>
                <DealFinders tab={this.state.tab} plan_module_info={this.state.plan_module_info} {...this.props}/>
                <Wrapper style={{marginBottom: 50}} />

              </Scroll>
            </LeftPanelContainer>
            {this.renderMiddle()}
            {/*
            <Container>
              <Header
                title=""
                leftButtonIcon={"blank"}
                leftButtonAction={()=>{}}


              />
              <KeyboardView style={{maxWidth: 800}}>
                <DrivingAnalytics />
              </KeyboardView>
            </Container>
            */}
          </Row>
        )
      }

      return(
        <LeftPanelContainer type="list" style={{overflowY: "auto"}}>
          <Header
            title="Driving"

            leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
            leftButtonAction={
              this.props.device == "desktop"
                ? () => {}
                : () => this.props.toggleDrawer("open")
            }


          />
          <Scroll style={{flex: 1}}>
            <DrivingTabs
              tab={this.state.tab}
              toggleTab={this.toggleTab.bind(this)}
              {...this.props}
            />

            <DrivingRoutes tab={this.state.tab} {...this.props}/>
            <DealFinders tab={this.state.tab} plan_module_info={this.state.plan_module_info} {...this.props}/>
            <Wrapper style={{marginBottom: 50}} />
          </Scroll>
        </LeftPanelContainer>
      );
    }

    return <Wrapper />;


  }
}

const mapStateToProps = ({ auth, native, settings, billing, route, team }) => {
  const { token, user } = auth;
  const { device, platform, isMobile } = native;
  const { colors } = settings;
  const { plan_modules, card_info } = billing;

  const {
    active_route,
    map_routes,
    routes,
    route_loading,
    route_error,
    route_refreshing,
    route_loaded_all,
    route_limit,
    route_begin,
    route_filters,
    originalRouteFilters,
    editRouteFilters,
    toggle_driving_images
  } = route;

  const{
    active_team_member,
    team_members,
    team_members_loading,
    team_members_error,
    team_members_refreshing,
    team_members_loaded_all,
    team_members_limit,
    team_members_begin,
    team_members_search
  } = team;


  return {
    token,
    user,
    device,
    platform,
    isMobile,
    colors,

    plan_modules,
    card_info,

    map_routes,
    active_route,
    routes,
    route_loading,
    route_error,
    route_refreshing,
    route_loaded_all,
    route_limit,
    route_begin,

    route_filters,
    originalRouteFilters,
    editRouteFilters,
    toggle_driving_images,

    active_team_member,
    team_members,
    team_members_loading,
    team_members_error,
    team_members_refreshing,
    team_members_loaded_all,
    team_members_limit,
    team_members_begin,
    team_members_search
  };
};

export default connect(
  mapStateToProps,
  {
    lockDrawer,
    toggleDrawer,
    toggleCanPop,
    changeTab,
    getRoutes,
    selectActiveRoute,
    selectActiveProperty,
    updateMapLocation,
    startTrackedRoute,
    appRedirect,
    toggleModal,
    setModal,

    selectActiveTeamMember,
    getTeamMembers,
    setInviteType,

    updateSingleRouteFilter,
    toggleDrivingImages

  }
)(Driving);
