import React, { Component } from 'react';
import {
  Wrapper,
  Button,
  Copy,
  Bold,
  Row,
  Icon,
  Spin
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';


import {
  startMailers
} from 'app/NativeActions';

class PropertyStatusButton extends Component{

  constructor(props){
    super(props);

    this.state = {
      temp_status: null
    }
  }

  updateTempStatus(status = null){
    this.setState({temp_status: status})
  }

  render(){
    if(this.props.property.deal){


      if(this.props.user.team_clearance_level > 0){
        if(this.props.active_property && !this.props.bypass_start_mailers_button){
          if(
            this.props.property.deal.deal_status_slug === "pending_approval" && this.props.isMobile &&
            parseInt(this.props.property.property_id) === parseInt(this.props.active_property.property_id)
          ){

            return (
              <Row>
                <Wrapper style={{
                  margin: 15,
                  marginLeft: 10,
                  marginRight: 5
                }}>
                  <PillButton onPress={()=>{
                    startMailers({props: this.props, properties: [this.props.property]})

                  }}
                  primary={true}
                  style={{
                    borderRadius: this.props.isMobile ? 30 : 30,
                    margin: 0
                  }}
                  innerStyle={{
                    padding: this.props.isMobile ? 15 : 15,
                    paddingTop: this.props.isMobile ? 10 : 5,
                    paddingBottom: this.props.isMobile ? 10 : 5,
                  }}
                  >
                    {parseInt(this.props.property.deal.campaign_id) !== 0 ? "Start Campaign" : "Start Mailers"}
                  </PillButton>
                </Wrapper>
              </Row>
            );

          }
        }

        if(this.state.temp_status){
          return(
            <Row>
              <Wrapper
                style={{
                  borderWidth: 1,
                  borderColor: this.props.colors.border_color,
                  borderStyle: "solid",
                  borderRadius: this.props.isMobile ? 30 : 30,
                  padding: this.props.isMobile ? 15 : 15,
                  paddingTop: this.props.isMobile ? 10 : 5,
                  paddingBottom: this.props.isMobile ? 10 : 5,
                  margin: 15,
                  marginRight: 5,
                  marginLeft: 10,
                  backgroundColor: this.props.colors.card_color
                }}
              >
                <Row style={{
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}>
                  <Wrapper>
                    <Copy style={{fontSize: 12}}>
                      {this.state.temp_status.title}
                    </Copy>
                  </Wrapper>
                  <Icon
                    size={14}
                    icon={"keyboard-arrow-down"}
                    style={{
                      marginLeft: 5
                    }}
                  />
                </Row>
              </Wrapper>
            </Row>
          )
        }



        return (
          <Row>
            <Button onPress={()=>{
              this.props.setStatusModal({
                title: "Edit Lead Status",
                description: "Select a new status for "+this.props.property.property_address+".",
                type: "edit_status_for_lead",
                selected_leads:[this.props.property],
                selected_status: this.props.property.deal.deal_status_id,
                modalAction: ({selected_leads, selected_status})=>{
                  //trigger add to list
                  this.props.updateLead({
                    token: this.props.token,
                    type: "edit_status_for_lead",
                    deal_status: selected_status,
                    deal_ids: selected_leads.map((property)=>{
                        return property.deal.id;
                    }).join(),
                    onSuccess:()=>{
                      this.updateTempStatus()
                    }
                  })
                },
                popoverTarget: this.props._property_status_button && !this.props.isMobile ? this.props._property_status_button.current : null,
                popoverPlacement: "left",
                cancelAction:()=>{
                  this.updateTempStatus()
                },
                fieldsUpdated:(fields)=>{
                  this.updateTempStatus({title: fields.status_title})
                }
              });
              this.props.appRedirect({redirect: "goForward", payload: {add: "lead-status"}})
            }}

            >
              <Wrapper style={{
                borderWidth: 1,
                borderColor: this.props.colors.border_color,
                borderStyle: "solid",
                borderRadius: this.props.isMobile ? 30 : 30,
                padding: this.props.isMobile ? 15 : 15,
                paddingTop: this.props.isMobile ? 10 : 5,
                paddingBottom: this.props.isMobile ? 10 : 5,
                margin: 15,
                marginLeft: 10,
                marginRight: 5,
                backgroundColor: this.props.colors.card_color
              }}>
                <Row style={{
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}>
                  <Wrapper>
                    <Copy style={{fontSize: 12}}>
                      {this.props.property.deal.deal_status_title}
                    </Copy>
                  </Wrapper>
                  <Icon
                    size={14}
                    icon={"keyboard-arrow-down"}
                    style={{
                      marginLeft: 5
                    }}
                  />
                </Row>
              </Wrapper>
            </Button>
          </Row>
        );

      }


      //status if the user is a dealfinder
      return(
        <Wrapper style={{
          margin: 15,
          marginLeft: 10,
          marginRight: 5,
          marginBottom: 10
        }}>
          <Row style={{
            alignItems: "center",
            justifyContent: "flex-start"
          }}
          >
            <Wrapper style={{
              flex: 1
            }}>
              <Copy>
              {
                parseInt(this.props.user.id) !== parseInt(this.props.property.deal.creator_id) ?
                "Added by "+this.props.property.deal.creator_firstname+" "+this.props.property.deal.creator_lastname :
                "You added this property"
              }

              </Copy>
            </Wrapper>
          </Row>
        </Wrapper>
      );



    }

    if(this.props.add_deal_loading ? this.props.add_deal_loading.some(property => property.property_id === this.props.property.property_id) : false){
      return(
        <Row>
          <Wrapper
            style={{
              borderWidth: 1,
              borderColor: this.props.colors.border_color,
              borderStyle: "solid",
              borderRadius: this.props.isMobile ? 30 : 30,
              padding: this.props.isMobile ? 15 : 15,
              paddingTop: this.props.isMobile ? 10 : 5,
              paddingBottom: this.props.isMobile ? 10 : 5,
              margin: 15,
              marginLeft: 10,
              marginRight: 5
            }}
            >
            <Row style={{
              alignItems: "center",
              justifyContent: "flex-start"
            }}>
              <Wrapper style={{marginRight: 5, alignItems: "center",justifyContent: "center", height: 10}}>
                <Spin size="small" />
              </Wrapper>
              <Wrapper>
                <Copy style={{fontSize: 12}}>
                  Adding Lead...
                </Copy>
              </Wrapper>

            </Row>
          </Wrapper>
        </Row>
      )
    }


    return (
      <Row>
        <Button onPress={()=>{
          this.props.addDeal({
            token: this.props.token,
            add_type: this.props.no_active ? "no_active" : "",
            property: this.props.property,
            route_id: this.props.current_route ?
              this.props.current_route.route_id : 0,
            address: this.props.property.property_address,
            address2: this.props.property.property_address2,
            city: this.props.property.property_address_city,
            state: this.props.property.property_address_state,
            zip: this.props.property.property_address_zip,
            devicetype: this.props.isMobile ? "mobile_map" : this.props.device+"_map"

          })
        }}

        >
          <Wrapper style={{
            borderWidth: 1,
            borderColor: this.props.colors.border_color,
            borderStyle: "solid",
            borderRadius: this.props.isMobile ? 30 : 30,
            padding: this.props.isMobile ? 15 : 15,
            paddingTop: this.props.isMobile ? 10 : 5,
            paddingBottom: this.props.isMobile ? 10 : 5,
            margin: 15,
            marginLeft: 10,
            marginRight: 5
          }}>
            <Row style={{
              alignItems: "center",
              justifyContent: "flex-start"
            }}>
              <Icon
                size={14}
                icon={"add"}
                style={{
                  marginRight: 5
                }}
              />
              <Wrapper>
                <Copy style={{fontSize: 12}}>
                  Add Lead
                </Copy>
              </Wrapper>

            </Row>
          </Wrapper>
        </Button>
      </Row>
    );
  }
}

export default PropertyStatusButton;
