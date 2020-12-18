import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, KeyboardView, Spinner } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  /*mobile*/
  toggleCanPop,

  authFieldChanged,
  loginUser,
  appRedirect,

  getUser,
  getStats,

  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

import Body from './Body';

class Login extends Component{

  componentWillUnmount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
    }
  }

  componentDidMount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
    }else if(this.props.device == "desktop"){
      /* redirect if logged in */
      const token = window.localStorage.getItem('token');
      if(token != null){
        this.props.getUser({token, device: this.props.device, redirect:true});
        //this.props.getStats({token});
      }
    }
  }

  handleBack(){
    /* mobile */
    dismissMobileKeyboard();

    this.props.appRedirect({redirect: "goBack", payload: {type: "getStarted"}})
  }

  login(){
    /* mobile */
    dismissMobileKeyboard();
    const { email, password, device } = this.props;
    this.props.loginUser({email, password, device});
  }

  checkIfNeedsToSave(){
    if(this.props.email && this.props.email != "" ||
    this.props.password && this.props.password != ""){
      return true;
    }

    return false;
  }
  renderSpinner(){
    if(this.props.loading){
      return <Spinner />
    }
  }
  render(){

    if(this.props.no_container){
      return(
        <Body
          {...this.props}
          login={this.login.bind(this)}
          checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
        />
      );
    }

    return(
      <Container>

        <Header
          title="Login"
          leftButtonIcon={"arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? this.login.bind(this) : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            login={this.login.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
        {this.renderSpinner()}
      </Container>
    )

  }
}

const mapStateToProps = ({ auth, native, drawer }) => {
  const { user, email, password, loading } = auth;
  const { device, platform } = native;
  const { stats } = drawer;
  return {
    user,
    email,
    password,
    loading,
    device,
    platform,
    stats
  };
}

export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,
  appRedirect,

  getUser,
  getStats,

  authFieldChanged,
  loginUser
})(Login);
