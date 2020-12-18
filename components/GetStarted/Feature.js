import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Row,
  Icon,
  Title,
  Copy
} from 'app/NativeComponents/common';

class Feature extends Component{


  render(){

      if(!this.props.no_card){
        return (
          <Card>
            <CardBody>
              <Row>
                <Icon
                  color={this.props.colors.active_color}
                  icon={this.props.icon}
                  size={34}
                  style={{marginRight: 20}}
                />
                <Wrapper style={{
                  justifyContent:"center",
                  flex: 1
                }}>
                  <Title>
                    {this.props.title}
                  </Title>
                  <Copy>
                    {this.props.text}
                  </Copy>
                </Wrapper>
              </Row>
            </CardBody>
          </Card>
        );
      }

      return(
        <CardBody>
          <Row>
            <Icon
              color={this.props.colors.active_color}
              icon={this.props.icon}
              size={34}
              style={{marginRight: 20}}
            />
            <Wrapper style={{
              justifyContent:"center",
              flex: 1
            }}>
              <Title>
                {this.props.title}
              </Title>
              <Copy>
                {this.props.text}
              </Copy>
            </Wrapper>
          </Row>
        </CardBody>
      )


  }

}

export default Feature;
