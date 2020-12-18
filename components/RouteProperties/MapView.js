import React, { PureComponent } from 'react';

import { Wrapper, StatusBarStyle, Title, Copy } from 'app/NativeComponents/common';
import OnboardingContainer from 'app/DealMachineCore/snippets/OnboardingContainer';

import RouteMap from 'app/NativeComponents/components/RouteMap'
import RouteHeader from './RouteHeader';

import {
  checkIfUserHasBillingAddon
} from 'app/NativeActions';
class MapView extends PureComponent{

  render(){



    if(this.props.route_properties_toggle_tab == "map"){

      if(this.props.plan_module_info.has_module && this.props.plan_module_info.tier < 2 &&
      !checkIfUserHasBillingAddon({billing_addons: this.props.billing_addons, slug: "routes"}) &&
      this.props.user.team_clearance_level > 0
      ){

        return(
          <Wrapper style={{flex: 1}}>
            <RouteHeader
              {...this.props}
              list_view={true}

            />

            <OnboardingContainer
              plan_module_info={this.props.plan_module_info}
              slug="driving"
              contentful_slug="drivingRoutes"
              require_tier={2}
              noContainer={true}
              noHeader={true}
            />
          </Wrapper>
        )
      }

      if(this.props.active_route.route_type === "legacy_route"){

        return(
          <Wrapper style={{flex: 1}}>
            <RouteHeader
              {...this.props}
              list_view={true}

            />
            <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20}}>
              <Title style={{textAlign: "center"}}>Map View not available</Title>
              <Copy style={{textAlign: "center"}}>This route was taken before our map view was available. We appolgize for the inconvenience.</Copy>
            </Wrapper>
          </Wrapper>
        )
      }

      if(this.props.plan_module_info.tier >= 2 || checkIfUserHasBillingAddon({billing_addons: this.props.billing_addons, slug: "routes"})){
        return(
          <Wrapper style={{flex: 1}}>
            <StatusBarStyle style="dark-content"/>
            <RouteMap
              {...this.props}
            />
          </Wrapper>
        );
      }else{
        return(
          <Wrapper style={{flex: 1}}>
            <RouteHeader
              {...this.props}
              list_view={true}
            />
            <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20}}>
              <Title style={{textAlign: "center"}}>Map View not available</Title>
              <Copy style={{textAlign: "center"}}>Map View is not available on your account. Talk to your team leader about getting access.</Copy>
            </Wrapper>
          </Wrapper>
        );
      }
    }

    return <Wrapper />
  }
}

export default MapView
