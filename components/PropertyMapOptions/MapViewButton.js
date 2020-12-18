import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Row,
  Button,
  Copy,
  Bold,
  Icon
} from 'app/NativeComponents/common';

import {
  CloseButton,
  ToggleSwitch
} from 'app/NativeComponents/snippets';

class MapViewButton extends Component{

  render(){

    return (
      <Card>
        <Row>
          <Button onPress={()=>{
            this.props.toggleMapType("standard")

          }}
          style={{
            alignItems: "center",
            justifyContent:"center",
            flex: 1,
            backgroundColor:
              this.props.map_type == "standard" ? this.props.colors.card_color : this.props.colors.gray_color,
            borderRightWidth: 1,
            borderRightColor: this.props.colors.border_color
          }}
          >
            <CardBody>
              <Row>
                <Icon
                  icon={"map"}
                  size={18}
                  style={{
                    marginRight: 5
                  }}
                />
                <Copy><Bold>Standard</Bold></Copy>
              </Row>
            </CardBody>
          </Button>

          <Button onPress={()=>{
            this.props.toggleMapType("hybrid")

          }}
          style={{
            alignItems: "center",
            justifyContent:"center",
            flex: 1,
            backgroundColor: this.props.map_type == "hybrid" ? this.props.colors.card_color : this.props.colors.gray_color
          }}
          >
            <CardBody>
              <Row>
                <Icon
                  icon={"terrain"}
                  size={18}
                  style={{
                    marginRight: 5
                  }}
                />
                <Copy><Bold>Satellite</Bold></Copy>
              </Row>
            </CardBody>
          </Button>
        </Row>
      </Card>
    );
  }


}

export default MapViewButton;
