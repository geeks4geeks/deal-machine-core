import React, { Component } from 'react';

import {
  Wrapper,
  Row,
  Button,
  Spin,
  Copy,
  Icon
} from 'app/NativeComponents/common';

class NextAndPrevPropertyInRoute extends Component{

    componentDidMount(){
      this.getProperties();
    }

    componentDidUpdate(prevProps){
      if(prevProps.active_property.property_id !== this.props.active_property.property_id){
        this.getProperties();
      }
    }

    getProperties(){
      this.props.getProperty({
        token: this.props.token,
        property_id: this.props.active_property.property_id,
        type: "route"
      })
    }

    renderPrevButton(){
      if(this.props.prev_property_in_route){
        return(
          <Button onPress={()=>{
            this.props.updateMapLocation({
              coordinates:{
                latitude: parseFloat(this.props.prev_property_in_route.location.latitude),
                longitude: parseFloat(this.props.prev_property_in_route.location.longitude),
                heading: 0
              },
              active_property: this.props.prev_property_in_route
            });
          }} style={{
            alignItem: "center", justifyContent: "center", flex: 1,
            borderRightWidth: 1,
            borderRightColor: this.props.colors.border_color,
            borderRightStyle: "solid",
            padding: 20
          }}>
            <Row style={{
              alignItem: "center", justifyContent: "center"
            }}>
              <Icon
                size={18}
                icon={"arrow-back"}
                style={{marginRight: 5}}
              />
              <Copy>Previous Property</Copy>
            </Row>
          </Button>
        );
      }

      return <Wrapper style={{flex: 1,
              borderRightWidth: 1,
              borderRightColor: this.props.colors.border_color,
              borderRightStyle: "solid",
              padding: 20
            }}/>;
    }

    renderNextButton(){

      if(this.props.next_property_in_route){
        return(
          <Button onPress={()=>{
            this.props.updateMapLocation({
              coordinates:{
                latitude: parseFloat(this.props.next_property_in_route.location.latitude),
                longitude: parseFloat(this.props.next_property_in_route.location.longitude),
                heading: 0
              },
              active_property: this.props.next_property_in_route
            });

          }} style={{
            alignItem: "center", justifyContent: "center", flex: 1,
            padding: 20
          }}>
            <Row style={{
              alignItem: "center", justifyContent: "center"
            }}>
              <Copy>Next Property</Copy>
              <Icon
                size={18}
                icon={"arrow-forward"}
                style={{marginLeft: 5}}
              />
            </Row>
          </Button>
        );
      }

      return <Wrapper style={{flex: 1,
              borderRightWidth: 1,
              borderRightColor: this.props.colors.border_color,
              borderRightStyle: "solid",
              padding: 20
             }}/>
    }

    render(){

      if(this.props.prev_and_next_properties_loading){
        return(
          <Wrapper style={{
            backgroundColor: this.props.colors.background_color,
            borderTopWidth: 1,
            borderTopColor: this.props.colors.border_color,
            borderTopStyle: "solid",
            padding: 20}}>
            <Row style={{alignItems: "center", justifyContent: "center"}}>
              <Spin size="small"/>
              <Copy style={{marginLeft: 10}}>Loading information...</Copy>
            </Row>
          </Wrapper>
        )
      }

      if(this.props.prev_property_in_route || this.props.next_property_in_route){
        return(
          <Wrapper style={{
            backgroundColor: this.props.colors.background_color,
            borderTopWidth: 1,
            borderTopColor: this.props.colors.border_color,
            borderTopStyle: "solid"}}>
            <Row style={{
              alignItem: "center", justifyContent: "center"
            }}>
              {this.renderPrevButton()}
              {this.renderNextButton()}
            </Row>
          </Wrapper>
        )
      }

      return <Wrapper />;

    }

}



export default NextAndPrevPropertyInRoute
