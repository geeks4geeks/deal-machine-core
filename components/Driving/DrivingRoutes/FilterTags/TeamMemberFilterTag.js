import React, { Component } from 'react';

import {
  Wrapper,
  Card,
  Row,
  Copy,
  Bold,
  Button,
  Icon
 } from 'app/NativeComponents/common';


class TeamMemberFilterTag extends Component{

  handleClearFilter(){

    this.props.updateSingleRouteFilter({prop: "route_team_member", value: "none"});
    this.props.updateSingleRouteFilter({prop: "route_team_member_title", value: "Everyone"})

  }

  render(){
    if(this.props.route_filters.route_team_member != "none"){
      return (
        <Wrapper>
          <Row style={{
            flexWrap: "wrap",
            justifyContent: "flex-end"
          }}>
          <Card style={{
            marginLeft: 0,
            borderRadius: 15,
            height: 30,
            alignItems: "flex-start",
            justifyContent:"center"
          }}>
            <Row style={{
              padding: 0,
              paddingLeft: 15,
              paddingRight: 15
            }}>
              <Copy><Bold>Added By:</Bold> {this.props.route_filters.route_team_member_title}</Copy>
              <Button
                onPress={()=>this.handleClearFilter()}>
                <Icon icon="close" style={{marginLeft: 5}} />
              </Button>
            </Row>
          </Card>

          </Row>
        </Wrapper>

      );
    }

    return <Wrapper />

  }

}

export default TeamMemberFilterTag;
