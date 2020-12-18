import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Scroll, Wrapper, Spin, Row, Copy, KeyboardView, StatusBarStyle } from 'app/NativeComponents/common';


import {
  changeTab,
  getListProperties,
  getTotalPropertyCount,
  selectActiveProperty,
  setListModal,
  setTagModal,
  setStatusModal,
  setEditModal,
  changeSortBy,
  updateLead,
  updateListFilter,
  editLeadFilter,
  resetEditedFilters,
  applyFilters,
  clearAllLeadFilters,
  appRedirect,
  toggleActionSheet,
  setPropertiesPage,
  selectTeamFilter,
  toggleHighlightFilters,
  updateUserListSettings,
  updateHouse,
  updateOwnerInfo,
  setModal,
  toggleModal,
  toggleOnboarding,
  toggleLeadImages
} from 'app/NativeActions';

import MobileList from './MobileList';

import Search from './Search';
import ListButtons from './ListButtons';
import SelectedItems from './SelectedItems';
import GridList from 'app/NativeComponents/components/GridList';

class Leads extends Component {

  constructor(props){
    super(props);

    this.state = {
      active_property: null,
      selected_all_in_account: false,
      selected_all: false,
      selected_leads: [],
      selecting: false
    }
  }


  componentDidMount(){

    this.props.changeTab("leads");

    if(this.props.device === "desktop"){
      this.props.setPropertiesPage(this.props.match.params.page_id ? this.props.match.params.page_id : 1);
      this.getProperties("load", this.props.match.params.page_id ? this.props.match.params.page_id : 1);
    }else{
      this.getProperties("load");
    }
    this.props.getTotalPropertyCount({token: this.props.token, filter_lists: this.props.filter_lists, filters: this.props.filters});

  }

  componentDidUpdate(prevProps){

    if(prevProps.sort_by !== this.props.sort_by ||
      prevProps.applied_filters !== this.props.applied_filters ||
      prevProps.filter_lists !== this.props.filter_lists ||
      prevProps.list_properties_limit !== this.props.list_properties_limit
    ){
      if(parseInt(this.props.list_properties_page) !== 1){
        this.props.appRedirect({redirect: "leads"})
      }else{
        this.getProperties(this.props.isMobile || this.props.device === "mobile" ? "refresh" : "load");
      }
    }
    if(prevProps.trigger_leads_reload !== this.props.trigger_leads_reload && this.props.trigger_leads_reload === true &&
      this.props.list_properties_refreshing !== true &&
      this.props.list_properties_loading !== true
    ){
      this.getProperties("refresh");
      this.props.getTotalPropertyCount({token: this.props.token, filter_lists: this.props.filter_lists, filters: this.props.applied_filters});
    }

    if(
      prevProps.applied_filters !== this.props.applied_filters ||
      prevProps.filter_lists !== this.props.filter_lists
    ){
      this.props.getTotalPropertyCount({token: this.props.token, filter_lists: this.props.filter_lists, filters: this.props.applied_filters});
    }

    if(prevProps.list_properties_page !== this.props.list_properties_page){
      this.getProperties("load", this.props.list_properties_page);
    }

    if(this.props.device === "desktop"){
      if(this.props.match.params.page_id !== prevProps.list_properties_page){
        this.props.setPropertiesPage(this.props.match.params.page_id ? this.props.match.params.page_id : 1);
      }
    }

    //handle selected all
    if(!this.props.isMobile && this.props.device !== "mobile"){
      if(this.state.selected_leads.length === this.props.list_properties.length &&
        !this.state.selected_all &&
        this.props.list_properties.length !== 0){
        this.setState({selected_all: true})
      }else if(this.state.selected_leads.length !== this.props.list_properties.length &&
        this.state.selected_all &&
        this.props.list_properties.length !== 0){
        this.setState({
          selected_all: false,
          selected_all_in_account: false
        })
      }
    }

    if(this.props.isMobile !== prevProps.isMobile){
      this.toggleSelecting(false);
      this.clearAll();
    }
  }

  toggleSelecting(toggle){
    this.clearAll();
    this.setState({
      selecting: toggle
    })
  }

  clearAll(){
    this.setState({
      selected_all_in_account: false,
      selected_all: false,
      selected_leads:[],
      selecting: false
    })
  }

  selectAllLeadsInAccount(){
    this.setState({
      selected_all_in_account: true,
      selected_all: true
    })
  }

  checkLead(lead){

    let found_lead = false;
    for(let i = 0; i<this.state.selected_leads.length; i++){
      if(this.state.selected_leads[i].property_id === lead.property_id){
        found_lead = true;
      }
    }
    if(found_lead){
      this.setState({
        selected_leads: this.state.selected_leads.filter(({property_id}) => property_id !== lead.property_id)
      })
    }else{
      this.setState({
        selected_leads: [...this.state.selected_leads, lead]
      })
    }

  }

  checkAllLeads(){
    if(this.state.selected_leads.length === this.props.list_properties.length){
      this.setState({
        selected_all: false,
        selected_all_in_account: false,
        selected_leads: []
      });
    }else{
      this.setState({
        selected_all: true,
        selected_leads: this.props.list_properties
      })
    }
  }

  pressProperty(property){
    this.props.selectActiveProperty(property);
    this.props.appRedirect({
      redirect: "property",
      payload:{
        property_id: property.property_id,
        page_id: this.props.isMobile || parseInt(this.props.user.team_clearance_level) === 0 ? null : this.props.list_properties_page
      }})
  }

  getProperties(load_type = "load", page){
    if(
      this.props.list_properties_refreshing !== true &&
      this.props.list_properties_loading !== true
    ){

      this.props.getListProperties({
        token: this.props.token,
        load_type: load_type,
        sort_by: this.props.sort_by ? this.props.sort_by.slug+"_"+this.props.sort_by.type : "date_created_desc",
        filter_lists: this.props.filter_lists,
        filters: this.props.applied_filters,
        begin: load_type === "load_more" ? this.props.list_properties_begin : page ? this.props.list_properties_limit*(page-1)
          : this.props.list_properties_limit*(this.props.list_properties_page-1),
        limit: this.props.list_properties_limit
      })
    }
  }
  renderLoading(){
    if(this.props.list_properties_loading){
      return(
        <Wrapper style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: this.props.dark_mode == "dark_mode" ? "rgba(31,41,51, 0.4)" : "rgba(255, 255, 255, 0.75)"
        }}>
          <Row>
            <Spin size="small"/>
            <Copy style={{marginLeft: 10}}>Loading Leads...</Copy>
          </Row>

        </Wrapper>
      );
    }
  }

  renderMobileLeadButtons(){
    if(this.props.user.team_clearance_level > 0){
      return(
        <Wrapper style={{
          justifyContent: "center",
          borderBottomColor: this.props.colors.border_color,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          marginBottom: 5,
          alignItems: "center",
          justifyContent: "center",
          height: 100
        }}>
          <ListButtons
            {...this.props}
            selectAllLeadsInAccount={this.selectAllLeadsInAccount.bind(this)}
            selected_leads={this.state.selected_leads}
            selected_all_in_account={this.state.selected_all_in_account}
            toggleSelecting={this.toggleSelecting.bind(this)}
            selecting={this.state.selecting}
            selected_all={this.state.selected_all}

          />

        </Wrapper>
      )
    }
  }

  renderList(){
    if(this.props.device === "mobile" || this.props.isMobile === true || parseInt(this.props.user.team_clearance_level) === 0){
      return(
        <Container style={{width: "100%"}}>
          <StatusBarStyle style="dark-content"/>
          <Wrapper style={{flex: 1, alignSelf: "stretch", width: "100%", maxWidth: 750, margin: this.props.device === "desktop" ? "0px auto" : 0}}>
            <Search
              pressProperty={this.pressProperty.bind(this)}
              {...this.props}
            />
            {this.renderMobileLeadButtons()}
            <Wrapper style={{
              flex: 1,
              marginBottom: this.state.selected_leads.length > 0 || this.state.selected_all_in_account ? 150 : 5,
              alignSelf: "stretch", width: "100%"
            }}>
              <MobileList
                {...this.props}
                getProperties={this.getProperties.bind(this)}

                selected_leads={this.state.selected_leads}
                checkLead={this.checkLead.bind(this)}
                pressProperty={this.pressProperty.bind(this)}
                selecting={this.state.selecting}
                selected_all={this.state.selected_all}

              />
            </Wrapper>

            <SelectedItems
              {...this.props}
              selected_leads={this.state.selected_leads}
              selected_all={this.state.selected_all}
              selecting={this.state.selecting}
              selected_all_in_account={this.state.selected_all_in_account}
              selectAllLeadsInAccount={this.selectAllLeadsInAccount.bind(this)}
              clearAll={this.clearAll.bind(this)}
              checkAllLeads={this.checkAllLeads.bind(this)}
            />
          </Wrapper>
        </Container>
      )
    }

    return(
      <Container>
        <Scroll>
          <Search
            pressProperty={this.pressProperty.bind(this)}
          />
          <Wrapper style={{
            paddingTop: 5,
            paddingBottom: 5,
            justifyContent: "center",
            borderBottomColor: this.props.colors.border_color,
            borderBottomWidth: 1,
            borderBottomStyle: "solid"
          }}>
            <ListButtons
              {...this.props}
              selectAllLeadsInAccount={this.selectAllLeadsInAccount.bind(this)}
              selected_leads={this.state.selected_leads}
              selected_all_in_account={this.state.selected_all_in_account}
              selected_all={this.state.selected_all}

            />

            <SelectedItems
              {...this.props}
              selected_leads={this.state.selected_leads}
              selected_all={this.state.selected_all}
              selected_all_in_account={this.state.selected_all_in_account}
              selectAllLeadsInAccount={this.selectAllLeadsInAccount.bind(this)}
              clearAll={this.clearAll.bind(this)}
              checkAllLeads={this.checkAllLeads.bind(this)}

            />
          </Wrapper>
          <Wrapper style={{position: "relative", minHeight: 200}} >
            <GridList {...this.props}
              selected_leads={this.state.selected_leads}
              selected_all={this.state.selected_all}
              selected_all_in_account={this.state.selected_all_in_account}
              selectAllLeadsInAccount={this.selectAllLeadsInAccount.bind(this)}
              clearAll={this.clearAll.bind(this)}
              checkLead={this.checkLead.bind(this)}
              checkAllLeads={this.checkAllLeads.bind(this)}
              pressProperty={this.pressProperty.bind(this)}
            />
            {this.renderLoading()}
          </Wrapper>
        </Scroll>
      </Container>
    )
  }


  render() {

    return this.renderList();
  }
}

const mapStateToProps = ({ auth, native, drawer, settings, billing, lead, property_map, filter }) => {
  const { token, user } = auth;
  const { device, window_height, isMobile } = native;
  const { stats } = drawer;
  const { colors, dark_mode } = settings;
  const { deal_credits, pricing, card_info } = billing;

  const {
    list_properties,
    list_properties_loading,
    list_properties_error,
    list_properties_page,
    list_properties_begin,
    list_properties_limit,
    total_lead_count,
    total_lead_count_loading,
    list_properties_refreshing,
    list_properties_loaded_all,

    trigger_leads_reload,

    toggle_lead_images
  } = lead;

  const {
    active_property
  } = property_map;

  const {
    list_settings,
    list_settings_loading,
    filter_lists,
    filters,
    all_statuses,
    applied_filters,
    applied_team_filter,
    original_filters,
    sort_by
  } = filter;

  return {
    token,
    user,
    device,
    isMobile,
    window_height,
    stats,
    deal_credits,
    pricing,
    card_info,
    colors,
    dark_mode,

    list_properties,
    list_properties_loading,
    list_properties_refreshing,
    list_properties_loaded_all,
    list_properties_error,
    list_properties_page,
    list_properties_begin,
    list_properties_limit,
    total_lead_count,
    total_lead_count_loading,
    trigger_leads_reload,
    active_property,

    list_settings,
    list_settings_loading,
    filter_lists,
    filters,
    all_statuses,
    applied_filters,
    applied_team_filter,
    original_filters,
    toggle_lead_images,
    sort_by
  }
}


export default connect(mapStateToProps, {
  changeTab,
  getListProperties,
  getTotalPropertyCount,
  selectActiveProperty,
  changeSortBy,
  setListModal,
  setTagModal,
  setStatusModal,
  setEditModal,
  updateLead,
  updateListFilter,
  editLeadFilter,
  resetEditedFilters,
  applyFilters,
  clearAllLeadFilters,
  appRedirect,
  toggleActionSheet,
  setPropertiesPage,
  selectTeamFilter,
  toggleHighlightFilters,
  updateUserListSettings,
  updateHouse,
  updateOwnerInfo,
  setModal,
  toggleModal,
  toggleOnboarding,
  toggleLeadImages
})(Leads);
