import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Row, Title, Copy } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

class StartBuildingCard extends Component{

  constructor(props){
    super(props);

    this.startBuilding = this.startBuilding.bind(this)
  }

  startBuilding(){
    this.props.setActiveList("build")
    this.props.appRedirect({redirect: "build_list"})
  }

  render(){

    if(this.props.user.team_clearance_level > 0 || this.props.user.team_owner == 1){
      return(
        <Card>
          <CardBody>
            <Title>List Engine</Title>
            <Copy>Pull thousands of leads instantly into your CRM for one low monthly fee. Use quick lists to identify cash buyers or motivated sellers, and keep lists automatically in sync with sellers’ situations weekly. Click Build List and let’s get started!</Copy>
            <Row>
              <PillButton
              style={{marginLeft: 0, marginBottom: 0}}
              onPress={this.startBuilding} primary={true}>
                Build List
              </PillButton>
            </Row>
          </CardBody>


        </Card>
      )
    }

    return <Wrapper />

  }

}

export default StartBuildingCard;
