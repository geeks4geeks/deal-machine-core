import React, {PureComponent} from 'react';
import {
  Wrapper,
  Title,
  Button,
  Copy,
  Bold,
  Icon,
  Row
} from 'app/NativeComponents/common';

import ListFiltersButton from './ListFiltersButton';
import ListOptionsButton from './ListOptionsButton';
import SortByButton from './SortByButton';
import EditLeadsButton from './EditLeadsButton';
import MobileSelectAll from './MobileSelectAll';
import ToggleImagesButton from './ToggleImagesButton';
import {
  getCustomFilterText,
  checkIfFilterChanged
} from 'app/NativeActions';

class ListButtons extends PureComponent{



  renderListFilter(){

    let list_filter_title = "Showing All Leads";

    if(this.checkIfNeedsToClear()){
      list_filter_title = "Showing Filtered Leads";
    }

    if(this.props.filter_lists){
      if(this.props.filter_lists.length > 0){
        list_filter_title = "Showing ";
        for(let i = 0; i<this.props.filter_lists.length; i++){
          if(i === 0){
            list_filter_title += this.props.filter_lists[i].title;
          }else{
            list_filter_title += ", "+this.props.filter_lists[i].title;

          }
        }
      }
    }

    return(
      <Button
        onPress={()=>{

          this.props.setListModal({
            title: "Filter List(s)",
            description: "Select a list or mulitple lists to filter your leads.",
            type: "filter_lists_for_leads",
            selected_leads:[],
            selected_lists: this.props.filter_lists,
            modalAction: ({selected_leads, selected_lists})=>{
              this.props.updateListFilter(selected_lists);
              this.props.appRedirect({redirect: "goBack", payload: {remove: "lists"}})

            }
          });

          this.props.appRedirect({redirect: "lists", payload: {active_property: this.props.active_property, page_id: this.props.list_properties_page}})

        }}
        style={{
          marginLeft: 10,
          marginRight: 10
        }}
      >
        <Row>
          <Title>{list_filter_title}</Title>
          <Icon
            icon="keyboard-arrow-down"
            size={18}
            style={{
              marginLeft: 5
            }}
          />
        </Row>
      </Button>
    )
  }

  renderFiltersButton(){
    return(
      <Button
        onPress={()=>{}}
      >
        <Row>
          <Title>No Filters</Title>
          <Icon
            icon="keyboard-arrow-down"
            size={18}
            style={{
              marginLeft: 5
            }}
          />
        </Row>
      </Button>
    )
  }

  checkIfNeedsToClear(){
    if(checkIfFilterChanged(this.props.applied_filters,this.props.original_filters )){
      return true;
    }

    return false;
  }

  renderClearFiltersText(){
    let filter_text = "";
    if(this.props.applied_team_filter){
      filter_text = "Using presets: "+this.props.applied_team_filter.title+"; ";
    }

    filter_text += getCustomFilterText(this.props.applied_filters);


    if(this.checkIfNeedsToClear() && filter_text){
      return(
        <Row style={{
          marginLeft: 10,
          marginRight: 10
        }}>
          <Copy>{filter_text}</Copy>
          <Button style={{marginLeft: 5}} onPress={()=>this.props.clearAllLeadFilters()}><Copy><Bold>Clear all.</Bold></Copy></Button>
        </Row>
      )
    }
  }

  renderMobileButton(){
    if(this.props.isMobile || this.props.device === "mobile"){
      if(this.props.selecting && this.props.selected_all != true){
        return(
          <Row>
            <MobileSelectAll {...this.props}/>
          </Row>
        )
      }else if(!this.props.selecting){
        return(
          <Row style={{flex: 1, justifyContent: "flex-end"}}>
            <ListFiltersButton
              appRedirect={this.props.appRedirect}
              active_property={this.props.active_property}
              page_id={this.props.list_properties_page}
              resetEditedFilters={this.props.resetEditedFilters}
              selectTeamFilter={this.props.selectTeamFilter}
              applied_team_filter={this.props.applied_team_filter}
              toggleHighlightFilters={this.props.toggleHighlightFilters}
            />
            <ToggleImagesButton {...this.props}/>
          </Row>
        )
      }
    }

  }

  render(){
    if(this.props.isMobile || this.props.device === "mobile"){
      return (
        <Wrapper style={{
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",



        }}>
          <Wrapper style={{flex: 1, paddingTop: 10, paddingBottom: 10,
            overflowX: "hidden",
            whiteSpace: "nowrap"}}>
            {this.renderListFilter()}
            {this.renderClearFiltersText()}
          </Wrapper>
          <Row style={{flex: 1, width: "100%", justifyContent: "space-between", paddingBottom: 5}}>
            <EditLeadsButton {...this.props}/>
            {this.renderMobileButton()}
          </Row>
        </Wrapper>
      )
    }

    if(this.props.selected_leads.length === 0 && !this.props.selected_all_in_account){

      return (
        <Wrapper style={{
          width: "100%",
          alignItems: "space-between",
          justifyContent: "center",

          height: 55,
        }}>
          <Row>
            <Wrapper style={{flex: 1, overflowX: "hidden",
            whiteSpace: "nowrap"}}>
              {this.renderListFilter()}
              {this.renderClearFiltersText()}
            </Wrapper>
            <Row style={{justifyContent: "flex-end"}}>
              <ListFiltersButton
                appRedirect={this.props.appRedirect}
                active_property={this.props.active_property}
                page_id={this.props.list_properties_page}
                resetEditedFilters={this.props.resetEditedFilters}
                selectTeamFilter={this.props.selectTeamFilter}
                applied_team_filter={this.props.applied_team_filter}
                toggleHighlightFilters={this.props.toggleHighlightFilters}
                isMobile={this.props.isMobile}
              />
              <ListOptionsButton
                appRedirect={this.props.appRedirect}
                active_property={this.props.active_property}
                page_id={this.props.list_properties_page}
                isMobile={this.props.isMobile}
              />
              <ToggleImagesButton {...this.props}/>

              {/*<ListOptionsButton appRedirect={this.props.appRedirect} active_property={this.props.active_property} page_id={this.props.list_properties_page}/>*/}
            </Row>
          </Row>
        </Wrapper>
      )


    }
    return <Wrapper />
  }
}


export default ListButtons;
