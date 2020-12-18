import React from 'react';
import {
  Wrapper,
  Row,
  Spin,
  Copy,
  Scroll,
  Icon,
  Button,
  Title
} from 'app/NativeComponents/common';

import SearchItem from './SearchItem';

import{
  dismissMobileKeyboard,
  getMyLocation
} from 'app/NativeActions';

const renderAutocompeleteError = (props) =>{
  if(props.autocomplete_error){
    return(
      <Wrapper style={{
        padding: 20
      }}>
        <Row>
          <Copy>No results found.</Copy>
        </Row>
      </Wrapper>
    )
  }
}

const renderAddLeadButton = (props) => {
  if(props.search_type !== "location_only"){
    return(
      <Button onPress={()=>{
        dismissMobileKeyboard();
        // go to manual address enter
        //props.selectActiveProperty(null);
        props.appRedirect({redirect: "goForward", payload: {add: "manually-add-lead"}});
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
              backgroundColor: props.colors.gray_color
            }}>
              <Icon
                icon="edit"
                size={18}
                color={props.colors.white_text_color}
                style={{
                }}
              />
            </Wrapper>
            <Copy>Manually Add Lead</Copy>
          </Row>
        </Wrapper>
      </Button>
    )
  }
}

const SearchItems = (props) => {


  if(props.autocomplete_loading){
    return (
      <Wrapper style={{
        padding: 15
      }}>
        <Row>
          <Wrapper style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10
          }}>
            <Spin size="small" />
          </Wrapper>
          <Copy>Searching properties and owners...</Copy>
        </Row>
      </Wrapper>
    )
  }

  if(props.focused || props.autocomplete_items.length > 0){
    return(
      <Scroll
      keyboardShouldPersistTaps={"always"}
      style={{
        maxHeight: props.searchItemsMaxHeight ? props.searchItemsMaxHeight : 350,

      }}>
        {props.autocomplete_items.map((item, i)=>{
          return(
            <SearchItem
              key={i}
              property={item}
              {...props}
            />
          )
        })}
        {renderAutocompeleteError(props)}

        {renderAddLeadButton(props)}

        <Button onPress={()=>{
          dismissMobileKeyboard();

          if(!props.track_route){
            getMyLocation({
              success: (coordinates)=>{
                props.updateMapLocation({
                  coordinates: {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    heading: 0
                  },
                  active_property: null
                });
              },
              onError:()=>{
              }
            });
          }else{
            props.lockLocationTracking(true);
          }


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
                borderRadius: 20,
                backgroundColor: props.colors.gray_color
              }}>
                <Icon
                  icon="location-on"
                  size={18}
                  color={props.colors.white_text_color}
                  style={{
                  }}
                />
              </Wrapper>
              <Copy>Current Location</Copy>
            </Row>
          </Wrapper>
        </Button>



      </Scroll>
    );

  }



  return <Wrapper />

}


export default SearchItems;
