import React, { Component } from 'react';

import{
  Button,
  Card,
  Wrapper,
  Spin,
  Row,
  Icon,
  Copy,
  Bold
} from 'app/NativeComponents/common';


import {
  renderPrice
} from 'app/NativeActions';

class DealCreditsButton extends Component{

  componentDidUpdate(prevProps){
    if(!prevProps.trigger_deal_credit_reload && this.props.trigger_deal_credit_reload){
      this.props.getBilling({token: this.props.token, type: "deal_credits"});
    }
  }

  render(){
    if(this.props.platform != "ios"){
      if(this.props.user.team_clearance_level > 0 || this.props.user.team_owner == 1){

        if(this.props.deal_credits_loading){
          return(
            <Wrapper style={{
              paddingTop: 5,
              paddingRight: 10
            }}>
              <Row>
                <Spin color={this.props.colors.white_text_color} size="small" />
                <Copy style={{fontSize: 10, color: this.props.colors.white_text_color, marginLeft: 5}}><Bold>
                Loading...
                </Bold></Copy>
              </Row>
            </Wrapper>
          )
        }

        if(this.props.deal_credits){


          const deal_credits = this.props.deal_credits
          return(
            <Button onPress={()=>{
              this.props.toggleDealCreditModal(true)
            }}>
                <Wrapper style={{
                  paddingTop: 5,
                  paddingRight: 10
                }}>
                  <Row>
                    <Icon
                      icon={"fiber-smart-record"}
                      size={16}
                      color={this.props.colors.white_text_color}
                      style={{
                        marginRight: 5
                      }}
                    />
                    <Copy style={{fontSize: 10, color: this.props.colors.white_text_color}}><Bold>
                    {renderPrice(deal_credits.deal_credits_remaining.cents)}
                    </Bold></Copy>
                  </Row>
                </Wrapper>

            </Button>
          )
        }
      }
    }
    return <Wrapper/>
  }
}


export default DealCreditsButton;
