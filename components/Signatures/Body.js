import React, { Component } from 'react';
import { Wrapper, WebContainer, Card, PrimaryButton, CardBody, Title, Copy, Spin } from 'app/NativeComponents/common';

import SignatureList from './SignatureList';

class Body extends Component{


  render(){
    if(this.props.signatures.length > 0){
      return (
        <SignatureList {...this.props}/>
      );
    }else if(this.props.refreshing){
      return(
        <Wrapper  style={{flex: 1}}>
            <Wrapper style={{
              alignItems: "center",
              justifyContent: "flex-start",
              alignSelf: "stretch",
              flex: 1
            }}>
              <CardBody>
                <Spin />
              </CardBody>
            </Wrapper>
        </Wrapper>
      );
    }

    return (
      <Wrapper style={{flex: 1}}>
        <WebContainer>
          <CardBody style={{marginTop: 20}}>
            <Title style={{textAlign: "center"}}>Your signatures will show here.</Title>
            <Copy style={{textAlign: "center"}}>You have no signatures associated with your account. Add one by pressing the "Create New Signature" button below. </Copy>
          </CardBody>
          <Card>
            <PrimaryButton onPress={()=>{
              //set template blank
              this.props.newSignature();
            }}>
              Create New Signature
            </PrimaryButton>
          </Card>
        </WebContainer>
      </Wrapper>
    )
  }

}

export default Body;
