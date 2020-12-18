import React, { Component } from 'react';

import {
  Wrapper,
  Card,
  Row,
  Copy
} from 'app/NativeComponents/common';
import {
  ToggleSwitch
} from 'app/NativeComponents/snippets';

import moment from 'moment';

import {
  checkIfUserHasModule
} from "app/NativeActions";

class SmartListToggle extends Component{

  constructor(props){
    super(props);

    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "lists"})
    this.state = {
      plan_module_info: plan_module_info
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.user && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules || this.props.user.plan_modules !== prevProps.user.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.user, slug: "lists"});
        this.setState({plan_module_info: plan_module_info})
      }
    }
  }

  renderLastBuiltDate(){
    return "Your smart list was last built on "+moment(this.props.active_list.last_built).format("MMM Do")+". We rebuild smart lists every week when we get new data.";
  }

  render(){
    if(this.props.edit_active_list.list_type == "build_list" && this.state.plan_module_info.has_module){
      return(
        <Card>
          <ToggleSwitch
            value={this.props.edit_active_list.smart_list == 1 ? true : false}
            onChange={value => {
              if(this.props.active_list.building != 1){
                this.props.editActiveList({ prop: "smart_list", value: value == true ? 1 : 0 })
              }
            }}
            title={"Smart List"}
            text={"Regular lists become outdated the moment you pull them.. Smart lists stay in sync with sellers’ situations on a weekly basis. If a home no longer fits your list criteria, we automatically remove the lead from your list and your CRM so you stay focused on the leads that matter most. "+this.renderLastBuiltDate()}
          />
        </Card>
      )
    }

    return <Wrapper />;
  }

}

export default SmartListToggle;
