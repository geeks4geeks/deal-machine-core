import React, { Component } from "react";

import { Wrapper, Button, Row, Copy, Icon, Card } from "app/NativeComponents/common";

class LocationSwitchButton extends Component {


  render() {

    return (
      <Button onPress={this.props.onPress}>
        <Card style={{margin: 0, marginBottom: 5, marginRight: 5, padding: 15, paddingLeft: 5, paddingTop: 5, paddingBottom: 5, borderRadius: 30}}>
          <Row>
            <Icon
              icon={this.props.is_active ? "radio-button-checked" : "radio-button-unchecked"}
              size={18}
              style={{marginRight: 5}}
            />
            <Copy>{this.props.title}</Copy>
          </Row>
        </Card>
      </Button>
    )

  }
}


export default LocationSwitchButton;
