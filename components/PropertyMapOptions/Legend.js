import React, { Component } from 'react';
import {
  Wrapper,
  Row,
  Copy,
  CardBody
} from 'app/NativeComponents/common';

class Legend extends Component{

  render(){

    if(this.props.show_routes){
      return(
        <Wrapper>
          <CardBody>
            <Row>
              <Row style={{
                flex: 1,
                alignItems:"center",
                justifyContent: "center"
              }}>
                <Wrapper style={{
                  width: 10, height: 10, backgroundColor: "#4EE8C3",marginRight: 5
                }} />
                <Copy>0-6 months</Copy>
              </Row>

              <Row style={{
                flex: 1,
                alignItems:"center",
                justifyContent: "center"
              }}>
                <Wrapper style={{
                  width: 10, height: 10, backgroundColor: "#F9F871",marginRight: 5
                }} />
                <Copy>6-12 months</Copy>
              </Row>

              <Row style={{
                flex: 1,
                alignItems:"center",
                justifyContent: "center"
              }}>
                <Wrapper style={{
                  width: 10, height: 10, backgroundColor: "#B24C63",marginRight: 5
                }} />
                <Copy>12-24 months</Copy>
              </Row>
            </Row>
          </CardBody>
        </Wrapper>

      )
    }

    return <Wrapper />
  }




}

export default Legend;
