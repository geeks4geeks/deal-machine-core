import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  Copy,
  Row
} from 'app/NativeComponents/common';
import {
  ToggleSwitch
} from 'app/NativeComponents/snippets';

import {
  renderPrice
} from 'app/NativeActions';

class AnnualSwitch extends Component{

  render(){
    if(this.props.selected_plan && this.props.plan_frequency != "annually" && this.props.plan_modules.length === 0){
      var monthly_price = 0;
      if(this.props.selected_plan){
        for(var i = 0; i<this.props.plans.length; i++){
          if(this.props.plans[i].id == this.props.selected_plan.id){
            monthly_price = this.props.plans[i].monthly_cost_cents;
          }
        }
      }

      var regular_annaul_price = monthly_price*12;
      var discounted_annual_price = regular_annaul_price*.833333333333333333;
      discounted_annual_price = parseInt(discounted_annual_price);

      return (
        <Wrapper style={{flex: 1, alignSelf: "stretch"}}>
          <ToggleSwitch

            onChange={value => {
              if(this.props.selected_plan.enterprise == 1){
                this.props.togglePlanFrequency("annually")
              }else{
                this.props.togglePlanFrequency(value == true ? "annually" : "monthly")
              }
            }}
            value={this.props.frequency == "annually" || this.props.selected_plan.enterprise == 1 ? true : false}
            title={"Save 17% & Pay Annually?"}
            textComponents={()=>{
              if(this.props.frequency == "annually" || this.props.selected_plan.enterprise == 1){
                return (
                  <Row style={{flexWrap: "wrap", alignItems: "flex-start", justifyContent: "flex-start"}}><Copy style={{marginRight: 5}}>
                    Awesome! </Copy><Copy style={this.props.device == "desktop" ? {
                      textDecoration: 'line-through',
                      marginRight: 5,
                    } : {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                      marginRight: 5
                    }}>{renderPrice(monthly_price)}/mo x 12 months = {renderPrice(regular_annaul_price)}</Copy><Copy > You pay {renderPrice(discounted_annual_price)}!
                  </Copy></Row>
                );
              }
              return <Copy>Get 2 months free by paying annually! You will not be charged until after your free trial.</Copy>;
            }}
          />
        </Wrapper>
      );
    }

    return <Wrapper />
  }

}

export default AnnualSwitch;
