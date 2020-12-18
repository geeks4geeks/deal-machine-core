import React, { Component } from 'react';
import {
  Wrapper,
  ModalOverlay,
  Modal,
  Card,
  CardBody,
  Scroll

} from 'app/NativeComponents/common';

import {
  FeatureLockButton,
  ToggleSwitch
} from 'app/NativeComponents/snippets';

import MapViewButton from './MapViewButton';
import Legend from './Legend';
import PropertyLabel from './PropertyLabel';
import PropertyHighlight from './PropertyHighlight';

import OnboardingContainer from 'app/DealMachineCore/snippets/OnboardingContainer';

import {
  checkIfUserHasBillingAddon
} from 'app/NativeActions';

class Body extends Component{

  renderPerformanceModeSwitch(){
    if(this.props.device === "mobile"){
      return(
        <Card>
          <ToggleSwitch
            onChange={value => {
              this.props.editPropertyMapOptions({prop: "performance_mode", value})
            }}
            value={this.props.property_map_options.performance_mode}
            title={'Use Performance Mode'}
            text={'If you\'re having lagging issues, try "Performance Mode". This will hide markers while panning the map and will only show your added properties. If problems continue, please contact support.'}
          />
        </Card>
      )
    }
  }

  renderRouteSwitch(){
    //need the driving module with tier 2 to access

    if(this.props.plan_module_info){
      if(((!this.props.plan_module_info.has_module ||
        (this.props.plan_module_info.has_module && this.props.plan_module_info.tier < 2)) &&
        !checkIfUserHasBillingAddon({billing_addons: this.props.billing_addons, slug: "routes"})
        && this.props.user.team_clearance_level > 0)
        || this.props.card_info.bad_card == 1){
        return(
          <OnboardingContainer
            plan_module_info={this.props.plan_module_info}
            slug="driving"
            contentful_slug="drivingRoutes"
            require_tier={2}
            isCard={true}
          />
        )
      }
      if(this.props.plan_module_info.tier >= 2 || checkIfUserHasBillingAddon({billing_addons: this.props.billing_addons, slug: "routes"})){
        return(
          <Card>
            <ToggleSwitch
              onChange={value => {
                this.props.toggleShowRoutes(value)
              }}
              value={this.props.show_routes == true ? true : false}
              title={"Show Driving Routes?"}
              text={"Shows past driving routes on the map."}
            />
            <Legend {...this.props}/>
          </Card>
        )
      }
    }

    return <Wrapper />

  }

  render(){
    return (
      <Wrapper style={{paddingBottom: 60}}>
        <CardBody>
          <MapViewButton {...this.props}/>
        </CardBody>

          {this.renderRouteSwitch()}





        <Card>
          <PropertyLabel {...this.props}/>
        </Card>
        {/*
        <Card>
          <PropertyHighlight {...this.props}/>
        </Card>
        */}

        {this.renderPerformanceModeSwitch()}

      </Wrapper>
    );
  }

}

export default Body;
