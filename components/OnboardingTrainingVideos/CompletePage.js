import React, { Component } from 'react';

import { Wrapper, Card, Title, Copy, Bold, CardBody, PrimaryButton, LineBreak } from 'app/NativeComponents/common';

class CompletePage extends Component{


  renderContactOptions(){
    if(this.props.device == "desktop"){
      return(
        <Wrapper>
          <Copy>If you have additional questions for {this.props.user_dealfinder_page.name}, you can reach them via email at <a href={'mailto:'+this.props.user_dealfinder_page.email}>{this.props.user_dealfinder_page.email}</a> or phone at <a href={'tel:'+this.props.user_dealfinder_page.phone}>{this.props.user_dealfinder_page.phone}</a>.</Copy><LineBreak />
        </Wrapper>
      )
    }else{
      return(
        <Wrapper>
          <Copy>If you have additional questions for {this.props.user_dealfinder_page.name}, you can reach them via email at {this.props.user_dealfinder_page.email} or phone at {this.props.user_dealfinder_page.phone}.</Copy>
        </Wrapper>
      )
    }
  }

  render(){

      if(this.props.complete == true){

        return(
          <Wrapper>
            <CardBody>
              <Title>Congratulations on completing your DealFinder training and welcome to {this.props.user_dealfinder_page.name}’s team.</Title><LineBreak />
              <Copy>The best way to start earning is by starting now. Make a goal of adding 50 properties in the next week and then reach out to {this.props.user_dealfinder_page.name} with any questions you have.</Copy><LineBreak />
              {this.renderContactOptions()}


            </CardBody>

            <Card style={{
              flex: 0
            }}>
              <PrimaryButton onPress={()=>{
                const { token } = this.props;

                this.props.editTeam({
                  token,
                  team: this.props.user.team_id,
                  type: "complete_dealfinder_training",
                  payload: {}
                });
              }}>
                Complete Training
              </PrimaryButton>
            </Card>
          </Wrapper>

        );
      }

      return <Wrapper />

  }
}

export default CompletePage;
