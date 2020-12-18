import React, { Component } from 'react';
import { ToggleSwitch } from 'app/NativeComponents/snippets';

class RepeatLimitSwitch extends Component{

  render(){

    return(
      <ToggleSwitch
        value={this.props.fields.resend_limit_switch === "on" ? true : false}
        onChange={value => {
          this.props.updateField({ prop: "resend_limit", value: value === true ? 0 : 12 })
          this.props.updateField({ prop: "resend_limit_switch", value: value === true ? "on" : "off" })
        }}
        title={"Repeat Forever?"}
        text={"Send repeating mail forever or set a limit for how many times you want to send."}
      />
    );
  }

}

export default RepeatLimitSwitch;
