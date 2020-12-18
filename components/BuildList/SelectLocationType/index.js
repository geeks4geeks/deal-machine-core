import React, { Component } from "react";

import { Wrapper, Row, Title, Copy, Card } from "app/NativeComponents/common";

/*
import {

} from "app/NativeActions";
*/
import NumberCheck from '../NumberCheck'

import LocationSwitchButton from './LocationSwitchButton';
import ZipInput from './ZipInput';
import CityInput from './CityInput';
import DrawingMap from 'app/DealMachineCore/components/DrawingMap';

class SelectLocationType extends Component {

  componentDidUpdate(prevProps, prevState){
    if(this.props.location_type != prevProps.location_type ||
      this.props.city !== prevProps.city ||
      this.props.state !== prevProps.state ||
      this.props.zip !== prevProps.zip ||
      this.props.drawing_coordinates !== prevProps.drawing_coordinates
    ){
      if(this.checkSuccess()){
        this.props.editListBuilderField({prop: "location_success", value: true})
      }else{
        this.props.editListBuilderField({prop: "location_success", value: false})
      }
    }
  }

  renderDrawingMap(){
    if(this.props.location_type == "draw"){
      return(
        <Card style={{
          height: 400,
          width: this.props.device == "desktop" ? "100%" : "auto",
          backgroundColor: this.props.colors.gray_color
        }}>
          <DrawingMap
            map_height={400}
            map_width={this.props.device == "desktop" ? "100%" : "auto"}
            drawing_coordinates={this.props.drawing_coordinates}
            onDrawingSuccess={(coordinates)=>{
              this.props.editListBuilderField({prop: "drawing_coordinates", value: coordinates})
            }}
            onDrawingReset={()=>{
              this.props.editListBuilderField({prop: "drawing_coordinates", value: []})
            }}
            {...this.props}
          />
        </Card>
      )
    }
  }

  checkSuccess(){
    switch(this.props.location_type){
      case "zip":
        if(this.props.zip.length == 5){
          return true;
        }
      break;

      case "city":

        if(this.props.city.length > 0 && this.props.state.length > 0){
          return true;
        }

      break;

      case "draw":
        if(this.props.drawing_coordinates.length > 0){
          return true;
        }
      break;
    }

    return false;
  }

  render() {

    return (
      <Row style={{alignItems: "flex-start"}}>

        <NumberCheck
          number={1}
          colors={this.props.colors}
          is_successful={this.checkSuccess()}
          isMobile={this.props.isMobile}

        />

        <Wrapper style={{flex: 1, }}>
          <Wrapper style={{padding: this.props.isMobile ? 20 : 0, paddingLeft: this.props.isMobile ? 10 : 0, paddingRight: this.props.isMobile ? 10 : 0}}>
            <Title>{this.props.isMobile ? "1.) Choose Your Market:" : "Choose Your Market:"}</Title>
            <Copy>Invest in the hottest areas by zip code, city, or draw a custom boundary line.</Copy>
          </Wrapper>
          <Wrapper style={{padding: 20, paddingLeft: 10, paddingRight: 10}}>
            <Row style={{flexWrap: "wrap", overflow: "visible"}}>
              <LocationSwitchButton onPress={()=>{
                this.props.switchLocationType("zip")
              }}
              is_active={this.props.location_type == "zip" ? true : false}
              title={"Zip Code"} />
              <LocationSwitchButton onPress={()=>{
                this.props.switchLocationType("city")
              }}
              is_active={this.props.location_type == "city" ? true : false}
              title={"City"} />
              <LocationSwitchButton onPress={()=>{
                this.props.switchLocationType("draw")
              }}
              is_active={this.props.location_type == "draw" ? true : false}
              title={"Draw Area"} />
            </Row>
          </Wrapper>
          <ZipInput {...this.props}/>
          <CityInput {...this.props}/>
          {this.renderDrawingMap()}
        </Wrapper>
      </Row>
    )

  }
}


export default SelectLocationType;
