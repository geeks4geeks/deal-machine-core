import React, { Component } from 'react';
import { Wrapper, Card, Row, Copy, Bold, Button, Icon } from 'app/NativeComponents/common';


class TeamMemberFilterTag extends Component{

  handleClearFilter(){

    this.props.updateSingleAnlyticsFilters({prop: "team_member", value: "none"})

  }

  render(){

    if(this.props.analytics_filters.team_member != "none"){
      return (
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
            <Copy><Bold>Added By:</Bold> {this.props.analytics_filters.team_member_title}</Copy>
            <Button
              onPress={(this.handleClearFilter.bind(this))}>
              <Icon icon="close" style={{marginLeft: 5}} />
            </Button>
          </Row>
        </Card>
      );
    }

    return <Wrapper />

  }

}

export default TeamMemberFilterTag;
