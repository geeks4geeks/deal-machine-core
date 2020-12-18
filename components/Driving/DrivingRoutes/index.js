import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Row, Title, Copy, Spin } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

import RouteList from './RouteList';
import FilterTags from './FilterTags';

class DrivingRoutes extends Component{


  render(){
    if(this.props.tab === "routes"){
      if(this.props.routes){

        if(this.props.route_refreshing || (this.props.route_loading && this.props.routes.length == 0)){
          return(
            <Wrapper  style={{flex: 1}}>
                <Wrapper style={{
                  alignItems: "center",
                  justifyContent: "center"}}>
                  <CardBody>
                    <Row>
                      <Spin size="small"/>
                      <Copy style={{marginLeft: 10}}>Loading driving routes...</Copy>
                    </Row>
                  </CardBody>
                </Wrapper>
            </Wrapper>
          );
        }

        if(this.props.routes.length > 0){
          return (
            <RouteList {...this.props}/>
          );
        }
      }
      if(this.props.isMobile){
        return (
          <Wrapper style={{flex: 1}}>
            <FilterTags {...this.props} />
            <CardBody style={{alignItems: "center", justifyContent: "center"}}>
              <Title style={{textAlign: "center"}}>Your driving routes will show here.</Title>
              <Copy style={{textAlign: "center"}}>You have no driving routes associated with your account based on your current filters. Record a drive by pressing the "Start Driving" button on your map view or press the buttom below.</Copy>
              <PillButton
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
          </Wrapper>
        )
      }
      return (
        <Wrapper style={{flex: 1}}>
          <FilterTags {...this.props} />
          <CardBody style={{alignItems: "center", justifyContent: "center"}}>
            <Title style={{textAlign: "center"}}>Your driving routes will show here.</Title>
            <Copy style={{textAlign: "center"}}>You have no driving routes associated with your account. Start a route by pressing the "Start Driving" button on your mobile map view.</Copy>
          </CardBody>
        </Wrapper>
      )
    }

    return <Wrapper />
  }

}

export default DrivingRoutes;
