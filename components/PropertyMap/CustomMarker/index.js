import React, { PureComponent } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import DefaultPropertyMarker from './DefaultPropertyMarker'
import DealMarker from './DealMarker'
import LoadingMarker from './LoadingMarker';

class CustomMarker extends PureComponent{

  renderLabelText(property){

    let label = "";
    if(this.props.user.team_clearance_level > 0){
      if(this.props.property_map_options.show_property_label){

        if(this.props.property_map_options.property_label == "owner_lastname"){
          if(property.owner_lastname && property.owner_lastname != ""){
            label = property.owner_lastname;
          }else{
            label = property.owner_name;
          }
        }

        if(property[this.props.property_map_options.property_label]){
          label = property[this.props.property_map_options.property_label]
        }
      }
    }else{
      label = property.property_address_range ? property.property_address_range : "";
    }

    if(label && label != ""){
      if(this.props.zoom > 18.5){
        if(label.length > 7){
          label = label.substring(0,6)+".."
        }
      }else{
        if(label.length > 5){
          label = label.substring(0,5)+".."
        }
      }


      if(this.props.showPropertyMarker){
        return label;
      }else if(this.props.zoom < 18.5){
        return "";
      }

      return label;
    }else{
      return "";
    }


  }

  render(){

    if(this.props.add_deal_loading.some(property => property.property_id == this.props.property.property_id)){

      return <LoadingMarker
                showPropertyMarker={this.props.showPropertyMarker}
                property={this.props.property}
                label={this.renderLabelText(this.props.property)}
                device={this.props.device}
              />

    }

    if(this.props.property.deal){
      //this property is a deal in the users account
      return <DealMarker
                showPropertyMarker={this.props.showPropertyMarker}
                is_active_property={
                  this.props.active_property ?
                    this.props.active_property.property_id == this.props.property.property_id ? true : false
                  : false }
                property={this.props.property}
                device={this.props.device}
                label={this.renderLabelText(this.props.property)}
              />
    }

    return(
      <DefaultPropertyMarker
        showPropertyMarker={this.props.showPropertyMarker}
        is_active_property={
          this.props.active_property ?
            this.props.active_property.property_id == this.props.property.property_id ? true : false
          : false }
        property={this.props.property}
        label={this.renderLabelText(this.props.property)}
      />
    )



  }
}


export default CustomMarker;
