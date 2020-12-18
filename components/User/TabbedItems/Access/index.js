import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper, CardBody, Card, Copy } from 'app/NativeComponents/common';

import ModuleAccess from './ModuleAccess';

class Access extends Component {



  render(){

    if(this.props.tab == "access" && this.props.platform != "ios"){
      return(
        <CardBody style={{paddingTop: 0}}>
          <Card>
            <ModuleAccess
              {...this.props}
              title={"DealMachine CRM"}
              slug={"crm"}
            />
            <ModuleAccess
              {...this.props}
              title={"DealMachine Street Engine"}
              slug={"driving"}
            />
            <ModuleAccess
              {...this.props}
              title={"DealMachine List Engine"}
              slug={"lists"}
            />
          </Card>
        </CardBody>
      )
    }else if(this.props.tab == "access" && this.props.platform == "ios"){
      return(
        <CardBody style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
          <Copy style={{textAlign: "center"}}>You cannot edit this on the app. Please go to DealMachine on the web to edit these options.</Copy>
        </CardBody>
      )
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, billing }) => {
  const { token, user } = auth;
  const { plan_modules, current_team_members, team_member_limit } = billing;

  return {
    token,
    user,
    plan_modules,
    current_team_members,
    team_member_limit
  };
}

export default connect(mapStateToProps, {

})(Access);
