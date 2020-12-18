import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton, Copy, CardBody, ProgressBar } from 'app/NativeComponents/common';


class Buttons extends Component{

  renderContactOptions(){
    if(this.props.device == "desktop"){
      return(
        <CardBody>
          <Copy style={{textAlign: "center"}}>If you have additional questions for {this.props.user_dealfinder_page.name}, you can reach them via email at <a href={'mailto:'+this.props.user_dealfinder_page.email}>{this.props.user_dealfinder_page.email}</a> or phone at <a href={'tel:'+this.props.user_dealfinder_page.phone}>{this.props.user_dealfinder_page.phone}</a>.</Copy>
        </CardBody>
      )
    }else{
      return(
        <CardBody>
          <Copy style={{textAlign: "center"}}>If you have additional questions for {this.props.user_dealfinder_page.name}, you can reach them via email at {this.props.user_dealfinder_page.email} or phone at {this.props.user_dealfinder_page.phone}.</Copy>
        </CardBody>
      )
    }
  }

  render(){
    if(!this.props.complete){
      return(
        <Wrapper>
          <Card style={{
            flex: 0
          }}>
            <PrimaryButton onPress={()=>this.props.nextStep(this.props.index+1)}>
              Next
            </PrimaryButton>
          </Card>

          <CardBody style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ProgressBar
              color={this.props.colors.success_color}
              width={this.props.device == "desktop" ? "100%" : 300}
              progress={this.props.index/this.props.video_array.length}
            />
            <Copy style={{textAlign: "center"}}>Page {this.props.index} of {this.props.video_array.length}</Copy>
          </CardBody>

          {this.renderContactOptions()}
        </Wrapper>
      )
    }

    return <Wrapper />
  }
}

export default Buttons;
