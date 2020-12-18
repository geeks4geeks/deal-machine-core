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

class StartMarketingToggle extends Component{

  render(){
    if(this.props.edit_active_list.list_type == "build_list" && this.props.edit_active_list.smart_list == 1){
      return(
        <Card>
          <ToggleSwitch
            value={this.props.edit_active_list.start_marketing == 1 ? true : false}
            onChange={value => {
              if(this.props.active_list.building != 1){
                this.props.editActiveList({ prop: "start_marketing", value: value == true ? 1 : 0 })
              }
            }}
            title={"Sync Marketing to Smart List"}
            text={"Automatically turn marketing on/off as properties enter/leave your smart list. Your default mail settings will be applied to new properties."}
          />
        </Card>
      )
    }

    return <Wrapper />;
  }

}

export default StartMarketingToggle;
