import React, { Component } from 'react';

import {
  Card,
  Wrapper,
  CardBody,
  Title,
  Copy,
  Animation,
  Row,
  Bold
} from 'app/NativeComponents/common';

import {
  CardLabel
} from 'app/NativeComponents/snippets';

import {
  numberFormat
} from 'app/NativeActions';

class DealClosedInfo extends Component{


  componentDidUpdate(prevProps){
    if(this.props.active_property.deal && prevProps.active_property.deal){
      if(prevProps.active_property.deal.closed !== this.props.active_property.deal.closed && this.props.active_property.deal.closed == 1 && prevProps.active_property.deal.closed == 0){
        this.props.appRedirect({redirect: "goForward", payload:{add: "purchase-details"}});
      }
    }
  }

  formatExitStrategy(exit_strategy){
    if(exit_strategy){
      let formatted_string = exit_strategy.replace(new RegExp("_", 'g'), " ");
      formatted_string = formatted_string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      return formatted_string;
    }

    return "N/A";

  }

  renderProfitFieldName(exit_strategy){
    if(exit_strategy == "wholesale"){
      return "Wholesale Fee";
    }else if(exit_strategy == "fix_and_flip"){
      return "Expected Profit";
    }else if(exit_strategy == "buy_and_hold"){
      return "Discount";
    }else{
      return "Your Profit";
    }
  }

  renderPurchaseDetails(){
    if(this.props.active_property.deal.purchase_profit){
      return(
        <Wrapper>
          <Wrapper style={{alignItems: "center", justifyContent: "center", paddingBottom: 0}}>
            <Animation type="zoomIn">
              <Title style={{
                  textAlign: "center",
                  fontSize: 42,
                  color: this.props.colors.active_color}}>
                {"$" + numberFormat(parseInt(this.props.active_property.deal.purchase_profit))}
              </Title>
              <Copy style={{marginTop: 10, textAlign: "center"}}>
                {this.renderProfitFieldName(this.props.active_property.deal.purchase_exit_strategy)}
              </Copy>
            </Animation>
          </Wrapper>
          <Row style={{paddingTop: 15, paddingBottom: 15}}>
            <Wrapper style={{
              flex:1
            }}>
              <Copy>Purchase Price:</Copy>
              <Title>{"$" + numberFormat(parseInt(this.props.active_property.deal.purchase_price))}</Title>
            </Wrapper>
            <Wrapper style={{
              flex:1
            }}>
              <Copy>Exit Strategy:</Copy>
              <Title>{this.formatExitStrategy(this.props.active_property.deal.purchase_exit_strategy)}</Title>
            </Wrapper>
          </Row>
        </Wrapper>
      )
    }
  }

  render(){
    if(this.props.active_property.deal){
      if(parseInt(this.props.active_property.deal.closed) === 1){
        return(
          <Card>
            <CardLabel
                title="Deal Closed"
                icon="attach-money"
                hasButton={true}
                hasBorder={true}
                onPress={()=>this.props.appRedirect({redirect: "goForward", payload: {add: "purchase-details"}})}
              />
              <CardBody>
                {this.renderPurchaseDetails()}
                <Wrapper>
                  <Copy>
                    <Bold>Way to go!</Bold> You've closed this deal! Make sure to <Bold>pay your DealFinder</Bold> if you had one. Otherwise kick back, relax and enjoy your payday!
                  </Copy>
                </Wrapper>
              </CardBody>
          </Card>
        )
      }
    }
    return <Wrapper/>;
  }
}

export default DealClosedInfo;
