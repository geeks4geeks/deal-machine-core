import React from 'react';
import {
  Wrapper,
  Card,
  Button,
  Icon,
  Row,
  Copy,
  Bold,
  Title
} from 'app/NativeComponents/common';

import moment from 'moment';

const TrackingBar = (props) =>{

  if(props.track_route &&
    !props.autocomplete_loading &&
    !props.focused &&
    props.autocomplete_items.length == 0 &&
    (props.device === "mobile" || props.isMobile)

  ){
    return (
        <Wrapper style={props.device == "desktop" ? {
          borderTopColor: props.colors.border_color,
          borderTopWidth: 1,
          borderTopStyle: "solid",
          width: "100%",
          backgroundColor: props.colors.background_color
        } : {
          borderTopColor: props.colors.border_color,
          borderTopWidth: 1,
          width: "100%",
          backgroundColor: props.colors.background_color
        }}>
          <Row style={{
            paddingLeft: 10,
            paddingRight: 10,

          }}>

            <Wrapper style={{
              flex: 1, height: 65,
                alignItems: "center",
                justifyContent: "center"
            }}>
            <Row style={{
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 600,
              width: "100%"
            }}>
              <Wrapper style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Copy style={{fontSize: 10}}>Deals Added:</Copy>
                <Title style={{fontSize: 16}}>{props.total_deals_added}</Title>
              </Wrapper>
              <Wrapper style={{
                marginLeft: 15,
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Copy style={{fontSize: 10}}>Miles Driven:</Copy>
                <Title style={{fontSize: 16}}>{props.total_miles} mi</Title>
              </Wrapper>
              <Wrapper style={{
                marginLeft: 15,
                 flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Copy style={{fontSize: 10}}>Time Driven:</Copy>
                <Title style={{fontSize: 16}}>{props.total_time}</Title>
              </Wrapper>

              <Wrapper style={{
                height: 65,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Button onPress={()=>{
                  if(props.map_mode != "glide"){
                    props.selectActiveProperty(null);
                  }
                  if(props.current_route){

                    props.setModal({
                      title: "Are you finished with your drive?",
                      description: 'Are you sure you want to stop driving and complete your route?',
                      submit: 'Stop Driving',
                      onPress: ()=>{
                        props.stopTrackedRoute({
                          token: props.token,
                          route_id: props.current_route.route_id,
                          start_time: props.current_route_section ? props.current_route_section.start_time : moment().format("YYYY-MM-DD HH:mm:ss"),
                          coordinates: props.current_route_section ? props.current_route_section.coordinates : [],
                          current_route: props.current_route
                        });
                      },
                      cancel: 'Not yet',
                      onCancel: ()=>{
                      }
                    });
                    props.toggleModal({show: true, type: "normal"});

                  }

                }}>
                  <Card style={{
                    borderRadius: 30,
                    padding: 5,
                    paddingRight: 10,
                    paddingLeft: 10,
                    backgroundColor: props.colors.error_color,

                    alignSelf: "flex-start"
                  }}>
                    <Row>
                      <Wrapper>
                        <Row>
                          <Wrapper style={{marginRight: 5, alignItems: "center",justifyContent: "center"}}>
                            <Icon
                              icon="stop"
                              size={20}
                              color={props.colors.white_text_color}
                            />
                          </Wrapper>
                          <Wrapper>
                            <Copy style={{color: props.colors.white_text_color}}><Bold>Stop</Bold></Copy>
                          </Wrapper>
                        </Row>
                      </Wrapper>

                    </Row>
                  </Card>
                </Button>


              </Wrapper>

            </Row>
            </Wrapper>
          </Row>
        </Wrapper>
    )
  }

  return <Wrapper />;
}


export default React.memo(TrackingBar);
