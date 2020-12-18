import React, { Component } from 'react';
import{
  Button,
  Wrapper,
  Spin,
  Row,
  Icon,
  Title,
  Copy,
  Bold,
  Card,
  CardBody
} from 'app/NativeComponents/common';


import{
  PillButton
} from 'app/NativeComponents/snippets';


import {
  renderPrice
} from 'app/NativeActions';

class CardOnFile extends Component{

  render(){
    if(this.props.platform != "ios"){
      if(this.props.user.team_clearance_level > 0 || this.props.user.team_owner == 1){
        if(this.props.card_info.has_card == true){
            if(this.props.card_info.bad_card == 1){
              return(
                <Card>
                  <CardBody>
                      <Wrapper>
                        <Title>Your card ending in {this.props.card_info.last4} has been declined</Title>
                      </Wrapper>
                      <Wrapper>
                        <Row>
                        <PillButton onPress={()=>{
                          this.props.appRedirect({redirect: "goForward", payload: {add: "update-card"}})
                        }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 5}}>
                          Fix It
                        </PillButton>
                        </Row>
                      </Wrapper>
                    </CardBody>
                  </Card>
                )
            }

        }else if(this.props.card_info.has_card == false){

          return(
            <Card>
              <CardBody>
                  <Wrapper>
                    <Title>You don't have a credit card associated with your account.</Title>
                  </Wrapper>
                  <Wrapper>
                    <Row>
                      <PillButton onPress={()=>{
                        this.props.toggleOnboarding(true)
                        this.props.appRedirect({redirect: "goForward", payload: {add: "add-card"}})
                      }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginLeft: 0, marginRight: 5, marginTop: 10}}>
                        Add Card
                      </PillButton>
                    </Row>
                  </Wrapper>
                </CardBody>
              </Card>
            )
          }
        }
      }

      return <Wrapper />;

    }

}


export default CardOnFile;
