import React, { Component } from 'react';
import {
  Button,
  Card,
  Row,
  ProfilePic,
  Wrapper,
  CardBody,
  Split,
  Stretch,
  Title,
  Icon,
  CenterCenter,
  Copy,
  Bold,
  ExternalImage
} from 'app/NativeComponents/common';

import moment from 'moment';

class RouteItem extends Component{


  getDrivingTime(start_time, end_time){

    var ms = moment(end_time, "YYYY-MM-DD HH:mm:ss").diff(moment(start_time,"YYYY-MM-DD HH:mm:ss"));
    var d = moment.duration(ms);

    var full_time
    var full_time_hour = "";
    var full_time_min = ""

    var h = Math.floor(d.asHours());
    var m = moment.utc(ms).format("m");

    if(h > 1){
      full_time_hour = h + " hours";
    }else if(h == 0){
      full_time_hour = "";
    }else{
      full_time_hour = h+" hour";
    }
    if(m == 1){
      full_time_min = m + " minute";
    }else if(m == 0){
      full_time_min = "";
    }else if(m > 1){
      full_time_min = m + " minutes"
    }

    full_time = full_time_hour + " " + full_time_min

    return full_time;
  }

  renderBody(){
    return(
      <Row>
        <CardBody style={{flex: 1, padding:10, paddingTop: 15, paddingBottom:15}}>
          <Row>

            <Stretch>
                <Row>
                {/*<ProfilePic
                  size={25}
                  email={this.props.route.user_email}
                  image={this.props.route.user_image}
                  style={{marginRight: 5}}
                />*/}
                <Wrapper style={{
                  flex: 1
                }}>
                  <Copy>
                  <Bold>{this.props.route.user_firstname+" "+this.props.route.user_lastname} drove {this.getDrivingTime(this.props.route.start_time, this.props.route.end_time)} on {moment(this.props.route.start_time).format("MMMM Do")}</Bold></Copy>
                </Wrapper>
                </Row>
                <Wrapper style={{
                  flex: 1
                }}>
                  <Row style={{
                    marginTop: 5
                  }}>
                    <Row style={{
                      marginRight: 10
                    }}>
                      <Icon
                        style={{marginRight: 3}}
                        size={12}
                        color={this.props.colors.light_text_color}
                        icon={"home"}
                      />
                      <Copy style={{
                      fontSize: 12}}>{this.props.route.properties_added == 1 ? "1 lead added" : this.props.route.properties_added+" leads added"}</Copy>
                    </Row>
                    <Row>
                      <Icon
                        style={{marginRight: 3}}
                        size={12}
                        color={this.props.colors.light_text_color}
                        icon={"drive-eta"}
                      />
                      <Copy style={{
                      fontSize: 12}}>{this.props.route.total_miles ? this.props.route.total_miles == 1 ? "1 mile driven" : this.props.route.total_miles+" miles driven" : "0 miles driven"}</Copy>
                    </Row>


                  </Row>

                </Wrapper>


            </Stretch>

            <Wrapper>
              <CenterCenter>
                <Icon
                  style={{marginLeft: 10}}
                  icon={"keyboard-arrow-right"}
                />
              </CenterCenter>
            </Wrapper>
          </Row>
        </CardBody>
      </Row>
    )
  }

  renderImage(){
    if(this.props.route.image && this.props.route.image != '' ){
      return (
        <ExternalImage
          style={{
            height: 150,
            width: "100%",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
          }}
          image={this.props.route.image}
        />
      )
    }

  }

  render(){

    if(this.props.toggle_driving_images){
      return (
        <Button
          onPress={this.props.onPress} to={"/app/driving/route/"+this.props.route.route_id}
        >
          <Card style={{marginTop: 0,
            backgroundColor: this.props.active_route ?
            this.props.active_route.route_id == this.props.route.route_id ?
            this.props.colors.background_color : this.props.colors.card_color : this.props.colors.card_color
          }}>
            {this.renderImage()}
            {this.renderBody()}
          </Card>
        </Button>
      )
    }

    return (
      <Button

      onPress={this.props.onPress} to={"/app/driving/route/"+this.props.route.route_id}
      style={{borderBottomStyle: "solid", borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color,
      backgroundColor: this.props.active_route ? this.props.active_route.route_id == this.props.route.route_id ? this.props.colors.background_color : "transparent" : "transparent"
      }}>


        {this.renderBody()}


      </Button>
    )
  }

}

export default RouteItem;
