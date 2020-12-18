import React, { Component } from 'react';

import {
  Wrapper,
  Title,
  Card,
  Bold,
  Gradient,
  Copy
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';


import{
  renderPrice,
  numberWithCommas
} from 'app/NativeActions';


class Plan extends Component {

  checkIfSelected(plan){
    if(this.props.selected_plan){
      if(this.props.selected_plan.id === plan.id){
        return true;
      }
    }

    return false;
  }

  renderTitle(plan){
    switch(parseInt(plan.tier)){
      case 1:
      default:
        return "Basic"
      break;

      case 2:
        return "Professional"
      break;

      case 3:
        return "Enterprise"
      break;
    }
  }
  render() {


    switch(this.props.plan.module_type){
      case "driving":

        if(this.checkIfSelected(this.props.plan)){
          return(
            <Wrapper className="plan-item" style={{alignSelf: "stretch"}}>
              <Card >
                <Gradient
                  style={this.props.isMobile ? {
                    borderRadius: 5
                  } : {
                    borderRadius: 5,
                    flex: 1
                  }}
                  color1={this.props.colors.gradient_button_color_1}
                  color2={this.props.colors.gradient_button_color_2}
                >
                  <Wrapper style={{padding: 20, paddingBottom: 0}}>
                    <Title style={{textAlign: "center", color: this.props.colors.white_text_color}}>{this.renderTitle(this.props.plan)}</Title>
                    <Copy style={{textAlign: "center", fontSize: 42, paddingTop: 20, paddingBottom:20, color: this.props.colors.white_text_color}}>
                      <Bold>{this.props.frequency === "annually" || this.props.plan.enterprise == 1 ? renderPrice(this.props.plan.yearly_cost_cents, "no_decimal") : renderPrice(this.props.plan.monthly_cost_cents, "no_decimal")}</Bold>
                    </Copy>
                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>{this.props.frequency === "annually" || this.props.plan.enterprise == 1 ? "Per Year" : "Per Month"}</Copy>

                  </Wrapper>

                  <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20, paddingTop: 0, paddingBottom: 0}}>
                    <PillButton onPress={()=>{

                      this.props.selectPlan({
                        selected_plan: this.props.plan,
                        frequency: this.props.frequency
                      })
                    }} primary={false}>
                      {"Selected"}
                    </PillButton>
                  </Wrapper>

                  <Wrapper style={{padding: 20}}>

                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}> {numberWithCommas(this.props.plan.number_of_leads)} leads per month </Copy>
                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>Unlock <Bold>{renderPrice(this.props.plan.additional_price)}</Bold> Mailer Pricing</Copy>
                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>Unlock <Bold>{renderPrice(this.props.plan.enhanced_search_price)}</Bold> Skip Trace Pricing</Copy>
                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>{parseInt(this.props.plan.teammate_limit) === 1 ? "1 Full-Access User" : parseInt(this.props.plan.teammate_limit)+" Full-Access Users"} </Copy>
                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>{parseInt(this.props.plan.dealfinder_limit) === 1 ? "1 DealFinder" : parseInt(this.props.plan.dealfinder_limit)+" DealFinders"} </Copy>

                    {
                      this.props.plan.features ? this.props.plan.features.map((item, i)=>{
                        return(
                          <Copy key={i} style={{textAlign: "center", color: this.props.colors.white_text_color}}>
                            {item}
                          </Copy>
                        )
                      }) : ""
                    }

                  </Wrapper>

                </Gradient>
              </Card>
            </Wrapper>
          )
        }

        return(
          <Wrapper className="plan-item" style={{alignSelf: "stretch"}}>
            <Card >
              <Gradient
                style={this.props.isMobile ? {
                  borderRadius: 5
                } : {
                  borderRadius: 5,
                  flex: 1
                }}
                color1={this.props.colors.card_color}
                color2={this.props.colors.card_color}
              >
                <Wrapper style={{padding: 20, paddingBottom: 0}}>
                  <Title style={{textAlign: "center", color: this.props.colors.text_color}}>{this.renderTitle(this.props.plan)}</Title>
                  <Copy style={{textAlign: "center", fontSize: 42, paddingTop: 20, paddingBottom:20, color: this.props.colors.active_color}}>
                    <Bold>{this.props.frequency === "annually" || this.props.plan.enterprise == 1 ? renderPrice(this.props.plan.yearly_cost_cents, "no_decimal") : renderPrice(this.props.plan.monthly_cost_cents, "no_decimal")}</Bold>
                  </Copy>
                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>{this.props.frequency === "annually" || this.props.plan.enterprise == 1 ? "Per Year" : "Per Month"}</Copy>

                </Wrapper>

                <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20, paddingTop: 0, paddingBottom: 0}}>
                  <PillButton onPress={()=>{

                    this.props.selectPlan({
                      selected_plan: this.props.plan,
                      frequency: this.props.frequency
                    })
                  }} primary={false}>
                    {this.props.plan_module_info.has_module ? "Select Plan" : "Try For Free"}
                  </PillButton>
                </Wrapper>

                <Wrapper style={{padding: 20}}>

                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}> {numberWithCommas(this.props.plan.number_of_leads)} leads per month </Copy>

                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>Unlock <Bold>{renderPrice(this.props.plan.additional_price)}</Bold> Mailer Pricing</Copy>
                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>Unlock <Bold>{renderPrice(this.props.plan.enhanced_search_price)}</Bold> Skip Trace Pricing</Copy>

                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>{parseInt(this.props.plan.teammate_limit) === 1 ? "1 Full-Access User" : parseInt(this.props.plan.teammate_limit)+" Full-Access Users"} </Copy>
                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>{parseInt(this.props.plan.dealfinder_limit) === 1 ? "1 DealFinder" : parseInt(this.props.plan.dealfinder_limit)+" DealFinders"} </Copy>

                  {
                    this.props.plan.features ? this.props.plan.features.map((item, i)=>{
                      return(
                        <Copy key={i} style={{textAlign: "center", color: this.props.colors.text_color}}>
                          {item}
                        </Copy>
                      )
                    }) : ""
                  }

                </Wrapper>

              </Gradient>
            </Card>
          </Wrapper>
        )
      break;

      case "lists":

        if(this.checkIfSelected(this.props.plan)){
          return(
            <Wrapper className="plan-item" style={{alignSelf: "stretch"}}>
              <Card >
                <Gradient
                  style={this.props.isMobile ? {
                    borderRadius: 5
                  } : {
                    borderRadius: 5,
                    flex: 1
                  }}
                  color1={this.props.colors.gradient_button_color_1}
                  color2={this.props.colors.gradient_button_color_2}
                >
                  <Wrapper style={{padding: 20, paddingBottom: 0}}>
                    <Title style={{textAlign: "center", color: this.props.colors.white_text_color}}>{this.renderTitle(this.props.plan)}</Title>
                    <Copy style={{textAlign: "center", fontSize: 42, paddingTop: 20, paddingBottom:20, color: this.props.colors.white_text_color}}>
                      <Bold>{this.props.frequency === "annually" || this.props.plan.enterprise == 1 ? renderPrice(this.props.plan.yearly_cost_cents, "no_decimal") : renderPrice(this.props.plan.monthly_cost_cents, "no_decimal")}</Bold>
                    </Copy>
                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>{this.props.frequency === "annually" || this.props.plan.enterprise == 1 ? "Per Year" : "Per Month"}</Copy>

                  </Wrapper>

                  <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20, paddingTop: 0, paddingBottom: 0}}>
                    <PillButton onPress={()=>{

                      this.props.selectPlan({
                        selected_plan: this.props.plan,
                        frequency: this.props.frequency
                      })
                    }} primary={false}>
                      {"Selected"}
                    </PillButton>
                  </Wrapper>

                  <Wrapper style={{padding: 20}}>

                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>
                    {this.props.plan.number_of_leads == -1 ? "Unlimited lists per month" :
                      this.props.plan.number_of_leads == 1 ? "1 list type per month" : this.props.plan.number_of_leads+" list types per month"}</Copy>

                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>Unlock <Bold>{renderPrice(this.props.plan.additional_price)}</Bold> Mailer Pricing</Copy>
                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>Unlock <Bold>{renderPrice(this.props.plan.enhanced_search_price)}</Bold> Skip Trace Pricing</Copy>

                    <Copy style={{textAlign: "center", color: this.props.colors.white_text_color}}>{parseInt(this.props.plan.teammate_limit) === 1 ? "1 Full-Access User" : parseInt(this.props.plan.teammate_limit)+" Full-Access Users"} </Copy>
                    {
                      this.props.plan.features ? this.props.plan.features.map((item, i)=>{
                        return(
                          <Copy key={i} style={{textAlign: "center", color: this.props.colors.white_text_color}}>
                            {item}
                          </Copy>
                        )
                      }) : ""
                    }

                  </Wrapper>

                </Gradient>
              </Card>
            </Wrapper>
          )
        }

        return(
          <Wrapper className="plan-item" style={{alignSelf: "stretch"}}>
            <Card >
              <Gradient
                style={this.props.isMobile ? {
                  borderRadius: 5
                } : {
                  borderRadius: 5,
                  flex: 1
                }}
                color1={this.props.colors.card_color}
                color2={this.props.colors.card_color}
              >
                <Wrapper style={{padding: 20, paddingBottom: 0}}>
                  <Title style={{textAlign: "center", color: this.props.colors.text_color}}>{this.renderTitle(this.props.plan)}</Title>
                  <Copy style={{textAlign: "center", fontSize: 42, paddingTop: 20, paddingBottom:20, color: this.props.colors.active_color}}>
                    <Bold>{this.props.frequency === "annually" || this.props.plan.enterprise == 1 ? renderPrice(this.props.plan.yearly_cost_cents, "no_decimal") : renderPrice(this.props.plan.monthly_cost_cents, "no_decimal")}</Bold>
                  </Copy>
                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>{this.props.frequency === "annually" || this.props.plan.enterprise == 1 ? "Per Year" : "Per Month"}</Copy>

                </Wrapper>

                <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20, paddingTop: 0, paddingBottom: 0}}>
                  <PillButton onPress={()=>{

                    this.props.selectPlan({
                      selected_plan: this.props.plan,
                      frequency: this.props.frequency
                    })
                  }} primary={false}>
                    {this.props.plan_module_info.has_module ? "Select Plan" : "Try For Free"}
                  </PillButton>
                </Wrapper>

                <Wrapper style={{padding: 20}}>

                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>
                  {this.props.plan.number_of_leads == -1 ? "Unlimited lists per month" :
                    this.props.plan.number_of_leads == 1 ? "1 list type per month" : this.props.plan.number_of_leads+" list types per month"}</Copy>

                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>Unlock <Bold>{renderPrice(this.props.plan.additional_price)}</Bold> Mailer Pricing</Copy>
                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>Unlock <Bold>{renderPrice(this.props.plan.enhanced_search_price)}</Bold> Skip Trace Pricing</Copy>

                  <Copy style={{textAlign: "center", color: this.props.colors.text_color}}>{parseInt(this.props.plan.teammate_limit) === 1 ? "1 Full-Access User" : parseInt(this.props.plan.teammate_limit)+" Full-Access Users"} </Copy>
                  {
                    this.props.plan.features ? this.props.plan.features.map((item, i)=>{
                      return(
                        <Copy key={i} style={{textAlign: "center", color: this.props.colors.text_color}}>
                          {item}
                        </Copy>
                      )
                    }) : ""
                  }

                </Wrapper>

              </Gradient>
            </Card>
          </Wrapper>
        )
      break;
    }

    return <Wrapper />
  }

}

export default Plan;
