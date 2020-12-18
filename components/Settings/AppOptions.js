import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { CardLabel, ToggleSwitch, FeatureLockButton } from 'app/NativeComponents/snippets';

class AppOptions extends Component{

  constructor(props){
    super(props);

    this.state = {
      google_toggle: this.props.user.grab_google_street_view == 1 ? true : false
    }
  }

  renderMailingSettingsToggle(){
    if(this.props.user.team_clearance_level > 1 || this.props.user.team_owner == 1){
      return(
        <Wrapper>
          <ToggleSwitch
            onChange={value => {
              this.props.updateUser({
                token: this.props.token,
                type: "pause_sending",
                payload: {
                  pause_sending: this.props.user.pause_sending == 1 ? 0 : 1,
                  auto_approve: this.props.user.auto_approve
              }});
            }}
            value={this.props.user.pause_sending == 1 ? true : false}
            title={"Stop All Sending?"}
            text={"No mailers will be sent during this time. This will also update the status of all your deals to \"Pending Approval\"."}
          />
          <ToggleSwitch
            onChange={value => {
              this.props.updateUser({
                token: this.props.token,
                type: "account_mail_settings",
                payload: {
                  pause_sending: this.props.user.pause_sending,
                  auto_approve: this.props.user.auto_approve == 1 ? 0 : 1
              }});
            }}
            value={this.props.user.auto_approve == 1 ? true : false}
            title={"Automatically send mailers?"}
            text={"This will automatically start added leads in the \"With Marketing\" status. Mailers will automatically be sent for all future added leads."}
          />
        </Wrapper>
      )
    }
  }

  renderGoogleStreetToggle(){
    if(this.props.user.team_clearance_level > 1 || this.props.user.team_owner == 1){
      return(

        <FeatureLockButton
          isToggleSwitch
          toggle_value={this.state.google_toggle}
          onPress={value => {

            this.setState({google_toggle: value});
            this.props.updateUser({
              token: this.props.token,
              type: "grab_google_street_view",
              payload: {
                grab_google_street_view: value == true ? 1 : 0
            }});

          }}
          toggle_title={"Enable Street Pic"}
          toggle_text={"Automatically add a photo to properties from Street Pic. Adds the image to your property within a 1-2 hour delay for leads added with no picture."}
          feature_slug={"street_view"}
        />

      )
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.user){
      if(this.props.user.grab_google_street_view != prevProps.user.grab_google_street_view){
        this.setState({google_toggle: this.props.user.grab_google_street_view == 1 ? true : false})
      }else if(
        (this.props.user.grab_google_street_view == 1 && this.state.google_toggle != true) ||
        (this.props.user.grab_google_street_view == 0 && this.state.google_toggle == true)
      ){
        this.setState({google_toggle: this.props.user.grab_google_street_view == 1 ? true : false})
      }

    }
  }

  render(){


    if(this.props.device == "mobile"){
      return (
        <Card>
          <CardLabel
            title={"Application Options"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
            {this.renderMailingSettingsToggle()}

            <ToggleSwitch
              onChange={value => {
                this.props.setDarkMode(value === true ? "dark_mode" : "dark_mode_off")
              }}
              value={this.props.dark_mode == "dark_mode" ? true : false}
              title={"Use in dark mode?"}
              text={"Use app in dark mode to ease the stress on your eyes."}
            />

            {this.renderGoogleStreetToggle()}

            <ToggleSwitch
              onChange={(value) => {
                this.props.setPhotoToCameraroll(value)
              }}
              value={this.props.photoCameraRoll ? true : false}
              title={"Save photos to camera roll?"}
              text={"When you take a photo, a photo will always be saved to your camera roll."}
            />
        </Card>
      );
    }

    return (
        <Card>
            {this.renderMailingSettingsToggle()}
            <ToggleSwitch
              onChange={value => {
                this.props.setDarkMode(value === true ? "dark_mode" : "dark_mode_off")
              }}
              value={this.props.dark_mode == "dark_mode" ? true : false}
              title={"Use in dark mode?"}
              text={"Use app in dark mode to ease the stress on your eyes."}
            />

            {this.renderGoogleStreetToggle()}


        </Card>
    );


  }

}

export default AppOptions;
