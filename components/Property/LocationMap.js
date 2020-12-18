import React, { Component } from 'react';
import { Card, Wrapper, ExternalImage, Button } from 'app/NativeComponents/common';
//import { Map } from 'app/NativeComponents/snippets';

import {
  openMap,
  AppConfig
} from 'app/NativeActions';

class LocationMap extends Component {


  handlePress(){
    if(this.props.device === "desktop"){
      window.open("https://www.google.com/maps/place/"+this.props.active_property.property_address_full+"/@="+this.props.active_property.location.latitude+","+this.props.active_property.location.longitude+",18z", "_blank")
    }else{
      openMap({
        latitude: this.props.active_property.location.latitude,
        longitude: this.props.active_property.location.longitude
      })
    }
  }

  componentDidMount(){
    if(this.props.active_property.location.latitude && this.props.active_property.location.longitude){
      //this.props.setLocation({lat: parseFloat(this.props.info.lat), long: parseFloat(this.props.info.long)});
    }
  }

  onRegionChange(region) {
    this.props.regionChange(region)
  }

  componentDidUpdate(prevProps){
	  if(this.props.active_property.location.latitude !== prevProps.active_property.location.latitude || this.props.active_property.location.longitude !== prevProps.active_property.location.longitude){
     	//this.props.setLocation({lat:parseFloat(this.props.active_property.location.latitude), long: parseFloat(this.props.active_property.location.longitude)});
	  }
  }




  render() {
    /*
    const map_image = "https://maps.googleapis.com/maps/api/staticmap?center="+this.props.active_property.location.latitude+","+this.props.active_property.location.longitude+"&zoom=17&size=400x400&maptype=roadmap&key="+AppConfig().google_static_map_api;


    if(
      this.props.active_property.location.latitude != null &&
      this.props.active_property.location.longitude != null
    ){
      return (
        <Button onPress={this.handlePress.bind(this)}>
          <Card>
            <ExternalImage
            style={{
              height: 200,
              width: "100%"
            }}
            image={map_image}
            />
          </Card>
        </Button>
      );
    }
    */

    return <Wrapper />
  }
}

export default LocationMap;
