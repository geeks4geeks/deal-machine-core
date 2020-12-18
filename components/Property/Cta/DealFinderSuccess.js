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
  Bold,
  PrimaryButton
} from 'app/NativeComponents/common';
import {
  PillButton
} from 'app/NativeComponents/snippets';
class DealFinderSuccess extends Component{

  addAnotherDeal(){
    this.props.appRedirect({redirect: "goBack", payload: {remove: "property", property_id: this.props.active_property.property_id}});
  }

  render(){
    return (
      <Wrapper>
        <Card>
          <CardBody>
            <CenterCenter>
              <Animation type="zoomIn">
                <Icon
                  color={this.props.colors.success_color}
                  icon="check-circle"
                  size={44}
                />
              </Animation>
              <Wrapper style={{marginTop: 10, marginBottom: 10}}>
                <Title>Property Added!</Title>
              </Wrapper>
              <Wrapper>
                <Copy style={{textAlign: "center"}}>
                  <Bold>Congrats!</Bold> You added this property to <Bold>{this.props.user.team_name}'s</Bold> team. Know when they approve your lead via the <Bold>Activity, Notes, Messages</Bold> tab at the bottom. Next, <Bold>press the button below</Bold>, and keep adding more properties!
                </Copy>
              </Wrapper>
            </CenterCenter>
          </CardBody>
          <CenterCenter>
            <PillButton primary={true} onPress={this.addAnotherDeal.bind(this)}>
              Add Another Property
            </PillButton>
          </CenterCenter>
        </Card>
      </Wrapper>
    );
  }

}

export default DealFinderSuccess;
