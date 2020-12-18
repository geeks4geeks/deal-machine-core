import React, { Component } from "react";

import { Wrapper, Row, Title, Copy, Bold, Card, Input, Spin } from "app/NativeComponents/common";
import { PillButton } from "app/NativeComponents/snippets";

class Buttons extends Component {


  componentDidMount(){

  }

  renderButton(){

    const { location_success, name_success, preset_success, smart_success, startBuilding } = this.props;

    if(location_success && preset_success && name_success && smart_success){
      return(
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton primary={true} onPress={()=>{
            startBuilding();
          }}>
            Submit
          </PillButton>
        </Row>
      )
    }
  }

  render() {

    const { location_success, preset_success } = this.props;

    if(location_success && preset_success){
      return (
        <Wrapper>
          {this.renderButton()}
        </Wrapper>
      )
    }

    return <Wrapper />

  }
}


export default Buttons;
