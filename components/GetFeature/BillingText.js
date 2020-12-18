import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import {
  renderPrice
} from 'app/NativeActions';

class BillingText extends Component{

  renderDealCreditPrice(){
    if(this.props.current_plan_module_coupon){
      if(
        this.props.current_plan_module_coupon.is_valid == 1 &&
        this.props.selected_plan.exclude_coupon != 1
      ){

        if(parseInt(this.props.current_plan_module_coupon.dealcredit_price) < parseInt(this.props.selected_plan.additional_price) && parseInt(this.props.current_plan_module_coupon.dealcredit_price) != 0){
          return(
            <Copy style={{
              marginBottom: 10,
              textAlign: "left"
            }}>
              With your promo code <Bold>{this.props.current_plan_module_coupon.promo}</Bold> you get postcards for <Bold>{renderPrice(this.props.current_plan_module_coupon.dealcredit_price)}</Bold>.
            </Copy>
          )
        }

      }
    }

  }

  renderFreeTrial(){
    if(this.props.current_plan_module_coupon){
      if(
        this.props.current_plan_module_coupon.is_valid == 1 &&
        this.props.selected_plan.exclude_coupon != 1
      ){

        if(parseInt(this.props.current_plan_module_coupon.extra_trial_days) > parseInt(this.props.selected_plan.trial_length_days)){
          return(
            <Copy style={{
              marginBottom: 10,
              textAlign: "left"
            }}>
              With your promo code <Bold>{this.props.current_plan_module_coupon.promo}</Bold> you get an extended <Bold>{this.props.current_plan_module_coupon.extra_trial_days} day</Bold> free trial.
            </Copy>
          )
        }

      }
    }

  }

  render(){

    if(this.props.current_plan_module_coupon && this.props.selected_plan){
      if(
        this.props.current_plan_module_coupon.is_valid == 1 &&
        this.props.selected_plan.exclude_coupon != 1
      ){

        if(this.props.frequency == "monthly" &&
          (
            (this.props.current_plan_module_coupon.basic_amount_off_monthly > 0 && parseInt(this.props.selected_plan.tier) == 1) ||
            (this.props.current_plan_module_coupon.professional_amount_off_monthly > 0 && parseInt(this.props.selected_plan.tier) == 2) ||
            (this.props.current_plan_module_coupon.enterprise_amount_off_monthly > 0 && parseInt(this.props.selected_plan.tier) >= 3)
          )
        ){

          let time_text = ".";
          if(this.props.current_plan_module_coupon.months_length == -1){
            time_text = " every month.";
          }else if(this.props.current_plan_module_coupon.months_length == 1){
            time_text = " for 1 month total (based on the date you signed up).";
          }else if(this.props.current_plan_module_coupon.months_length > 0){
            time_text = " for "+this.props.current_plan_module_coupon.months_length+" months total (based on the date you signed up).";
          }

          let discounted_price;
          let amount_off;
          //determine price from tier
          switch(parseInt(this.props.selected_plan.tier)){
            case 1:
            default:
              discounted_price = renderPrice(this.props.selected_plan.monthly_cost_cents - this.props.current_plan_module_coupon.basic_amount_off_monthly);
              amount_off = renderPrice(this.props.current_plan_module_coupon.basic_amount_off_monthly);
            break;

            case 2:
              discounted_price = renderPrice(this.props.selected_plan.monthly_cost_cents - this.props.current_plan_module_coupon.professional_amount_off_monthly);
              amount_off = renderPrice(this.props.current_plan_module_coupon.professional_amount_off_monthly);
            break;

            case 3:
              discounted_price = renderPrice(this.props.selected_plan.monthly_cost_cents - this.props.current_plan_module_coupon.enterprise_amount_off_monthly);
              amount_off = renderPrice(this.props.current_plan_module_coupon.enterprise_amount_off_monthly);

            break;
          }

          if(this.props.selected_plan.commitment_length_months > 0){

            return (
              <Wrapper style={{flex:1, alignSelf: "stretch"}}>
                <CardBody style={{paddingTop: 10, paddingBottom:10}}>
                  <Copy style={{
                    marginBottom: 10,
                    textAlign: "left"
                  }}>
                    With your promo code <Bold>{this.props.current_plan_module_coupon.promo}</Bold> you get <Bold>{amount_off}</Bold> off{time_text}
                  </Copy>
                  {this.renderDealCreditPrice()}
                  {this.renderFreeTrial()}
                  <Copy >
                    Your account will be charged <Bold>{discounted_price}</Bold> upon selecting this plan. This is a {this.props.selected_plan.commitment_length_months} month commitment.
                  </Copy>
                </CardBody>
              </Wrapper>
            );
          }


          return(
            <Wrapper style={{flex:1, alignSelf: "stretch"}}>
              <CardBody style={{paddingTop: 10, paddingBottom:10}}>
                <Copy style={{
                  marginBottom: 10,
                  textAlign: "left"
                }}>
                  With your promo code <Bold>{this.props.current_plan_module_coupon.promo}</Bold> you get <Bold>{amount_off}</Bold> off{time_text}
                </Copy>
                {this.renderDealCreditPrice()}
                {this.renderFreeTrial()}

                <Copy >
                Your account will not be charged <Bold>{discounted_price}</Bold> until after your {parseInt(this.props.current_plan_module_coupon.extra_trial_days) > parseInt(this.props.selected_plan.trial_length_days) ? this.props.current_plan_module_coupon.extra_trial_days : this.props.selected_plan.trial_length_days} day free trial. You can cancel this at anytime.
                </Copy>
              </CardBody>
            </Wrapper>
          )

        }


        if(this.props.frequency == "annually" &&
          (
            (this.props.current_plan_module_coupon.basic_amount_off_yearly > 0 && parseInt(this.props.selected_plan.tier) == 1) ||
            (this.props.current_plan_module_coupon.professional_amount_off_yearly > 0 && parseInt(this.props.selected_plan.tier) == 2) ||
            (this.props.current_plan_module_coupon.enterprise_amount_off_yearly> 0 && parseInt(this.props.selected_plan.tier) >= 3)
          )
        ){

          let discounted_price;
          let amount_off;
          //determine price from tier
          switch(parseInt(this.props.selected_plan.tier)){
            case 1:
            default:
              discounted_price = renderPrice(this.props.selected_plan.yearly_cost_cents - this.props.current_plan_module_coupon.basic_amount_off_yearly);
              amount_off = renderPrice(this.props.current_plan_module_coupon.basic_amount_off_yearly);

            break;

            case 2:
              discounted_price = renderPrice(this.props.selected_plan.yearly_cost_cents - this.props.current_plan_module_coupon.professional_amount_off_yearly);
              amount_off = renderPrice(this.props.current_plan_module_coupon.professional_amount_off_yearly);

            break;

            case 3:
              discounted_price = renderPrice(this.props.selected_plan.yearly_cost_cents - this.props.current_plan_module_coupon.enterprise_amount_off_yearly);
              amount_off = renderPrice(this.props.current_plan_module_coupon.enterprise_amount_off_yearly);

            break;
          }

          if(this.props.selected_plan.commitment_length_months > 0){
            return (
              <Wrapper style={{flex:1, alignSelf: "stretch"}}>
                <CardBody style={{paddingTop: 10, paddingBottom:10}}>
                  <Copy style={{
                    marginBottom: 10,
                    textAlign: "left"
                  }}>
                    With your promo code <Bold>{this.props.current_plan_module_coupon.promo}</Bold> you get <Bold>{amount_off}</Bold> off every year.
                  </Copy>
                  {this.renderDealCreditPrice()}

                  <Copy >
                    Your account will be charged <Bold>{discounted_price}</Bold> upon selecting this plan. This is a {this.props.selected_plan.commitment_length_months} month commitment.
                  </Copy>
                </CardBody>
              </Wrapper>
            );
          }

          return(
            <Wrapper style={{flex:1, alignSelf: "stretch"}}>
              <CardBody style={{paddingTop: 10, paddingBottom:10}}>
                <Copy style={{
                  marginBottom: 10,
                  textAlign: "left"
                }}>
                  With your promo code <Bold>{this.props.current_plan_module_coupon.promo}</Bold> you get <Bold>{amount_off}</Bold> off every year.
                </Copy>
                {this.renderDealCreditPrice()}
                {this.renderFreeTrial()}

                <Copy >
                Your account will not be charged <Bold>{discounted_price}</Bold> until after your {parseInt(this.props.current_plan_module_coupon.extra_trial_days) > parseInt(this.props.selected_plan.trial_length_days) ? this.props.current_plan_module_coupon.extra_trial_days : this.props.selected_plan.trial_length_days} day free trial. You can cancel this at anytime.
                </Copy>
              </CardBody>
            </Wrapper>
          )

        }

        if(this.props.selected_plan.commitment_length_months > 0){
          return (
            <Wrapper style={{flex:1, alignSelf: "stretch"}}>
              <CardBody style={{paddingTop: 10, paddingBottom:10}}>
                {this.renderDealCreditPrice()}

                <Copy >
                  Your account will be charged <Bold>{this.props.frequency === "annually" ? renderPrice(this.props.selected_plan.yearly_cost_cents) : renderPrice(this.props.selected_plan.monthly_cost_cents)}</Bold> upon selecting this plan. This is a {this.props.selected_plan.commitment_length_months} month commitment.
                </Copy>
              </CardBody>
            </Wrapper>
          );
        }


        return(
          <Wrapper style={{flex:1, alignSelf: "stretch"}}>
            <CardBody style={{paddingTop: 10, paddingBottom:10}}>
              {this.renderDealCreditPrice()}
              {this.renderFreeTrial()}

              <Copy >
              Your account will not be charged <Bold>{this.props.frequency === "annually" ? renderPrice(this.props.selected_plan.yearly_cost_cents) : renderPrice(this.props.selected_plan.monthly_cost_cents)}</Bold> until after your {parseInt(this.props.current_plan_module_coupon.extra_trial_days) > parseInt(this.props.selected_plan.trial_length_days) ? this.props.current_plan_module_coupon.extra_trial_days : this.props.selected_plan.trial_length_days} day free trial. You can cancel this at anytime.
              </Copy>
            </CardBody>
          </Wrapper>
        )


      }

    }

    if(this.props.selected_plan){
      if(this.props.selected_plan.trial_length_days > 0){

        return (
          <Wrapper style={{flex:1, alignSelf: "stretch"}}>
            <CardBody style={{paddingTop: 10, paddingBottom:10}}>
              <Copy >
                Your account will not be charged <Bold>{this.props.frequency === "annually" ? renderPrice(this.props.selected_plan.yearly_cost_cents) : renderPrice(this.props.selected_plan.monthly_cost_cents)}</Bold> until after your {this.props.selected_plan.trial_length_days} day free trial. You can cancel this at anytime.
              </Copy>
            </CardBody>

          </Wrapper>
        );
      }else if(this.props.selected_plan.commitment_length_months > 0){
        return (
          <Wrapper style={{flex:1, alignSelf: "stretch"}}>
            <CardBody style={{paddingTop: 10, paddingBottom:10}}>
              <Copy >
                Your account will be charged <Bold>{renderPrice(this.props.selected_plan.yearly_cost_cents)}</Bold> upon selecting this plan. This is a {this.props.selected_plan.commitment_length_months} month commitment.
              </Copy>
            </CardBody>
          </Wrapper>
        );
      }


      return (
        <Wrapper style={{flex:1, alignSelf: "stretch"}}>
          <CardBody style={{paddingTop: 10, paddingBottom:10}}>
            <Copy >
              Your account will be charged <Bold>{this.props.frequency === "annually" ? renderPrice(this.props.selected_plan.yearly_cost_cents) : renderPrice(this.props.selected_plan.monthly_cost_cents)}</Bold> upon selecting this plan. You can cancel this at anytime.
            </Copy>
          </CardBody>

        </Wrapper>
      );
    }

    return <Wrapper />

  }

}

export default BillingText;
