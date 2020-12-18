import React, { Component } from 'react';
import {
  Wrapper,
  Animation
} from 'app/NativeComponents/common';

import SideBarButton from './SideBarButton';

class MailerButtons extends Component{


  constructor(props){
    super(props);

    this.state = {
      opened: false
    }

  }

  renderDropdownButtons(){
    if(this.state.opened && this.props.mobile_toggle_drawer){
        return(
          <Animation type="fadeIn">

            <SideBarButton
              to="/app/templates"
              active={false}
              dropButton={true}
              title="Templates"
              icon={"dashboard"}
              onPress={()=>{
                this.setState({opened: false})

                this.props.appRedirect({redirect: "templates"});
                this.props.changeTab("mailers", this.props.tab);

              }}
              colors={this.props.colors}
              hideButton={false}
              mobile_toggle_drawer={this.props.mobile_toggle_drawer}

            />

            <SideBarButton
              to="/app/campaigns"
              active={false}
              dropButton={true}
              title="Campaigns"
              fa_icon={"flag"}
              onPress={()=>{
                this.setState({opened: false})

                this.props.appRedirect({redirect: "campaigns"});
                this.props.changeTab("mailers", this.props.tab);

              }}
              colors={this.props.colors}
              hideButton={false}
              mobile_toggle_drawer={this.props.mobile_toggle_drawer}

            />

            <SideBarButton
              to="/app/signatures"
              active={false}
              dropButton={true}
              title="Signatures"
              icon={"border-color"}
              onPress={()=>{
                this.setState({opened: false})
                this.props.selectActiveProperty(null);

                this.props.appRedirect({redirect: "signatures"});
                this.props.changeTab("mailers", this.props.tab);

              }}
              hideButton={false}
              colors={this.props.colors}
              mobile_toggle_drawer={this.props.mobile_toggle_drawer}


            />


          </Animation>


        )
    }
  }

  render(){
    return(
      <Wrapper>
        <SideBarButton
        {...this.props}
        active={"mailers" == this.props.tab ? true : false}
        title="Mailers"
        dropParent={true}
        opened={this.state.opened}

        icon="mail"
        onPress={()=>{
          this.props.mobileToggleDrawer(true)
          if(this.state.opened){
            this.setState({opened: false})
          }else{
            this.setState({opened: true})

          }
        }}
        hideButton={this.props.user.team_clearance_level > 1 || (this.props.user.team_clearance_level == 1 && this.props.user.can_edit_templates == 1) ? false : true}
        mobile_toggle_drawer={this.props.mobile_toggle_drawer}
        colors={this.props.colors}

        />

        {this.renderDropdownButtons()}

      </Wrapper>
    )

  }



}

export default MailerButtons;
