import React, { Component } from 'react';
import {
  Wrapper,
  Animation
} from 'app/NativeComponents/common';

import SideBarButton from './SideBarButton';

class DealsButton extends Component{


  constructor(props){
    super(props);

    this.state = {
      opened: false
    }

  }



  render(){
    return(
      <Wrapper>
        <SideBarButton
          to="/app/map"
          active={"deals" == this.props.tab || "map" == this.props.tab ? true : false}
          dropParent={false}
          title="Map"
          icon={"map"}
          onPress={()=>{
            this.setState({opened: false})
            this.props.changeTab("map", this.props.tab)
            this.props.appRedirect({redirect: "map"});

          }}
          hideButton={false}
          mobile_toggle_drawer={this.props.mobile_toggle_drawer}
          colors={this.props.colors}


        />
        <SideBarButton
          to="/app/leads"
          active={"leads" == this.props.tab ? true : false}
          dropParent={false}
          title={this.props.user.team_clearance_level > 0 ? "Leads" : "My Leads"}
          icon={"attach-money"}
          onPress={()=>{
            this.setState({opened: false});
            this.props.changeTab("leads", this.props.tab)
            this.props.appRedirect({redirect: "leads"});

          }}
          hideButton={false}
          mobile_toggle_drawer={this.props.mobile_toggle_drawer}
          colors={this.props.colors}

        />


      </Wrapper>
    )

  }



}

export default DealsButton;
