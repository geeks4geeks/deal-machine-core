import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  /*mobile*/
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  updateUser,

  appRedirect,
  changeTab,

  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class Notifications extends Component{

  constructor(props){
    super(props);

    let notification_array = [];
    if(this.props.notifications){
      if(this.props.notifications.length > 0){
        this.props.notifications.map((notification, i)=>{
          notification_array.push(notification);
        });
      }

    }
    this.state = {
      notification_array:notification_array
    }
  }

  checkIfNeedsToSave(){
    if(this.props.notifications){
      for(var i = 0; i<this.props.notifications.length; i++){
        for(var j = 0; j<this.state.notification_array.length; j++){
          if(this.props.notifications[i].id == this.state.notification_array[j].id){
            if(this.props.notifications[i].notification_off != this.state.notification_array[j].notification_off){
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  updateUserNotification(){

    let update_notification_array =[];

    this.state.notification_array.map((notification, i)=>{
      update_notification_array.push({
        notification_id: notification.id,
        notification_off: notification.notification_off
      });
    });

    this.props.updateUser({
      token: this.props.token,
      type: "update_all_notifications",
      payload: {
        notification_array: JSON.stringify(update_notification_array)
      }
    });

  }


  changeNotification(id){
    let notification_array = [];

    for(var i = 0; i<this.state.notification_array.length; i++){
      if(id == this.state.notification_array[i].id){
        notification_array.push({
          ...this.state.notification_array[i],
          notification_off: this.state.notification_array[i].notification_off == 1 ? 0 : 1
        })
      }else{
        notification_array.push(this.state.notification_array[i]);
      }
    }
    this.setState({notification_array:notification_array});

  }


  componentWillUnmount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false);
    }
  }
  componentDidMount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    this.props.changeTab("settings");
  }

  handleBack(){

    /*mobile*/
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}})

  }

  render(){
    return(
      <Container>
        <Header
          title="Notification Settings"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}

          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.updateUserNotification() : ()=>{}}

        />
        <KeyboardView>
          <Body
            {...this.props}
            notification_array={this.state.notification_array}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
            changeNotification={this.changeNotification.bind(this)}
            updateUserNotification={this.updateUserNotification.bind(this)}
          />
        </KeyboardView>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, promo, settings }) => {
  const { token, user } = auth;
  const { device } = native;

  const { notifications } = settings;

  return { token, user, device, notifications }
}



export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  updateUser,

  appRedirect,
  changeTab
})(Notifications);
