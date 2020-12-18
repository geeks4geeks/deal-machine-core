import React, { Component } from 'react';
import { Wrapper, WebContainer, Card, PrimaryButton, CardBody, Title, Copy, Spin } from 'app/NativeComponents/common';

import TemplateList from './TemplateList';

class Body extends Component{


  render(){
    if(this.props.templates){
      if(this.props.templates.length > 0){
        return (
          <TemplateList {...this.props}/>
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
    }

    return (
      <Wrapper style={{flex: 1}}>
        <WebContainer>
          <CardBody style={{marginTop: 20}}>
            <Title style={{textAlign: "center"}}>Your templates will show here.</Title>
            <Copy style={{textAlign: "center"}}>You have no templates associated with your account. Add one by pressing the "Create New Template" button below. </Copy>
          </CardBody>
          <Card>
            <PrimaryButton onPress={()=>{
              //set template blank
              this.props.newTemplate();
            }}>
              Create New Template
            </PrimaryButton>
          </Card>
        </WebContainer>
      </Wrapper>
    )
  }

}

export default Body;
