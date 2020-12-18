import React, { Component } from 'react';
import {
  Wrapper,
  CardBody,
  Row,
  Title,
  Copy,
  Icon,
  Card
} from 'app/NativeComponents/common';

import RefundedText from './RefundedText';

import { renderDate, renderPrice } from 'app/NativeActions';

class Invoice extends Component{

  renderDescription(description){
    if(description && description != ""){
      return <Copy>{description}</Copy>;
    }
  }
  render(){

    var deal_credits_text = this.props.invoice.total_cents_paid && this.props.invoice.total_cents_paid != 0 ? renderPrice(this.props.invoice.total_cents_paid) + " added to your account." : renderPrice(this.props.invoice.deal_credit_cents) + " added to your account.";

    var invoice_date_created = renderDate(this.props.invoice.date_created);
    var invoice_title = "";
    var invoice_description = "";
    var invoice_icon = "";
    var invoice_fa_icon = "";
    switch(this.props.invoice.item){
      case "deal_credits":
      case "automated_deal_marketing":
      default:


        switch(this.props.invoice.payment_type){

          case "stripe":
          default:

            invoice_title = "Purchased: "+deal_credits_text;
            invoice_description = renderPrice(this.props.invoice.total_cents_paid);
            invoice_icon = "payment";

          break;

          case "reload":
            invoice_title = "Automatically Reloaded: "+deal_credits_text;
            invoice_description = renderPrice(this.props.invoice.total_cents_paid);
            invoice_fa_icon = "refresh";

          break;

          case "gift":

            switch(this.props.invoice.token){
              case "signup_api":
              default:
                invoice_title = "Signup Gift: "+deal_credits_text;
                invoice_description = "Thanks for signing up for DealMachine!";
                invoice_fa_icon = "gift";
              break;

              case "signup_bonus":
              case "email_promo":
                invoice_title = "Email Promo: "+deal_credits_text;
                invoice_description = "An extra gift just for you!";
                invoice_icon = "star";

              break;

              case "customer_support":
              case "customer_service":
                invoice_title = "Customer Service: "+deal_credits_text;
                invoice_description = "";
                invoice_icon = "face";
              break;
            }

          break;

          case "invite_promo":
          case "promo":

            invoice_title = "Promo Code: "+this.props.invoice.token+ " " + deal_credits_text;
            invoice_description = "You used promo code "+this.props.invoice.token;
            invoice_fa_icon = "tag";


          break;

          case "invited_user":
            invoice_title = "Shared Promo Code: "+this.props.invoice.token;
            invoice_description = "You shared you promo code with a friend.";
            invoice_icon = "share";
          break;

        }

      break;

      case "tier_1_plan":

        invoice_title = "DealMachine Engine";
        if(!this.props.invoice.total_cents_paid){
          //temp fix until database is updated
          invoice_description = renderPrice(this.props.invoice.deal_credits);
        }else{
          invoice_description = renderPrice(this.props.invoice.total_cents_paid);
        }
        invoice_icon = "history";


      break;

      case "plan_purchase":

        invoice_title = "DealMachine Engine Purchase";
        invoice_description = renderPrice(this.props.invoice.total_cents_paid);
        invoice_icon = "add-circle";

      break;

      case "addon_purchase":

        invoice_title = "Additional Product Purchase";
        invoice_description = renderPrice(this.props.invoice.total_cents_paid);
        invoice_icon = "add-circle";

        switch(this.props.invoice.payment_type){

          case "promo":
          case "invite_promo":
            invoice_title = "Promo Code: Additional Product";
            invoice_description = "You used promo code "+this.props.invoice.token;
            invoice_fa_icon = "tag";
            invoice_icon = null;
          break;

        }

      break;

      case "custom_charge":

        invoice_title = "Custom Charge";
        invoice_description = renderPrice(this.props.invoice.total_cents_paid);
        invoice_icon = "attach-money";


      break;
    }

    return (
      <CardBody>
        <Row>
          <Icon
            icon={invoice_icon}
            fa_icon={invoice_fa_icon}
            size={26}
            style={{
              marginRight: 10
            }}
          />
          <Wrapper style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1
          }}>
            <Title>{invoice_title}</Title>
            {this.renderDescription(invoice_description)}
            <Copy style={{color: this.props.colors.light_text_color}}>{invoice_date_created}</Copy>

            <RefundedText invoice = {this.props.invoice}/>

          </Wrapper>
        </Row>


      </CardBody>
    );

  }

}

export default Invoice;
