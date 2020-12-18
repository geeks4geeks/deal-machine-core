import React, { Component } from 'react';
import {
  Wrapper,
  Animation
} from 'app/NativeComponents/common';

import SideBarButton from './SideBarButton';
import {
  openUrl
} from 'app/NativeActions';


class SettingsButtons extends Component{

  constructor(props){
    super(props);

    this.state = {
      opened: false
    }

  }

  renderPartnerButton(){
    if(this.props.device == "desktop" && this.props.is_partner == 1){

      return (
        <Wrapper>
          <SideBarButton
            {...this.props}
            to="/app/partner"
            dropButton={true}
            active={"partner" == this.props.tab ? true : false}
            title={"Partner"}
            icon="donut_large"
            onPress={()=>{
              this.setState({opened: false})

              if(this.props.tab != "partner"){
                this.props.appRedirect({redirect: "partner"});
              }
              this.props.changeTab("settings", this.props.tab);
              this.props.selectActiveProperty(null);

            }}
            hideButton={false}
            mobile_toggle_drawer={this.props.mobile_toggle_drawer}
            colors={this.props.colors}


          />
        </Wrapper>
      );
    }
  }

  renderLeadsButton(){
    if(this.props.user.team_clearance_level > 0){
      return(
        <SideBarButton
          {...this.props}
          to="/app/share"
          active={false}
          dropButton={true}
          title="Get Free Leads"
          icon="star"
          onPress={()=>{
            this.setState({opened: false})

            this.props.appRedirect({redirect: "share"});
            this.props.changeTab("settings", this.props.tab);

          }}
          hideButton={false}
          mobile_toggle_drawer={this.props.mobile_toggle_drawer}
          colors={this.props.colors}


        />
      )

    }
  }

  renderDropdownButtons(){
    if(this.state.opened && this.props.mobile_toggle_drawer){
        return(
          <Animation type="fadeIn">
            {this.renderPartnerButton()}
            <SideBarButton
              {...this.props}
              to="/app/team"
              active={false}
              dropButton={true}

              title="Team"
              icon="people"
              onPress={()=>{
                this.setState({opened: false})

                this.props.appRedirect({redirect: "team"});
                this.props.changeTab("settings", this.props.tab);

              }}
              hideButton={false}
              mobile_toggle_drawer={this.props.mobile_toggle_drawer}
              colors={this.props.colors}

            />

            {this.renderLeadsButton()}

            <SideBarButton
              to="/app/settings"
              active={false}
              dropButton={true}
              title="Settings"
              icon={"settings"}
              onPress={()=>{
                this.setState({opened: false})

                this.props.appRedirect({redirect: "settings"});
                this.props.changeTab("settings", this.props.tab);


              }}
              hideButton={false}
              mobile_toggle_drawer={this.props.mobile_toggle_drawer}
              colors={this.props.colors}

            />

            <SideBarButton
              to="https://dealmachine.featureupvote.com"
              active={false}
              dropButton={true}
              title="Request Feature"
              icon={"thumb-up"}
              onPress={()=>{
                openUrl("https://dealmachine.featureupvote.com");
              }}
              hideButton={false}
              mobile_toggle_drawer={this.props.mobile_toggle_drawer}
              colors={this.props.colors}

            />


          </Animation>


        )
    }
  }

  render(){

    if(this.props.user.team_clearance_level == 0){

      return(
        <Wrapper>
          <SideBarButton
            to="/app/settings"
            active={"settings" == this.props.tab ? true : false}
            dropButton={false}
            title="Settings"
            icon={"settings"}
            onPress={()=>{
              this.setState({opened: false})

              this.props.appRedirect({redirect: "settings"});
              this.props.changeTab("settings", this.props.tab);

            }}
            hideButton={false}
            mobile_toggle_drawer={this.props.mobile_toggle_drawer}
            colors={this.props.colors}

          />
        </Wrapper>
      );

    }else{
      return(
        <Wrapper>
          <SideBarButton
          {...this.props}
          active={"settings" == this.props.tab ? true : false}
          title="More"
          dropParent={true}
          opened={this.state.opened}
          icon="more-horiz"
          onPress={()=>{

            this.props.mobileToggleDrawer(true)
            if(this.state.opened){
              this.setState({opened: false})
            }else{
              this.setState({opened: true})
            }
          }}
          hideButton={false}
          mobile_toggle_drawer={this.props.mobile_toggle_drawer}
          colors={this.props.colors}

          />

          {this.renderDropdownButtons()}

        </Wrapper>
      );
    }

  }



}

export default SettingsButtons;
