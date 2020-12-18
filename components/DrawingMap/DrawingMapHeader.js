import React, { PureComponent } from 'react';
import {
  Wrapper,
  Card,
  Row
} from 'app/NativeComponents/common';

import ExpandButton from './ExpandButton';
import MapZoomControl from 'app/DealMachineCore/components/PropertyMap/MapTop/Buttons/MapZoomControl';
import Search from 'app/DealMachineCore/components/PropertyMap/MapTop/Search';

class DrawingMapHeader extends PureComponent{

  render(){
    if(!this.props.is_drawing && !this.props.completed_drawing){
      return(
        <Wrapper
        style={{
          position:"absolute",
          top: 0,
          left: 0,
          right: 0
        }}>
          <Wrapper style={{
            marginTop: !this.props.expand_map ? 10 : this.props.isIphoneX ? 42 : this.props.platform == "ios" ? 25 : 12,
            alignItems: "flex-start", justifyContent: "center", flex: 1,
            height: this.props.isMobile ? "auto" : 65}}>
            <Search
              search_type={"location_only"}
              searchItemsMaxHeight={150}

              {...this.props}
            />
          </Wrapper>
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
                <ExpandButton
                  {...this.props}
                />
              </Row>
            </Row>
          </Wrapper>
        </Wrapper>

      )
    }else if(this.props.device == "mobile"){
      return(
        <Wrapper
        style={{
          position:"absolute",
          top: 0,
          left: 0,
          right: 0
        }} />
      )
    }else{
      return(
        <Wrapper
        style={{
          position:"absolute",
          top: 0,
          left: 0,
          right: 0
        }}>
          <Wrapper style={{
            marginTop: this.props.isIphoneX ? 42 : this.props.platform == "ios" ? 25 : 12, alignItems: "flex-start", justifyContent: "center", flex: 1, height: this.props.isMobile ? "auto" : 65}}>
          </Wrapper>
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
                <ExpandButton
                  {...this.props}
                />
              </Row>
            </Row>
          </Wrapper>
        </Wrapper>

      )
    }

  }
}

export default DrawingMapHeader;
