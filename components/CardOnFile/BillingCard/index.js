import React, { Component } from 'react';
import {
  Wrapper,
  CardBody,
  Row,
  Icon,
  Title,
  Copy
} from 'app/NativeComponents/common';

import StripeForm from 'app/NativeComponents/components/StripeForm';
import BillingAddress from '../BillingAddress';

class BillingCard extends Component{

  onSaveCard(){

  }

  render(){
    return (
      <Wrapper>
        <CardBody>
          <Row>
            <Icon
              icon="lock-outline"
              size={28}
              style={{
                marginRight: 10
              }}
            />
            <Wrapper style={{
              flex: 1
            }}>
              <Title>
                Securely add a credit card to your account:
              </Title>
              <Copy>
                This is a secure 256-bit SSL encrypted credit card field.
              </Copy>
            </Wrapper>

          </Row>
        </CardBody>


        <StripeForm
          {...this.props}
          address={this.props.address}
          renderBillingAddress={()=>{
            return <BillingAddress {...this.props}/>
          }}
        />
      </Wrapper>
    );
  }

}

export default BillingCard;
