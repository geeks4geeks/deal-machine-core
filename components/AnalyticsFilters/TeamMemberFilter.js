import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Wrapper, Row, Spin, Copy } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';


import {
  getTeam
} from 'app/NativeActions';


class TeamMemberFilter extends Component{

  constructor(props) {

    super(props);

    this.state = {
      team_member_array: []
    }
  }

  formatArray(){
    var team_member_array = [];

    //add default
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

    this.setState({team_member_array: team_member_array})
  }

  getItems(){
    if(!this.props.team_loading){
      this.props.getTeam({ token: this.props.token, type: "load" });
    }
  }

  componentDidMount(){
    this.formatArray();
    if(this.props.my_team.length === 0){
      this.getItems();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.my_team !== this.props.my_team){
      this.formatArray()
    }
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

  render(){

    if(this.props.team_loading){
      return (
        <Wrapper style={{
          padding: 20
        }}>
          <Row>
            <Spin size="small"/>
            <Copy style={{marginLeft: 10}}>Loading Team...</Copy>
          </Row>
        </Wrapper>
      )
    }

    return(
          <Select
            item_ref={"select_team_member"}
            items={this.state.team_member_array}
            title={this.props.analytics_type == "driving" ? "Routes driven by:" : "Property added by:"}
            label="Select an option"
            value={this.props.filters.team_member}
            text={this.props.filters.team_member_title}
            onSelect={item => {
              this.props.updateFilter({prop: "team_member", value: item});
              this.props.updateFilter({prop: "team_member_title", value: this.renderTitle(item)});
            }}
          />
    );
  }

}

const mapStateToProps = ({ auth, native, team }) => {
  const { token, user } = auth;
  const { my_team, team_loading } = team;

  return {
    token,
    user,
    my_team,
    team_loading
  };
}


export default connect(mapStateToProps, {
  getTeam
})(TeamMemberFilter);
