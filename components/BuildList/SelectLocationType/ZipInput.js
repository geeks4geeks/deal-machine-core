import React, { Component } from "react";

import { Wrapper, Card, Input } from "app/NativeComponents/common";

class ZipInput extends Component {


  render() {
    if(this.props.location_type == "zip"){
      return (
        <Card>
          <Input
            ref="zip"
            name="zip"
            blurOnSubmit={true}
            autoCapitalize="none"
            returnKeyType={"done"}
            keyboardType="numeric"
            placeholder="Enter a Zip Code"
            maxLength={5}
            onChange={value => this.props.editListBuilderField({ prop: "zip", value: value })}
            onSubmitEditing={()=>{}}
            value={this.props.zip}
            type="number"
          />
        </Card>
      )
    }

    return <Wrapper />

  }
}


export default ZipInput;
