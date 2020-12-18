import React, { Component } from 'react';
import {
  Card,
  Wrapper,
  Container,
  WebContainer,
  PrimaryButton,
  CardBody,
  Animation,
  Row,
  Spin,
  Copy
} from 'app/NativeComponents/common';

import { Select, Header } from 'app/NativeComponents/snippets';

class TeamRouteFilter extends Component{

  constructor(props) {

    super(props);

    var team_member_array = [];

    team_member_array.push({
      key: -1,
      value: "none",
      label: "Everyone"
    });

    for(var i = 0; i<this.props.my_team.length; i++){
      team_member_array.push({
        key: i,
        value: this.props.my_team[i].id,
        label: this.props.my_team[i].firstname+" "+this.props.my_team[i].lastname
      });
    }

    this.state = {team_member_array: team_member_array}
  }

  renderTitle(team_member){
    var team_member_title = "";
    for(var i = 0; i<this.state.team_member_array.length; i++){
      if(team_member == this.state.team_member_array[i].value){
        team_member_title = this.state.team_member_array[i].label;
      }
    }
    return team_member_title;
  }

  componentDidMount(){
    if(this.props.my_team.length == 0){
      this.props.getTeam({ token: this.props.token, type: "load" });
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.my_team !== this.props.my_team){
      var team_member_array = [];

      team_member_array.push({
        key: -1,
        value: "none",
        label: "Everyone"
      });

      for(var i = 0; i<this.props.my_team.length; i++){
        team_member_array.push({
          key: i,
          value: this.props.my_team[i].id,
          label: this.props.my_team[i].firstname+" "+this.props.my_team[i].lastname
        });
      }

      this.setState({team_member_array: team_member_array});
    }
  }

  render(){
    if(!this.props.team_loading && this.props.my_team.length > 0){
      return(
          <Wrapper>
            <Card>
              <Select
                item_ref={"select_team_member"}
                items={this.state.team_member_array}
                title="Filter By Team Member:"
                label="Select an option"
                value={this.props.editRouteFilters.route_team_member}
                text={this.props.editRouteFilters.route_team_member_title}
                onSelect={item => {
                  this.props.updateRouteFilter({prop: "route_team_member", value: item});
                  this.props.updateRouteFilter({prop: "route_team_member_title", value: this.renderTitle(item)})
                }}
              />
              </Card>
          </Wrapper>
      );
    }else if(this.props.team_loading){
      return(
        <Wrapper>
          <Card>
            <Wrapper style={{
              padding: 20
            }}>
              <Row>
                <Spin size="small"/>
                <Copy style={{marginLeft: 10}}>Loading Team...</Copy>
              </Row>
            </Wrapper>
          </Card>
        </Wrapper>
      )
    }

    return <Wrapper />
  }

}

export default TeamRouteFilter;
