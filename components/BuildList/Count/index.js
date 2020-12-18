import React, { Component } from "react";

import { Wrapper, Row, Title, Copy, Bold, Card, Input, Spin } from "app/NativeComponents/common";
import { PillButton } from "app/NativeComponents/snippets";

import {
  getCustomFilterText
} from 'app/NativeActions'
class Count extends Component {


  componentDidMount(){

  }

  componentDidUpdate(prevProps, prevState){

    const { token, preset, preset_object, location_type, zip, city, state, drawing_coordinates, filters, location_success, preset_success } = this.props;

    if(preset !== prevProps.preset ||
      preset_object !== prevProps.preset_object ||
      location_type !== prevProps.location_type ||
      zip !== prevProps.zip ||
      city !== prevProps.city ||
      state !== prevProps.state ||
      drawing_coordinates !== prevProps.drawing_coordinates ||
      filters !== prevProps.filters ||
      location_success !== prevProps.location_success ||
      preset_success !== prevProps.preset_success
    ){
      //get list count
      if(preset_success == true && location_success == true){
        this.props.updateList({
          token,
          type: "build_list_count",
          location_type,
          zip,
          city,
          state,
          drawing_coordinates,
          filters: preset !== null && preset !== -1 && preset_object ? preset_object.filter_json : filters
        })
      }
    }
  }


  renderCopy(){

    const { filters, get_list_count, get_list_count_loading, preset, preset_object, colors } = this.props;

    if(get_list_count_loading){
      return(
        <Wrapper style={{alignItems: "center", justifyContent:"center"}}>
          <Row >
            <Spin color={colors.white_text_color} size={"small"}/>
            <Copy style={{marginLeft: 10, color: colors.white_text_color}}>Estimating Lead Count...</Copy>
          </Row>
        </Wrapper>
      )
    }else{

      const filterText = preset && preset !== -1 && preset_object ? getCustomFilterText(preset_object.filter_json) : getCustomFilterText(filters);
      const lead_count_text = get_list_count == 1 ? `1 lead is estimated to be generated from these parameters. (${filterText})` : `${get_list_count} leads are estimated to be generated from these parameters. (${filterText})`;
      return(
        <Wrapper style={{alignItems: "center", justifyContent:"center"}}>
          <Row>
            <Copy style={{textAlign: "center", color: colors.white_text_color}}><Bold>{lead_count_text}</Bold></Copy>
          </Row>
        </Wrapper>
      )
    }
  }

  render() {
    if(this.props.location_success && this.props.preset_success){
      return (
        <Wrapper style={this.props.isMobile && this.props.device == "desktop" ? {
          padding: 20,
          backgroundColor: this.props.colors.success_color,
          position: "fixed",
          bottom:0,
          right:0,
          left:0
        }: {
          padding: 20,
          backgroundColor: this.props.colors.success_color,
        }}>
          {this.renderCopy()}
        </Wrapper>
      )
    }

    return <Wrapper />

  }
}


export default Count;
