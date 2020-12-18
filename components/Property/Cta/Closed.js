import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  CenterCenter,
  Animation,
  Icon,
  Title,
  Copy,
  Bold
} from 'app/NativeComponents/common';

class Closed extends Component{

  render(){
    return (
      <Wrapper>
        <Card>
          <CardBody>
            <CenterCenter>
              <Animation type="zoomIn">
                <Icon
                  color={this.props.colors.success_color}
                  icon="attach-money"
                  size={44}
                />
              </Animation>
              <Wrapper style={{marginTop: 10, marginBottom: 10}}>
                <Title>Deal Closed!</Title>
              </Wrapper>
              <Wrapper>
                <Copy style={{textAlign: "center"}}>
                  <Bold>Way to go!</Bold> You've closed this deal! Make sure to <Bold>pay your DealFinder</Bold> if you had one. Otherwise kick back, relax and enjoy your payday!
                </Copy>
              </Wrapper>
            </CenterCenter>
          </CardBody>
        </Card>

      </Wrapper>
    );
  }

}

export default Closed;
