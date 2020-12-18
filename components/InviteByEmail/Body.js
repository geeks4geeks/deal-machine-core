import React, { Component } from 'react';
import {
  Form, Wrapper, Input, Row, CardBody, Card, Copy
} from 'app/NativeComponents/common';
import {
  PillButton
} from 'app/NativeComponents/snippets';
class Body extends Component{


  render(){

    return(

      <Wrapper>
        <Form onSubmit={()=>this.props.sendInvite()}>
          <CardBody>
            <Copy>{this.props.invite_type == "dealfinder" ? "Enter the email of the person you want to add to your DealFinders. Looking to add a partner or admin? Go to the team settings page." : "Enter the email of the person you want to add to your team. Looking to add a DealFinder? Go to the \"Driving\" page."}</Copy>
          </CardBody>
          <Card>
            <Input
              ref="email"
              name="email"
              returnKeyType="done"
              blurOnSubmit={true}
              autoCapitalize="none"
              autoFocus
              blurOnSubmit={false}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email Address"
              onChange={value => this.props.editInviteEmailOptions({ prop: "email", value })}
              onSubmitEditing={()=>this.props.sendInvite()}
              value={this.props.invite_email_options.email}
              type="text"
            />
          </Card>

          <Row style={{justifyContent: "flex-end"}}>
            <PillButton formButton primary={true} onPress={()=>this.props.sendInvite()}>
              {this.props.invite_type == "dealfinder" ? "Invite DealFinder" : "Invite Team Member"}
            </PillButton>
          </Row>

        </Form>

      </Wrapper>

    )
  }
}

export default Body;
