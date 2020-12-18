import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';

import SideBarButton from './SideBarButton';

class ListsButton extends Component{


  constructor(props){
    super(props);
  }



  render(){

    if(this.props.user.team_clearance_level > 0){
      return(
        <SideBarButton
          to="/app/lists"
          active={"lists" == this.props.tab || "lists" == this.props.tab ? true : false}
          dropParent={false}
          title="Lists"
          icon={"reorder"}
          onPress={()=>{
            this.props.changeTab("lists", this.props.tab);
            this.props.setActiveList(null);
            this.props.appRedirect({redirect: "list_builder"});
          }}
          hideButton={false}
          mobile_toggle_drawer={this.props.mobile_toggle_drawer}
          colors={this.props.colors}
          flag_title={"Beta"}
        />
      )
    }

    return <Wrapper />

  }



}

export default ListsButton;
