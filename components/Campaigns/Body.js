import React, { Component } from 'react';
import { Wrapper, WebContainer, Card, PrimaryButton, SecondaryButton, CardBody, Title, Copy, Spin } from 'app/NativeComponents/common';

import CampaignList from './CampaignList';

class Body extends Component{


  render(){
    if(this.props.campaigns.length > 0){

      return (
        <CampaignList {...this.props}/>
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
            <Title style={{textAlign: "center"}}>Your campaigns will show here.</Title>
            <Copy style={{textAlign: "center"}}>Stand out by optimizing sequential messages to your leads. Build campaigns using multiple mail templates that are sent in order exactly when you want them. </Copy>
          </CardBody>
          <Card>
            <PrimaryButton onPress={()=>{
              //set campaign blank
              this.props.newCampaign();
            }}>
              Create New Campaign
            </PrimaryButton>
          </Card>

        </WebContainer>
      </Wrapper>
    )
  }

}

export default Body;
