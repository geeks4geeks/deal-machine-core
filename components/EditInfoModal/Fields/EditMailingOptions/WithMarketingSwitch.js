import React, { Component } from 'react';
import { Card } from 'app/NativeComponents/common'
import { ToggleSwitch } from 'app/NativeComponents/snippets';

class WithMarketingSwitch extends Component{

  render(){

    return(
      <Card>
        <ToggleSwitch
          value={parseInt(this.props.fields.start_mailers) === 1 ? true : false}
          onChange={value => {
            this.props.updateField({ prop: "start_mailers", value: value === true ? 1 : 0 })
          }}
          title={"Start Mailers?"}
          text={'Switches the lead status to "With Marketing" and starts or resumes mailers.'}
        />
      </Card>
    );
  }

}

export default WithMarketingSwitch;
