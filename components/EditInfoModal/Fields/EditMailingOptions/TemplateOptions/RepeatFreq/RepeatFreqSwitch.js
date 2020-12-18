import React, { Component } from 'react';
import { ToggleSwitch } from 'app/NativeComponents/snippets';

class RepeatFreqSwitch extends Component{

  render(){
    return(
      <ToggleSwitch
        onChange={value => {
          this.props.updateField({ prop: "resend_freq", value: 21 })
          this.props.updateField({ prop: "resend_freq_switch", value: value === true ? "on" : "off" })
        }}
        value={this.props.fields.resend_freq_switch === "on" ? true : false}
        title={"Send Repeating Mail?"}
        text={"This will send follow up mail to the property owner based on your selected preference."}
      />
    );
  }

}

export default RepeatFreqSwitch;
