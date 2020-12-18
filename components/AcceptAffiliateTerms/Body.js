import React, { Component } from 'react';

import {
  Scroll,
  CardBody,
  Title,
  PrimaryButton,
  Copy,
  Card,
  Spin,
  HTMLMarkdown
 } from 'app/NativeComponents/common';


class Body extends Component{


  renderTerms(){
    if(this.props.terms_loading){
      return(
        <CardBody style={{
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Spin size="small"/>
        </CardBody>
      )
    }else if(this.props.terms_error != ""){
      return(
        <CardBody>
          <Copy>{this.props.terms_error}</Copy>
        </CardBody>
      )
    }else if(this.props.terms_of_service != ""){
      return(
        <CardBody>
          <HTMLMarkdown source={this.props.terms_of_service} escapeHtml={false}/>
        </CardBody>
      )
    }


  }

  render(){

    return(
      <Scroll>
        {this.renderTerms()}
        <Card>
          <PrimaryButton
            onPress={() => this.props.acceptTerms()}>
            I Accept The Terms of Service
          </PrimaryButton>
        </Card>
      </Scroll>
    );

  }

}

export default Body;
