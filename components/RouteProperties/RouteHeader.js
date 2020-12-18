import React, { PureComponent } from 'react';
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
import MapZoomControl from 'app/DealMachineCore/components/PropertyMap/MapTop/Buttons/MapZoomControl';
class RouteHeader extends PureComponent{

  getDrivingTime(start_time, end_time){
    var ms = moment(end_time, "YYYY-MM-DD HH:mm:ss").diff(moment(start_time,"YYYY-MM-DD HH:mm:ss"));
    var d = moment.duration(ms);
    var full_time = "";
    var h = Math.floor(d.asHours());

    if(h == 1){
      full_time += h+" hour and "+moment.utc(ms).format("m")+" minutes";
    }else if(h == 0){
      full_time = "";
    }else{
      full_time += h+" hours";
    }

    var m = moment.utc(ms).format("m");
    if(m == 1){
      if(h == 0){
        full_time += "1 minute";
      }else{
        full_time += " and 1 minute";
      }
    }else if(m == 0){
      if(h == 0){
        full_time = "0 minutes";
      }
    }else if(h == 0){
        full_time += moment.utc(ms).format("m")+" minutes";
      }
    return full_time;
  }

  renderHeaderBody(){

    return(
      <Row style={{flex: 1, width: "100%"}}>

        <Button style={{
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "center",
          width: 50
        }} onPress={()=>this.props.handleBack()}>
          <Icon
            icon={this.props.isMobile ? "arrow-back" : "close"}
            size={28}
          />
        </Button>

        <Wrapper style={{
          flex: 1,

          padding: 10,
          overflow: "hidden",
          whiteSpace: "nowrap"
        }}>
          <Wrapper>
            <Copy>
              <Bold>{this.props.active_route.user_firstname+" "+this.props.active_route.user_lastname} drove {this.getDrivingTime(this.props.active_route.start_time, this.props.active_route.end_time)} on {moment(this.props.active_route.start_time).format("MMMM Do")}</Bold>
            </Copy>
          </Wrapper>
          <Wrapper>

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
                fontSize: 12}}>{this.props.active_route.properties_added == 1 ? "1 lead added" : this.props.active_route.properties_added+" leads added"}</Copy>
              </Row>
              <Row>
                <Icon
                  style={{marginRight: 3}}
                  size={12}
                  color={this.props.colors.light_text_color}
                  icon={"drive-eta"}
                />
                <Copy style={{
                fontSize: 12}}>{this.props.active_route.total_miles ? this.props.active_route.total_miles == 1 ? "1 mile driven" : this.props.active_route.total_miles+" miles driven" : "0 miles driven"}</Copy>
              </Row>
            </Row>
          </Wrapper>
        </Wrapper>

        <Wrapper style={{width: this.props.isMobile ? 100 : "auto"}}>
          <Card>
            <Row>


              <Button onPress={()=>{
                this.props.routePropertiesToggleTab("map")
              }}
              style={{
                alignItems: "center",
                justifyContent:"center",
                flex: 1,
                backgroundColor: this.props.route_properties_toggle_tab == "map" ? this.props.colors.card_color : this.props.colors.gray_color
              }}
              >
              <CardBody style={{padding:10}}>
                  <Row>
                    <Icon
                      style={{marginRight: !this.props.isMobile ? 5 : 0}}
                      size={18}
                      icon={"map"}
                    />
                    <Copy><Bold>{this.props.isMobile ? "" : "Map"}</Bold></Copy>
                  </Row>
                </CardBody>
              </Button>
              <Button onPress={()=>{
                this.props.routePropertiesToggleTab("list")
              }}
              style={{
                alignItems: "center",
                justifyContent:"center",
                flex: 1,
                backgroundColor: this.props.route_properties_toggle_tab == "list" ? this.props.colors.card_color : this.props.colors.gray_color,
                borderRightWidth: 1,
                borderRightColor: this.props.colors.border_color
              }}
              >
                <CardBody style={{padding:10}}>
                  <Row>
                    <Icon
                      style={{marginRight: !this.props.isMobile ? 5 : 0}}
                      size={18}
                      color={this.props.colors.light_text_color}
                      icon={"list"}
                    />
                    <Copy><Bold>{this.props.isMobile ? "" : "List"}</Bold></Copy>
                  </Row>
                </CardBody>
              </Button>


            </Row>
          </Card>
        </Wrapper>

        <Button style={{
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "center",
          width: 50
        }} onPress={()=>{
          this.props.toggleActionSheet("route_more");
        }}>
          <Icon
            icon={"more-vert"}
            size={28}
          />
        </Button>

      </Row>
    )
  }

  render(){

    if(this.props.route_properties_toggle_tab === "map" && this.props.list_view != true){
      return(
        <Wrapper
        style={{
          position:"absolute",
          top: 0,
          left: 0,
          right: 0
        }}>
          <Card style={{
            marginTop: this.props.isIphoneX ? 42 : this.props.platform == "ios" ? 25 : 12, alignItems: "flex-start", justifyContent: "center", flex: 1, height: this.props.isMobile ? 100 : 65}}>
            {this.renderHeaderBody()}
          </Card>
          <Wrapper style={{
            width: "100%",
            alignItems: "space-between",
            justifyContent: "center"
          }}>
            <Row>
              <Row style={{flex: 1, alignItems: "flex-start", justifyContent: "flex-start"}}>
              </Row>
              <Row style={{flex: 1, justifyContent: "flex-end"}}>
                <MapZoomControl
                  handleZoomControl={this.props.handleZoomControl}
                  isMobile={this.props.isMobile}
                  device={this.props.device}
                />
              </Row>
            </Row>
          </Wrapper>
        </Wrapper>

      )
    }
    return(
      <Wrapper style={{
        marginTop: this.props.isIphoneX ? 42 : this.props.platform == "ios" ? 25 : 12, alignItems: "flex-start", justifyContent: "center",
        height: this.props.isMobile ? 100 : 65, alignItems: "flex-start", justifyContent: "center", margin:10}}>
        {this.renderHeaderBody()}
      </Wrapper>

    )

  }
}

export default RouteHeader;
