import React, { Component } from 'react';
import { Wrapper, Input, Copy, Card, CardBody, HTMLEditor } from 'app/NativeComponents/common';
import { CardLabel } from 'app/NativeComponents/snippets';

class WelcomeEmail extends Component{


  render(){


    if(this.props.edit_team_link_toggle == "email" && this.props.edit_live_page == "on"){
      return(
        <Wrapper>
          <CardBody>
            <Copy>
              Send new DealFinders an email when they sign up. Receiving a message from you will encourage DealFinders to get started adding properties right away.
            </Copy>
          </CardBody>

          <Card>
            <Input
              ref={"email_subject"}
              name={"email_subject"}
              placeholder={"Email Subject"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "email_subject", value})
              }}
              value={this.props.edit_user_dealfinder_page.email_subject}
              type="text"
            />
          </Card>

          <Card style={{overflow: "hidden"}}>
            <CardLabel
              title={"Email Body:"}
              icon={"code"}
              hasButton={false}
              onPress={()=>{}}
              hasBorder={true}
            />
            <HTMLEditor
              data={this.props.edit_user_dealfinder_page.email_text}
              onChange={(data)=>{
                this.props.editTeamLinkInfo({prop: "email_text", value: data})
              }}
            />

          </Card>



        </Wrapper>
      );


    }

    return <Wrapper />

  }
}

export default WelcomeEmail;
