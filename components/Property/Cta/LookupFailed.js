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

class LookupFailed extends Component{

  render(){
    return (
      <Wrapper>
        <Card>
          <CardBody>
            <CenterCenter>
              <Animation type="zoomIn">
                <Icon
                  icon="error"
                  size={44}
                />
              </Animation>
              <Wrapper style={{marginTop: 10, marginBottom: 10}}>
                <Title>Owner Lookup Failed</Title>
              </Wrapper>
              <Wrapper>
                <Copy style={{textAlign: "center"}}>
                  <Bold>What does this mean?</Bold> We get owner information from the <Bold>county property records.</Bold> We had trouble importing this one. We're looking into it! In the meantime, try adding another property or manually add this owner below. <Bold>We are constantly improving</Bold> our data collection system to get you the best data.
                </Copy>
              </Wrapper>
            </CenterCenter>
          </CardBody>
        </Card>

      </Wrapper>
    );
  }

}

export default LookupFailed;
