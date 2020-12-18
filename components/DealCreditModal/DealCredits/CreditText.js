import React, { Component } from 'react';
import { Wrapper, Copy, Bold } from 'app/NativeComponents/common';

import {
  /*common functions*/
  numberWithCommas,
  renderPrice
} from 'app/NativeActions';

class CreditText extends Component{

  renderDealCreditText(){
    const deal_credits = this.props.deal_credits;
    if(deal_credits.deal_credits_remaining.cents > 0){
      return(
        <Copy style={{textAlign: "center"}}>
          You have <Bold>{renderPrice(deal_credits.deal_credits_remaining.cents)}</Bold> remaining.
        </Copy>
      );
    }else{
      return(
        <Copy style={{textAlign: "center"}}>
          You have <Bold>$0.00</Bold> remaining.
        </Copy>
      );
    }
  }

  renderUsedCreditsText(){
    const deal_credits = this.props.deal_credits;
    if(deal_credits.total_mailers_queued.pretty > 0){
      return(
        <Copy style={{textAlign: "center"}}>
          <Bold>{numberWithCommas(parseInt(deal_credits.total_mailers_queued.pretty))}</Bold> {parseInt(deal_credits.total_mailers_queued.pretty) == 1 ? " mailer is" : " mailers are"} in the send queue.
        </Copy>
      )
    }
  }

  renderMissingPaymentText(){
    const deal_credits = this.props.deal_credits;
    if(deal_credits.deal_credits_remaining.cents < 0){
      return(
        <Copy style={{textAlign: "center"}}>
          <Bold>{renderPrice(parseInt(Math.abs(deal_credits.deal_credits_remaining.cents)))}</Bold> are owed.
        </Copy>
      )
    }
  }

  renderChargeAmount(){

    const deal_credits = this.props.deal_credits;
    var deal_credit_amount = 0;

    if(deal_credits.deal_credits_remaining.cents <= 0 && deal_credits.total_deal_credits_queued.cents <= 0){
      //at 0 and no dealcredits have been queued up
      return(
        <Copy style={{textAlign: "center"}}>
          You will automatically be charged <Bold>{renderPrice(deal_credits.default_credit_reload.cents)}</Bold> to add <Bold>{renderPrice(deal_credits.default_credit_reload.cents)}</Bold> to your account when you attempt to spend your DealCredit.
        </Copy>
      )
    }else if((deal_credits.deal_credits_remaining.cents <= 0 || deal_credits.total_deal_credits_queued.cents > deal_credits.deal_credits_remaining.cents) && deal_credits.total_deal_credits_queued.cents > 0){

      //at 0 and 1 or more dealcredits in queue

      var total_reload_amount = 1;

      if(deal_credits.total_deal_credits_queued.cents > deal_credits.deal_credits_remaining.cents && deal_credits.deal_credits_remaining.cents != 0){
        var actual_queued = deal_credits.total_deal_credits_queued.cents - deal_credits.deal_credits_remaining.cents;
        var total_charges = parseInt(actual_queued)/parseInt(deal_credits.default_credit_reload.cents);
        total_reload_amount = Math.ceil(parseFloat(total_charges));
      }else{
        var total_charges = parseInt(deal_credits.total_deal_credits_queued.cents)/parseInt(deal_credits.default_credit_reload.cents);
        total_reload_amount = Math.ceil(parseFloat(total_charges));
      }

      return(
        <Copy style={{textAlign: "center"}}>
          You will automatically be charged <Bold>{renderPrice(deal_credits.default_credit_reload.cents*total_reload_amount)}</Bold> to add <Bold>{renderPrice(deal_credits.default_credit_reload.cents*total_reload_amount)}</Bold> to your account when your mailers are sent.
        </Copy>
      )
    }

  }

  render(){

    return (
      <Wrapper>
        {this.renderDealCreditText()}
        {this.renderUsedCreditsText()}
        {this.renderMissingPaymentText()}

        {this.renderChargeAmount()}
      </Wrapper>
    )
  }

}

export default CreditText;
