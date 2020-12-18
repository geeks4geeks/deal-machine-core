import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  CenterCenter,
  Spin,
  Title,
  Copy
} from 'app/NativeComponents/common';

class LookupLoading extends Component{

  render(){
    return (
      <Wrapper>
        <Card>
          <CardBody>
            <CenterCenter>
              <Spin
                size="large"
              />
              <Wrapper style={{marginTop: 10}}>
                <Title>Searching property records...</Title>
              </Wrapper>
            </CenterCenter>
          </CardBody>
        </Card>
      </Wrapper>
    );
  }

}

export default LookupLoading;
