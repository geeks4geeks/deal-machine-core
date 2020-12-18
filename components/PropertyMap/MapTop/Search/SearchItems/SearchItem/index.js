import React, {Component} from 'react';
import {
  Wrapper,
  Button,
  Title,
  Copy,
  Bold,
  Icon,
  Row
} from 'app/NativeComponents/common';

import {
  formatAddress,
  dismissMobileKeyboard,
  determineMainOwnerInfo
} from 'app/NativeActions';

import PropertyImage from './PropertyImage';



class SearchItem extends Component{

  constructor(props) {
    super(props);

    this.state = {
      main_owner: determineMainOwnerInfo(props.property)
    }
  }

  renderPropertyStatus(){
    if(this.props.user.team_clearance_level > 0 && this.state.main_owner){

      if(this.props.property.deal){
        return (
          <Row>
            <Copy><Bold>{this.state.main_owner.owner_status_info ? this.state.main_owner.owner_status_info.text : "N/A"}</Bold></Copy>
            <Icon
              style={{
                marginLeft: 5
              }}
              color={this.props.colors.success_color}
              icon="check-circle"
              size={18}
            />
          </Row>
        );
      }

      return <Copy><Bold>{this.state.main_owner.owner_status_info ? this.state.main_owner.owner_status_info.text : "N/A"}</Bold></Copy>;
    }

  }

  render(){
    switch(this.props.property.result_type){
      default:

        if(this.props.search_type === "location_only"){
          return(
            <Button onPress={()=>{

              dismissMobileKeyboard();
              this.props.updateMapLocation({
                coordinates: {
                  latitude: parseFloat(this.props.property.location.latitude),
                  longitude: parseFloat(this.props.property.location.longitude),
                  heading: 0
                }
              });
              this.props.clearAutocomplete();

            }}>
              <Wrapper style={{
                padding: 20
              }}>
                <Row>
                  <Wrapper style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 15,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: this.props.colors.gray_color
                  }}>
                    <Icon
                      icon="location-on"
                      size={18}
                      color={this.props.colors.white_text_color}
                      style={{
                      }}
                    />
                  </Wrapper>
                  <Wrapper>
                    <Title>{this.props.property.property_address_full ? this.props.property.property_address_full : ""}</Title>
                  </Wrapper>
                </Row>
              </Wrapper>
            </Button>
          )
        }

        //normal property
        return(
          <Button onPress={()=>{
            dismissMobileKeyboard();
            this.props.lockLocationTracking(false);
            this.props.clearAutocomplete();
            this.props.updateSearchBar({prop: "focused", value: false});

            this.props.updateMapLocation({
              coordinates: {
                latitude: parseFloat(this.props.property.location.latitude),
                longitude: parseFloat(this.props.property.location.longitude),
                heading: 0
              },
              active_property: this.props.property
            });


          }}>
            <Wrapper style={{
              padding: 20
            }}>
              <Row>
                <Wrapper style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15
                }}>
                  <PropertyImage colors={this.props.colors} property={this.props.property}/>
                </Wrapper>
                <Wrapper>
                  {this.renderPropertyStatus(this.props)}
                  <Title>{this.props.user.team_clearance_level > 0 ? this.state.main_owner.owner_name : this.props.property.property_address+" "+this.props.property.property_address2}</Title>
                  <Copy>{this.props.user.team_clearance_level > 0 ? this.props.property.property_address_full : this.props.property.property_address_city+", "+this.props.property.property_address_state+" "+this.props.property.property_address_zip}</Copy>
                </Wrapper>
              </Row>
            </Wrapper>
          </Button>
        )

      break;


      case "google_address":

        //just an address from google...not in our database
        return(
          <Button onPress={()=>{
            dismissMobileKeyboard();

            this.props.updateMapLocation({
              coordinates: {
                latitude: parseFloat(this.props.property.latitude),
                longitude: parseFloat(this.props.property.longitude),
                heading: 0
              },
              active_property: null
            });
            this.props.clearAutocomplete();

          }}>
            <Wrapper style={{
              padding: 20
            }}>
              <Row>
                <Wrapper style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: this.props.colors.gray_color
                }}>
                  <Icon
                    icon="location-on"
                    size={18}
                    color={this.props.colors.white_text_color}
                    style={{
                    }}
                  />
                </Wrapper>
                <Wrapper>
                  <Title>{this.props.property.name && this.props.property.name != "" ? this.props.property.name : this.props.property.full_address ? this.props.property.full_address : ""}</Title>
                  <Copy>{this.props.property.name && this.props.property.name != "" ? this.props.property.full_address ? this.props.property.full_address : "" : ""}</Copy>
                </Wrapper>
              </Row>
            </Wrapper>
          </Button>
        )
      break;

    }

    return <Wrapper />
  }

}


export default React.memo(SearchItem);
