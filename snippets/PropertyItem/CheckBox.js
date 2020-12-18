import React, { Component } from 'react';

import {
  Button,
  Icon
} from 'app/NativeComponents/common';

/*
import {
} from 'app/NativeActions';
*/

class Checkbox extends Component {

  constructor(props){
    super(props);

    this.state = {
      checked: false
    }
  }

  toggleCheckBox(toggle){
    this.setState({
      checked: toggle
    })
  }

  isChecked(){

    if(this.props.selected_all){
      return true
    }

    for(let i = 0; i<this.props.selected_leads.length; i++){
      if(this.props.selected_leads[i].property_id === this.props.property.property_id){
        return true;
      }
    }

    return false;
  }

  render() {

    return (
      <Button
        onPress={()=>{
          this.props.checkLead(this.props.property)
        }}
        style={{
          margin: 12,
          width: 40,
          height: 40,

          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          textAlign: "center"

        }}
      >
        <Icon
          icon={this.isChecked() ? "check-box" : "check-box-outline-blank"}
          size={22}
        />
      </Button>
    );
  }
}



export default Checkbox;
