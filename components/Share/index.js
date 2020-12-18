import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer, Spinner } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  toggleDrawer,
  appRedirect,
  changeTab,
  getStats
} from 'app/NativeActions';

class Settings extends Component{

  componentDidMount(){
    this.props.getStats({token: this.props.token})
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
    }

    this.props.changeTab("settings");

  }

  render(){

    if(this.props.stats.invite.code && this.props.stats.invite.code != ""){

      return(
        <Container>
          <Header
            title="Get Free Leads"
            leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
            leftButtonAction={
              this.props.device == "desktop" ? ()=>{} : ()=>this.props.toggleDrawer("open")
            }
          />
          <WebContainer>
            <Body
              {...this.props}
            />
          </WebContainer>
        </Container>
      );
    }
    return (
      <Container>
        <Header
          title="Get Free Leads"
          leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
          leftButtonAction={
            this.props.device == "desktop" ? ()=>{} : ()=>this.props.toggleDrawer("open")
          }
        />
        <Spinner/>
      </Container>
    )
  }
}

const mapStateToProps = ({ auth, native, drawer }) => {
  const { token, user } = auth;
  const { device } = native;
  const { stats, open } = drawer;

  return {
    token,
    user,
    device,
    stats,
    open
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  appRedirect,
  changeTab,
  getStats
})(Settings);
