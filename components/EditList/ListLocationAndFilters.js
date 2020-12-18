import React, { Component } from 'react';

import {
  Wrapper,
  Card,
  CardBody,
  Copy,
  Title,
  ExternalImage
} from 'app/NativeComponents/common';

import {
  getCustomFilterText
} from 'app/NativeActions';

class ListLocationAndFilters extends Component{

  renderLocationTitle(){
    switch(this.props.edit_active_list.list_area_type){
      case "zip":
        return "Leads sourced from "+this.props.edit_active_list.list_area;
      break;

      case "city":
        return "Leads sourced from "+this.props.edit_active_list.list_area+", "+this.props.edit_active_list.list_area_2;
      break;

      case "draw":
      default:
        return "Leads sourced from custom drawing";
      break;


    }
  }

  render(){

    if(this.props.edit_active_list.list_type == "build_list"){
      return(
        <Wrapper>
          <Wrapper style={{padding: 15}}>
            <Title style={{textAlign: "center"}}>{this.renderLocationTitle()}</Title>
          </Wrapper>
          <Wrapper style={{alignItems: "center", justifyContent: "center"}}>
            <Card style={{
              height: 200,
              width: "100%",
              maxWidth: 400,
              margin: this.props.device == "desktop" ? "5px auto" : 5
            }}>
              <ExternalImage
                style={{
                  height: 200,
                  width: "100%",
                  maxWidth: 400,
                }}
                image={this.props.edit_active_list.location_image}
              />
            </Card>
          </Wrapper>
          <Wrapper style={{padding: 15}}>
            <Copy style={{textAlign: "center"}}>{this.props.edit_active_list.list_filters ? getCustomFilterText(this.props.edit_active_list.list_filters) : "Getting all properties in the area"}</Copy>
          </Wrapper>
        </Wrapper>
      )
    }



    return <Wrapper />;
  }

}

export default ListLocationAndFilters;
