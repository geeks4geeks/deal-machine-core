import React, { Component } from 'react';

import {
  Wrapper,
  Row,
  Copy,
  Card,
  Gradient,
  Bold,
  Button,
  Icon
} from 'app/NativeComponents/common';

class PropertyTags extends Component{


  renderVacantTag(){
    if(this.props.active_property.is_vacant == 1 && this.props.user.team_clearance_level > 0){
      return(
        <Card style={{
          backgroundColor: this.props.colors.error_color,
          marginLeft: 0, marginBottom: 0}}>
          <Gradient style={{borderRadius: 5, padding: 3, paddingLeft: 10, paddingRight: 10}} color1={this.props.colors.gradient_color_1} color2={this.props.colors.gradient_color_2}>
            <Copy style={{color: this.props.colors.white_text_color, fontSize: 12}}><Bold>Vacant</Bold></Copy>
          </Gradient>
        </Card>
      )
    }
  }


  renderPreforeclosueTag(){
    if(this.props.active_property.preforeclosure_type && this.props.active_property.preforeclosure_type != ""){

      if(this.props.active_property.preforeclosure_type == "bank_owned"){
        return(
          <Card style={{
            backgroundColor: this.props.colors.error_color,
            marginLeft: 0, marginBottom: 0}}>
            <Gradient style={{borderRadius: 5, padding: 3, paddingLeft: 10, paddingRight: 10}} color1={this.props.colors.gradient_color_1} color2={this.props.colors.gradient_color_2}>
              <Copy style={{color: this.props.colors.white_text_color, fontSize: 12}}><Bold>Bank Owned</Bold></Copy>
            </Gradient>
          </Card>
        )
      }

      return(
        <Card style={{
          backgroundColor: this.props.colors.error_color,
          marginLeft: 0, marginBottom: 0}}>
          <Gradient style={{borderRadius: 5, padding: 3, paddingLeft: 10, paddingRight: 10}} color1={this.props.colors.gradient_color_1} color2={this.props.colors.gradient_color_2}>
            <Copy style={{color: this.props.colors.white_text_color, fontSize: 12}}><Bold>Preforeclosure</Bold></Copy>
          </Gradient>
        </Card>
      )
    }
  }
  render(){
    if(this.props.active_property.deal){
      if(parseInt(this.props.active_property.deal.creator_id) === parseInt(this.props.user.id) || this.props.user.team_clearance_level > 0){
        return (
          <Wrapper>
            <Row style={{flexWrap: "wrap"}}>
              {this.renderVacantTag()}
              {this.renderPreforeclosueTag()}

              {
                this.props.active_property.deal.tags.map((tag, i)=>{
                  return (
                    <Card key={i} style={{marginLeft: 0, marginBottom: 0, padding: 3, paddingLeft: 10, paddingRight: 10}}>
                      <Copy style={{fontSize: 12}}><Bold>{tag.title}</Bold></Copy>
                    </Card>
                  )
                })
              }
            </Row>

          </Wrapper>
        )
      }
    }else if(this.props.user.team_clearance_level > 0){
      return (
        <Wrapper>
          <Row style={{flexWrap: "wrap"}}>
            {this.renderVacantTag()}
            {this.renderPreforeclosueTag()}
          </Row>
        </Wrapper>
      )
    }

    return <Wrapper />
  }

}



export default PropertyTags;
