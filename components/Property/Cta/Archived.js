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

class Archived extends Component{

  render(){
    return (
      <Wrapper>
        <Card>
          <CardBody>
            <CenterCenter>
              <Animation type="zoomIn">
                <Icon
                  color={this.props.colors.error_color}
                  icon="delete"
                  size={44}
                />
              </Animation>
              <Wrapper style={{marginTop: 10, marginBottom: 10}}>
                <Title>In Trash</Title>
              </Wrapper>
              <Wrapper>
                <Copy style={{textAlign: "center"}}>
                  You've placed this lead in the <Bold>trash.</Bold> You can edit it by <Bold>restoring the lead</Bold> or you can <Bold>permanently delete</Bold> it. Do either by clicking the button in the top right with three dots.
                </Copy>
              </Wrapper>
            </CenterCenter>
          </CardBody>
        </Card>

      </Wrapper>
    );
  }

}

export default Archived;
