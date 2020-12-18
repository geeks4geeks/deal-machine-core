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

class DealCredit extends Component{

  render(){
    if(this.props.platform != "ios" && this.props.card_info.has_card){
      if(this.props.user.team_clearance_level > 0 || this.props.user.team_owner == 1){

        if(this.props.deal_credits_loading){
          return(
            <Card>
              <CardBody>
                <Row>
                  <Spin size="small" />
                  <Copy style={{fontSize: 10, marginLeft: 5}}><Bold>
                  Loading DealCredit...
                  </Bold></Copy>
                </Row>
              </CardBody>
            </Card>
          )
        }

        if(this.props.deal_credits){


          const deal_credits = this.props.deal_credits
          return(
                <Card>
                  <CardBody>
                      <Button style={{flex: 1, marginBottom:20}} onPress={()=>{
                        this.props.toggleDealCreditModal(true)
                      }}>
                        <Wrapper>

                          <Title>{renderPrice(deal_credits.deal_credits_remaining.cents)} DealCredit remaining</Title>
                          <Copy style={{marginBottom:10}}>DealCredit is used for sending mail or skip tracing within DealMachine.</Copy>
                          <Copy>Your account will be reloaded {renderPrice(this.props.user.team_default_credit_reload*100)} when it reaches or falls below $0.00</Copy>
                        </Wrapper>
                      </Button>
                      <Wrapper>
                        <Row>
                          <PillButton onPress={()=>{
                            this.props.appRedirect({redirect: "goForward", payload: {add: "purchase-credit"}})
                          }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 5}}>
                            Add More
                          </PillButton>
                          <PillButton onPress={()=>{
                            this.props.appRedirect({redirect: "goForward", payload: {add: "credit-reload"}})
                          }} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0}}>
                            Manage
                          </PillButton>
                        </Row>
                      </Wrapper>
                </CardBody>
              </Card>

          )
        }
      }
    }
    return <Wrapper/>
  }
}


export default DealCredit;
