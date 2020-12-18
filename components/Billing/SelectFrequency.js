import React, { Component } from 'react';
import {
  Card,
  Copy
} from 'app/NativeComponents/common';
import {
  ToggleSwitch
} from 'app/NativeComponents/snippets';

import {
  renderPrice
} from 'app/NativeActions';

class SelectFrequency extends Component{

  render(){

    var monthly_price = 0;
    if(this.props.selected_plan){
      for(var i = 0; i<this.props.stats.plans.length; i++){
        if(this.props.stats.plans[i].id == this.props.selected_plan.id){
          monthly_price = this.props.stats.plans[i].monthly_cost_cents;
        }
      }
    }

    var regular_annaul_price = monthly_price*12;
    var discounted_annual_price = regular_annaul_price*.833333333333333333;
    discounted_annual_price = parseInt(discounted_annual_price);

    return (
      <Card>
        <ToggleSwitch
          onChange={value => {
            this.props.togglePlanFrequency(value == true ? "annually" : "monthly")

            //get price annually or yearly
            var price = this.props.price;
            for(var i = 0; i<this.props.stats.plans.length; i++){
              if(this.props.stats.plans[i].id == this.props.selected_plan.id){
                if(value == true || this.props.selected_plan.enterprise == 1){
                  price = this.props.stats.plans[i].yearly_cost_cents;
                }else{
                  price = this.props.stats.plans[i].monthly_cost_cents;
                }
              }
            }

            this.props.selectPlan({
              selected_plan: this.props.selected_plan,
              frequency: value == true ? "annually" : "monthly",
              price: price
            });
          }}
          value={this.props.frequency == "annually" || this.props.selected_plan.enterprise == 1 ? true : false}
          title={"Save 17% & Pay Annually?"}
          textComponents={()=>{
            if(this.props.frequency == "annually" || this.props.selected_plan.enterprise == 1){
              return (
                <Copy>
                  Awesome! <Copy style={this.props.device == "desktop" ? {
                    textDecoration: 'line-through'
                  } : {
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid'
                  }}>{renderPrice(monthly_price)}/mo x 12 months = {renderPrice(regular_annaul_price)}</Copy> You pay {renderPrice(discounted_annual_price)}!
                </Copy>
              );
            }
            return <Copy>Get 2 months free by paying annually! You will not be charged until after your 14 day free trial.</Copy>;
          }}
        />
      </Card>
    );
  }

}

export default SelectFrequency;
