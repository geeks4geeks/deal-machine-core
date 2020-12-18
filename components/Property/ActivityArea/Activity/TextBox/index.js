import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import Mentions from './Mentions';
import NoteText from './NoteText';
import Buttons from './Buttons';
import DetailedOptions from './DetailedOptions';

class TextBox extends Component{

  componentDidMount(){
    this.getTeam();
  }

  getTeam(search = ""){
    if(!this.props.team_members_loading){
      this.props.getTeamMembers({
        token: this.props.token,
        load_type: "replace",
        type: "accepted_members_and_dealfinders",
        username_search: search,
        begin: 0
      });
    }
  }

  render(){
    return (

      <Wrapper style={this.props.device == "desktop" ?
      {} : {
        marginBottom:this.props.platform == "android" || this.props.isIphoneX ? 20 : 0
      }}>
        <DetailedOptions {...this.props}/>

        <Wrapper style={{
          borderTopColor: this.props.colors.border_color,
          borderTopWidth: 1,
          borderTopStyle: "solid"
        }}>


          <Mentions {...this.props} getTeam={this.getTeam.bind(this)} />
          <NoteText {...this.props} getTeam={this.getTeam.bind(this)} />
          <Buttons {...this.props}/>
        </Wrapper>
      </Wrapper>
    )
  }
}

export default TextBox
