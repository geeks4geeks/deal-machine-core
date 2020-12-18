import React, { Component } from 'react';
import { Row, Card, Wrapper, Copy, Bold, Icon } from 'app/NativeComponents/common';
import { Map } from 'app/NativeComponents/snippets';

import {
  formatAddress
} from 'app/NativeActions';

class PropertyAddressSubText extends Component{

  renderMap(lat, lng){
    if(this.props.device == "desktop"){
      return(
        <Map
          {...this.props}
          style={{
            height: 100
          }}
          lat={parseFloat(lat)}
          long={parseFloat(lng)}
          initialRegion={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
          }}
          dontGetPosition={true}
          onRegionChange={()=>{}}
          onRegionChangeComplete={()=>{}}
          withMarker={true}
          cacheEnabled={false}
          onPress={()=>{
            if(this.props.device == "desktop"){
              window.open("https://www.google.com/maps/place/"+this.props.item.original_data.property_address+"/@="+this.props.item.original_data.lat+","+this.props.item.original_data.longitude+",18z", "_blank")
            }
          }}
          showsUserLocation={false}
          disableDefaultUI={true}
        />
      )
    }
  }

  render(){

    if(this.props.item.original_data && this.props.item.next_change_log){


        return(
          <Row>
            <Wrapper style={{flex: 1}}>
              <Card style={{
                marginLeft: 0,
                flex: 1
              }}>
                {this.renderMap(this.props.item.original_data.lat, this.props.item.original_data.longitude)}
                <Wrapper style={{padding: 5}}>
                  <Copy style={{fontSize: 10}}>
                    <Bold>
                    {
                      formatAddress({address: {
                        address: this.props.item.original_data.property_address,
                        address2: this.props.item.original_data.property_address2,
                        address_city: this.props.item.original_data.property_address_city,
                        address_state: this.props.item.original_data.property_address_state,
                        address_zip: this.props.item.original_data.property_address_zip
                      }}).line1
                    }
                    </Bold>

                  </Copy>
                  <Copy style={{fontSize: 10}}>
                    {
                      formatAddress({address: {
                        address: this.props.item.original_data.property_address,
                        address2: this.props.item.original_data.property_address2,
                        address_city: this.props.item.original_data.property_address_city,
                        address_state: this.props.item.original_data.property_address_state,
                        address_zip: this.props.item.original_data.property_address_zip
                      }}).line2
                    }
                  </Copy>
                </Wrapper>
              </Card>


            </Wrapper>
            <Wrapper style={{
              margin: 0,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Icon
                 size={12}
                 fa_icon={"arrow-right"}
              />
            </Wrapper>
            <Wrapper style={{
              flex: 1
            }}>
              <Card style={{flex: 1}}>
                {this.renderMap(this.props.item.next_change_log.lat, this.props.item.next_change_log.longitude)}
                <Wrapper style={{padding: 5}}>
                  <Copy style={{fontSize: 10}}>
                    <Bold>
                      {
                        formatAddress({address: {
                          address: this.props.item.next_change_log.property_address,
                          address2: this.props.item.next_change_log.property_address2,
                          address_city: this.props.item.next_change_log.property_address_city,
                          address_state: this.props.item.next_change_log.property_address_state,
                          address_zip: this.props.item.next_change_log.property_address_zip
                        }}).line1
                      }
                    </Bold>
                  </Copy>
                  <Copy style={{fontSize: 10}}>
                    {
                      formatAddress({address: {
                        address: this.props.item.next_change_log.property_address,
                        address2: this.props.item.next_change_log.property_address2,
                        address_city: this.props.item.next_change_log.property_address_city,
                        address_state: this.props.item.next_change_log.property_address_state,
                        address_zip: this.props.item.next_change_log.property_address_zip
                      }}).line2
                    }
                  </Copy>
                </Wrapper>
              </Card>

            </Wrapper>


          </Row>
        )





    }


    return <Wrapper />;
  }
}

export default PropertyAddressSubText;
