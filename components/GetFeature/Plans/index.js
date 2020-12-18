import React, { Component } from 'react';

import {
  Wrapper,
  Spin,
  Row,
  Copy
} from 'app/NativeComponents/common';

import Plan from './Plan';

class Plans extends Component {


  render() {
    if(this.props.loading_plan_module_options){
      return(
        <Wrapper style={{alignItems: "center", justifyContent: "center", padding:20}}>
          <Row>
            <Spin size="small" />
            <Copy style={{marginLeft: 10}}>Loading...</Copy>
          </Row>
        </Wrapper>
      )
    }
    if(this.props.current_plan_module_options){
      if(this.props.current_plan_module_options.length > 0){
        return(
          <Wrapper className="plan-row" style={{alignItems: "flex-start", justifyContent: "center", alignSelf: "stretch"}}>
            {
                this.props.current_plan_module_options.map((plan, i)=>{
                  return(
                    <Plan
                      key={i}
                      plan={plan}
                      colors={this.props.colors}
                      plan_module_info={this.props.plan_module_info}
                      selectPlan={this.props.selectPlan}
                      togglePlanFrequency={this.props.togglePlanFrequency}
                      frequency={this.props.frequency}
                      selected_plan={this.props.selected_plan}
                    />
                  )
                })
            }


          </Wrapper>

        )
      }
    }

    return <Wrapper />;
  }

}

export default Plans;
