import React, { Component } from 'react';
import { ToggleSwitch } from 'app/NativeComponents/snippets';

class RepeatFreqSwitch extends Component{

  render(){
    if(this.props.select_default_sending_options){
      return(
        <ToggleSwitch
          onChange={value => {
            this.props.updateUserFieldChange({ prop: "default_resend_freq_switch", value: value == true ? "on" : "off" })
            this.props.updateUserFieldChange({ prop: "default_resend_freq", value: value == true ? 21 : 0 })
          }}
          value={this.props.editUser.default_resend_freq_switch == "on" ? true : false}
          title={"Send Repeating Mail?"}
          text={"This will set the default for repeating mail for all new deals added for the team."}
        />
      );

    }

    return(
      <ToggleSwitch
        onChange={value => {
          this.props.editHouseFieldChange({ prop: "resend_freq_switch", value: value == true ? "on" : "off" })
          this.props.editHouseFieldChange({ prop: "resend_freq", value: value == true ? 21 : 0 })
        }}
        value={this.props.editHouse.resend_freq_switch == "on" ? true : false}
        title={"Send Repeating Mail?"}
        text={"This will send follow up mail to the property owner based on your selected preference."}
      />
    );
  }

}

export default RepeatFreqSwitch;
