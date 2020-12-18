import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Title,
  Copy,
  Row,
  Bold,
  Icon,
  Button
} from 'app/NativeComponents/common';

import {
  RemoveTextButton,
  PillButton
} from 'app/NativeComponents/snippets';

class BillingAddonItem extends Component{

  render(){

    if(this.props.addon.team_has_addon == 1){
      //team already purchased

        return(
          <Wrapper style={{padding: 20, borderBottomStyle: "solid", borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color }}>
            <Wrapper style={{paddingBottom: 20}}>
              <Title>{this.props.addon.title}</Title>
              <Copy>{this.props.addon.description}</Copy>
            </Wrapper>
            <Wrapper>
              <Copy>
                <Bold>
                  You've purchased this add-on
                </Bold>
              </Copy>
              <Row>
                <Button onPress={this.props.onCancelItem}>
                  <Copy>Remove from subscription</Copy>
                </Button>
              </Row>
            </Wrapper>
          </Wrapper>
        );

    }else if(this.props.addon.included_in_team_plan == 1){


      return(
        <Wrapper style={{padding: 20, borderBottomStyle: "solid", borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color }}>
          <Wrapper style={{paddingBottom: 20}}>
            <Title>{this.props.addon.title}</Title>
            <Copy>{this.props.addon.description}</Copy>
          </Wrapper>
          <Wrapper>
            <Copy>
              <Bold>
                This feature is included in one of your plan modules.
              </Bold>
            </Copy>
          </Wrapper>
        </Wrapper>
      )

    }

    //team has not purchased

    return(
      <Wrapper style={{padding: 20, borderBottomStyle: "solid", borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color }}>
        <Wrapper style={{paddingBottom: 20}}>
          <Title>{this.props.addon.title}</Title>
          <Copy>{this.props.addon.description}</Copy>
        </Wrapper>
        <Wrapper>
          <Row>
            <PillButton
            primary={true}
              onPress={this.props.onPurchaseItem}
              innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}}
              style={{margin: 0, marginRight: 0}}>
              Add To Subscription
            </PillButton>
          </Row>
        </Wrapper>
      </Wrapper>
    )


  }


}

export default BillingAddonItem;
