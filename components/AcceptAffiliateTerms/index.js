import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  /*mobile*/
  toggleCanPop,

  updateUser,
  getTermsOfService,
  appRedirect,

  /*common functions*/
  dismissMobileKeyboard

} from 'app/NativeActions';

class AcceptAffiliateTerms extends Component{

  componentDidMount(){

    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
    }

    if(this.props.user.accepted_affiliate_latest_terms == 1){
      this.props.appRedirect({redirect: "dashboard"});
    }else{
      this.props.getTermsOfService({type: "affiliate"})
    }
  }



  acceptTerms(){
    this.props.updateUser({
      token: this.props.token,
      type: "accept_terms",
      payload: {
        terms_type: "affiliate"
      }
    });
  }

  render(){

    return(
      <Container>
        <Header
          title="Updated Terms of Service"
          subtitle="Affiliate Partners"
          leftButtonIcon="logo"
        />
        <WebContainer>
          <Body
            {...this.props}
            acceptTerms={this.acceptTerms.bind(this)}
          />
        </WebContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, drawer }) => {
  const { token, user, terms_of_service, terms_error, terms_loading} = auth;
  const { device, platform } = native;

  return {
    token,
    user,
    terms_of_service,
    terms_error,
    terms_loading,
    device
  }
}




export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,

  updateUser,
  getTermsOfService,
  appRedirect

})(AcceptAffiliateTerms);
