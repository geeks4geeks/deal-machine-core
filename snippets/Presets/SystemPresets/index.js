import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper, Button, Row, Title, Copy, Card, Icon } from "app/NativeComponents/common";

import {
  getTeamFilters
} from "app/NativeActions";

import PresetItem from '../PresetItem';

class SystemPresets extends Component {

  componentDidMount() {
    if(this.props.system_default_presets.length === 0 && !this.props.team_filters_loading){
      this.props.getTeamFilters({token: this.props.token, type: "system_default"})
    }
  }

  render() {
    return (
      <Wrapper style={{padding: 20, paddingBottom: 0, paddingLeft: 10, paddingRight: 10}}>
        <Copy style={{marginBottom: 10}}>{this.props.title}</Copy>
        <Row style={{flexWrap: "wrap", overflow: "visible"}}>
          {
            this.props.system_default_presets.map((preset, i)=>{
              return(
                <PresetItem key={i}
                  {...this.props}
                  onPress={this.props.onPress}
                  is_active={this.props.active_preset == preset.id ? true : false}
                  preset={preset}
                  title={preset.title}
                  show_options={false}
                />
              )
            })
          }
        </Row>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ auth, settings, native, filter }) => {
  const { token, user } = auth;
  const {
    device, platform, isMobile
  } = native;
  const {
    colors
  } = settings;
  const {
    system_default_presets
  } = filter;
  return {
    token, user,
    device, platform, isMobile,
    colors,
    system_default_presets
  };
};

export default connect(
  mapStateToProps,
  {
    getTeamFilters
  }
)(SystemPresets);
