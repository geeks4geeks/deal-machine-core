import React, { Component } from "react";
import { connect } from "react-redux";

import { Scroll, Container, LeftPanelContainer, WebContainer, Wrapper, Row, KeyboardView, Title, Copy } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import {
  lockDrawer,
  toggleDrawer,
  mobileToggleDrawer,
  toggleCanPop,
  changeTab,
  appRedirect,
  toggleModal,
  setModal,
  getLists,
  updateListSearch,
  setActiveList,

  checkIfUserHasModule
} from "app/NativeActions";

import StartBuildingCard from './StartBuildingCard';
import ListView from './ListView';
import ListSearch from './ListSearch';

class ListDashboard extends Component {

  constructor(props){
    super(props);
    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "lists"})
    this.state = {
      plan_module_info: plan_module_info,
    }
  }
  componentWillUnmount(){
    clearInterval(this._search_interval);
  }

  componentDidMount() {

    if(this.props.user.team_clearance_level == 0){
      this.props.appRedirect({redirect: "dashboard"});
    }
    if (this.props.device == "mobile") {
      this.props.toggleCanPop("");
      this.props.lockDrawer(false);
    }

    this.props.changeTab("lists");
    this.props.setActiveList(null);


    if(this.props.lists.length === 0){
      this.getTeamLists("load", this.props.list_search);
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.list_search !== this.props.list_search){
      clearInterval(this._search_interval);
      this._search_interval = setTimeout(()=>{
        this.getTeamLists("refresh", this.props.list_search);
      }, 250);
    }
  }

  getTeamLists(load_type = "load", search = ""){
    if(!this.props.lists_loading && !this.props.lists_refreshing){
      this.props.getLists({
        token: this.props.token,
        load_type: load_type,
        search: search,
        begin: load_type === "refresh" ? 0 : this.props.lists_begin,
        limit: this.props.lists_limit
      })
    }
  }


  renderMiddle(){
    if(true){
      return(
        <Container fill>
          <Wrapper style={{flex:1, alignItems: "center", justifyContent: "center"}}>
            <Title style={{textAlign: "center"}}>Select a list</Title>
            <Copy>Select a list on the left panel to display it here.</Copy>
          </Wrapper>
        </Container>
      )
    }
  }


  render() {

    if(!this.props.isMobile || this.props.active_list == null || this.props.device == "mobile"){

      if(this.props.isMobile){
        return(
          <Container>
            <Scroll style={{flex: 1}}>

              <ListSearch {...this.props}/>
              <StartBuildingCard {...this.props}/>
              <KeyboardView>
                <ListView
                  {...this.props}
                  getTeamLists={this.getTeamLists.bind(this)}
                />
                <Wrapper style={{marginBottom: 50}}/>
              </KeyboardView>
            </Scroll>
          </Container>
        );
      }

      if((this.props.active_list == null)
      ){
        return(
          <Row style={{alignItems: "flex-start", flex: 1}}>
            <LeftPanelContainer type="list" style={{overflowY: "auto"}}>
              <Scroll style={{flex: 1}}>

                <ListSearch {...this.props}/>
                <StartBuildingCard {...this.props}/>
                <KeyboardView>
                  <ListView
                    {...this.props}
                    getTeamLists={this.getTeamLists.bind(this)}
                  />
                  <Wrapper style={{marginBottom: 50}}/>
                </KeyboardView>
              </Scroll>
            </LeftPanelContainer>
            {this.renderMiddle()}
          </Row>
        )
      }

      return(
        <LeftPanelContainer type="list" style={{overflowY: "auto"}}>
          <Scroll style={{flex: 1}}>

            <ListSearch {...this.props}/>
            <StartBuildingCard {...this.props}/>
            <KeyboardView>
              <ListView
                {...this.props}
                getTeamLists={this.getTeamLists.bind(this)}
              />
              <Wrapper style={{marginBottom: 50}}/>
            </KeyboardView>
          </Scroll>
        </LeftPanelContainer>
      )
    }

    return <Wrapper />;


  }
}

const mapStateToProps = ({ auth, native, settings, billing, list }) => {
  const { token, user } = auth;
  const { device, platform, isMobile, isIphoneX, mobile_toggle_drawer } = native;
  const { colors } = settings;
  const { plan_modules, card_info } = billing;
  const { lists, lists_loading, lists_refreshing, lists_begin, lists_loaded_all, lists_limit, list_search, active_list } = list;

  return {
    token,
    user,
    device,
    platform,
    isMobile,
    isIphoneX,
    mobile_toggle_drawer,
    colors,
    plan_modules,
    card_info,

    lists,
    lists_loading,
    lists_refreshing,
    lists_begin,
    lists_loaded_all,
    lists_limit,
    list_search,

    active_list
  };
};

export default connect(
  mapStateToProps,
  {
    lockDrawer,
    toggleDrawer,
    mobileToggleDrawer,
    toggleCanPop,
    changeTab,
    appRedirect,
    toggleModal,
    setModal,
    getLists,
    updateListSearch,
    setActiveList

  }
)(ListDashboard);
