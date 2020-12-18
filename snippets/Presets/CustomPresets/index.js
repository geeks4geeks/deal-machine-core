import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper, Button, Row, Title, Copy, Card, Icon } from "app/NativeComponents/common";

import {
  getTeamFilters,
  appRedirect,
  setPresetModal
} from "app/NativeActions";

import PresetItem from '../PresetItem';

class CustomPresets extends Component {

  componentDidMount() {
    if(this.props.team_filters.length === 0 && !this.props.team_filters_loading){
      this.props.getTeamFilters({token: this.props.token})
    }
  }

  render() {
    return (
      <Wrapper style={{padding: 20, paddingBottom: 0, paddingLeft: 10, paddingRight: 10}}>
        <Copy style={{marginBottom: 10}}>{this.props.title}</Copy>
        <Row style={{flexWrap: "wrap", overflow: "visible"}}>
          {
            this.props.team_filters.map((preset, i)=>{
              return(
                <PresetItem key={i}
                  {...this.props}
                  onPress={this.props.onPress}
                  is_active={this.props.active_preset == preset.id ? true : false}
                  preset={preset}
                  title={preset.title}
                  show_options={this.props.active_preset == preset.id ? true : false}
                  onEdit={()=>{
                    this.props.setPresetModal({
                      type: "edit",
                      preset_id: preset.id,
                      filters: preset.filter_json,
                      use_for_dealfinders: preset.use_for_dealfinders,
                      preset_title: preset.title
                    })
                    this.props.appRedirect({redirect: "goForward", payload: {add: "preset"}})
                  }}
                />
              )
            })
          }
          <Button onPress={()=>{
            this.props.setPresetModal({
              type: "create",
              preset_id: null,
              filters: this.props.filters,
              use_for_dealfinders: 0,
              preset_title: "Preset #"+parseInt(this.props.team_filters.length+1)
            })
            this.props.appRedirect({redirect: "goForward", payload: {add: "preset"}})
          }}>
            <Card style={{margin: 0, marginBottom: 5, marginRight: 5, padding: 15, paddingLeft: 5, paddingTop: 5, paddingBottom: 5, borderRadius: 30}}>
              <Row>
                <Icon
                  icon={"add"}
                  size={18}
                  style={{marginRight: 5}}
                />
                <Copy>Create Preset</Copy>
              </Row>
            </Card>
          </Button>
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
    team_filters
  } = filter;
  return {
    token, user,
    device, platform, isMobile,
    colors,
    team_filters
  };
};

export default connect(
  mapStateToProps,
  {
    getTeamFilters,
    appRedirect,
    setPresetModal
  }
)(CustomPresets);
