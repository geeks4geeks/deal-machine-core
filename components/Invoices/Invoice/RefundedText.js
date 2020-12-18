import React, { Component } from 'react';
import { Wrapper, Copy, Bold } from 'app/NativeComponents/common';

import { renderDate, renderPrice } from 'app/NativeActions';

class RefundedText extends Component{


  render(){

    if(this.props.invoice.refunded == 1){

      var refunded_date_created = renderDate(this.props.invoice.refunded_date);
      var refunded_price = renderPrice(this.props.invoice.refunded_amount);
      var total_price = renderPrice(this.props.invoice.total_cents_paid);

      if(refunded_price == total_price){
        return(
          <Wrapper>
            <Copy>Refunded on {refunded_date_created}</Copy>
          </Wrapper>
        );
      }

      return(
        <Wrapper>
          <Copy>Refunded {refunded_price} of {total_price} on {refunded_date_created}</Copy>
        </Wrapper>
      );

    }

    return <Wrapper />

  }

}

export default RefundedText;
