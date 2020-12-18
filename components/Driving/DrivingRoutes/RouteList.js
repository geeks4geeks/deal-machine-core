import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Title, Copy, Button, Icon, Row } from 'app/NativeComponents/common';
import { List, PillButton } from 'app/NativeComponents/snippets';

import RouteItem from './RouteItem';
import moment from 'moment';

import DrivingAnalytics from './DrivingAnalytics';
import FilterTags from './FilterTags';

import ToggleImagesButton from '../ToggleImagesButton';

import {
  AppConfig,
  openUrl
} from "app/NativeActions";
class RouteList extends Component{

  renderMobileStartButton(){
    if(this.props.isMobile){
      return(
        <Card>
          <CardBody style={{alignItems: "flex-start", justifyContent: "flex-start"}}>
            <Title >Let's get driving</Title>
            <Copy>Record a drive by pressing the "Start Driving" button on your map view or press the buttom below.</Copy>
            <PillButton
              style={{margin: 0, marginTop: 10}}
              onPress={()=>{

                if(!this.props.track_route){
                  this.props.startTrackedRoute({
                    token: this.props.token
                  });
                  this.props.appRedirect({redirect: "map"})
                }

                if(this.props.map_routes == 0 &&
                  (this.props.user.has_routes == 0 || this.props.user.has_routes == null)
                ){

                  //show starting modal
                  this.props.setModal({
                    title: "Driving Routes Overview",
                    description: 'You Starting Driving! Next, add some properties. Complete your session by pressing “Stop Driving.” View driving routes, mileage, and time by pressing Menu and clicking Driving Routes. \n\n Optional Add-on Feature: View routes in real-time by pressing MAP Button and enabling "Show Driving Routes".',
                    icon: "drive-eta",
                    submit: 'Got it!',
                    onPress: ()=>{
                    },
                    cancel: '',
                    onCancel: ()=>{
                    }
                  });
                  this.props.toggleModal({show: true, type: "normal"});
                }
              }}
              primary={true}
            >
              Start Driving
            </PillButton>
          </CardBody>
        </Card>
      )
    }
  }

  renderBody(){
    return(
      <List
        rowNumber={1}
        style={{flex: 1}}
        items={this.props.routes}
        infiniteScroll={true}
        itemStruture={({item}) => {
          return <RouteItem
                  key={item.id}
                  colors={this.props.colors}
                  isMobile={this.props.isMobile}
                  toggle_driving_images={this.props.toggle_driving_images}
                  active_route={this.props.active_route}
                  route={item}
                  token={this.props.token}
                  user={this.props.user}
                  device={this.props.device}
                  removeTrackedRoute={this.props.removeTrackedRoute}
                  onPress={()=>{
                    //set selected route
                    this.props.selectActiveProperty(null);

                    this.props.updateMapLocation({
                      coordinates:{
                        latitude: parseFloat(item.start_coordinates.latitude),
                        longitude: parseFloat(item.start_coordinates.longitude),
                        heading: 0
                      },
                      active_property: null
                    });

                    this.props.selectActiveRoute(item);
                    this.props.appRedirect({redirect: "route", payload:{id: item.id}})

                    //if(item.route_completed == 1){


                      /*
                      this.props.initEditFilters();
                      this.props.editFilter({prop: "routes", value: item.id});
                      const filter_title = item.user_firstname+"'s Route ("+moment(item.date_created).format("MMM Do")+")"
                      this.props.editFilter({prop: "routes_title", value: filter_title});
                      this.props.saveFilters();
                      */

                      //change location
                      /*
                      if(item.start_coordinates){

                        //app redirect
                        this.props.updateMapLocation({
                          coordinates:{
                            latitude: parseFloat(item.start_coordinates.latitude),
                            longitude: parseFloat(item.start_coordinates.longitude),
                            heading: 0
                          },
                          active_property: null
                        });

                        this.props.appRedirect({redirect: "deals"});


                      }
                      */
                    //}
                  }}
                 />
        }}
        canRefresh={true}
        onRefresh={()=>{
          this.props.getRoutes({
            token: this.props.token,
            type: "refresh",
            begin: 0
          });
        }}
        is_refreshing={this.props.route_refreshing}
        canLoadMore={
          !this.props.route_loaded_all &&
          !this.props.route_loading &&
          !this.props.route_refreshing &&
          this.props.routes.length > 0
        }
        isLoadingMore={
          this.props.route_loading &&
          !this.props.route_refreshing &&
          this.props.routes.length > 0
        }
        onLoadMore={()=>{
          if(!this.props.route_loaded_all && this.props.route_refreshing != true && this.props.route_loading != true){
            this.props.getRoutes({
              token: this.props.token,
              type: "load_more",
              begin: this.props.route_begin
            });
          }
        }}
      />
    )
  }

  exportRoutesString() {
    const {
      route_team_member,
      start_date,
      end_date
    } = this.props.route_filters;

    var export_string = "";

    if (start_date == null && end_date == null) {
      export_string =
        "v2/" +
        "routes/?token=" +
        this.props.token +
        "&type=export&limit=500&filter_team_member=" +
        route_team_member;
    } else {
      export_string =
        "v2/" +
        "routes/?token=" +
        this.props.token +
        "&type=export&limit=500&filter_team_member=" +
        route_team_member +
        "&filter_start_date=" +
        start_date +
        "&filter_end_date=" +
        end_date;
    }
    return export_string;
  }

  renderAllRoutesMenu(){
    return(
      <Wrapper style={{paddingRight: 15, paddingLeft: 15}}>
        <Row>
          <Title>Tracked Routes:</Title>
          <Row style={{flex: 1, justifyContent: "flex-end"}}>
            <Button onPress={()=>{
              this.props.appRedirect({redirect: "goForward", payload:{add: "route-filters"}})
            }} style={{
              alignSelf: "stretch",
              alignItems: "center",
              justifyContent: "center",
              width: 50
            }}>
              <Icon
                icon="filter-list"
                size={22}
              />
            </Button>
            <Button onPress={()=>{
              openUrl(AppConfig().base_url + this.exportRoutesString());
            }} style={{
              alignSelf: "stretch",
              alignItems: "center",
              justifyContent: "center",
              width: 50
            }}>
              <Icon
                icon="get-app"
                size={22}
              />
            </Button>

            <ToggleImagesButton {...this.props}/>
          </Row>
        </Row>
      </Wrapper>
    )
  }

  renderDrivingAnalytics(){
    //if(this.props.isMobile){
      return(
        <DrivingAnalytics />
      )
    //}
  }

  render(){

    if(this.props.toggle_driving_images){
      return (
        <Wrapper>

          {this.renderMobileStartButton()}
          {this.renderDrivingAnalytics()}
          {this.renderAllRoutesMenu()}
          <FilterTags {...this.props} />

          {this.renderBody()}
        </Wrapper>
      );
    }

    return (
      <Wrapper>

        {this.renderMobileStartButton()}
        {this.renderDrivingAnalytics()}
        {this.renderAllRoutesMenu()}
        <FilterTags {...this.props} />
        <Card>
          {this.renderBody()}
        </Card>
      </Wrapper>
    );
  }

}

export default RouteList;
