import React, { Component } from 'react';
import { ToggleSwitch } from 'app/NativeComponents/snippets';

class RepeatLimitSwitch extends Component{

  render(){
    if(this.props.select_default_sending_options){

      return(
        <ToggleSwitch
          value={this.props.editUser.default_resend_limit_switch == "on" ? true : false}
          onChange={value => {
            this.props.updateUserFieldChange({ prop: "default_resend_limit_switch", value: value == true ? "on" : "off" })
            this.props.updateUserFieldChange({ prop: "default_resend_limit", value: value == true ? 0 : 12 })
          }}
          title={"Repeat Forever?"}
          text={"Send repeating mail forever or set a limit for how many times you want to send. This will be the default setting for every new deal for the team."}
        />
      );

    }

    return(
      <ToggleSwitch
        value={this.props.editHouse.resend_limit_switch == "on" ? true : false}
        onChange={value => {
          this.props.editHouseFieldChange({ prop: "resend_limit_switch", value: value == true ? "on" : "off" })
          this.props.editHouseFieldChange({ prop: "resend_limit", value: value == true ? 0 : 12 })
        }}
        title={"Repeat Forever?"}
        text={"Send repeating mail forever or set a limit for how many times you want to send."}
      />
    );
  }

}

export default RepeatLimitSwitch;
