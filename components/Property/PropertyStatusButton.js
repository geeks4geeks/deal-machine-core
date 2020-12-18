import React, { Component } from 'react';
import {
  Wrapper,
  Button,
  Copy,
  Row,
  Icon,
  Spin
} from 'app/NativeComponents/common';

class PropertyStatusButton extends Component{

  constructor(props){
    super(props);
    this._edit_lead_status_button = React.createRef();

    this.state = {
      temp_status: null
    }

  }


  updateTempStatus(item = null){
    this.setState({
      temp_status: item
    })
  }


  render(){
    if(this.props.active_property.deal){
      if(this.props.user.team_clearance_level > 0){

        if(this.state.temp_status){
          return(
            <Row>
              <Wrapper wrapper_ref={this._edit_lead_status_button}>
                <Wrapper
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.colors.white_text_color,
                    borderStyle: "solid",
                    borderRadius: this.props.isMobile ? 40 : 30,
                    padding: this.props.isMobile ? 20 : 15,
                    paddingTop: this.props.isMobile ? 10 : 5,
                    paddingBottom: this.props.isMobile ? 10 : 5,
                    backgroundColor: "rgba(31,41,51,0.25)"
                  }}
                >
                  <Row style={{
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}>
                    <Wrapper>
                      <Copy style={{fontSize: 12, color: this.props.colors.white_text_color}}>
                        {this.state.temp_status.status_title}
                      </Copy>
                    </Wrapper>
                    <Icon
                      size={14}
                      icon={"keyboard-arrow-down"}
                      color={this.props.colors.white_text_color}
                      style={{
                        marginLeft: 5
                      }}
                    />
                  </Row>
                </Wrapper>
              </Wrapper>
            </Row>
          )
        }

        return (
          <Row>
            <Wrapper wrapper_ref={this._edit_lead_status_button}>
              <Button onPress={()=>{
                this.props.setStatusModal({
                  title: "Edit Lead Status",
                  description: "Select a new status for "+this.props.active_property.property_address+".",
                  type: "edit_status_for_lead",
                  selected_leads:[this.props.active_property],
                  selected_status: this.props.active_property.deal.deal_status_id,
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
                  cancelAction:()=>{
                    this.updateTempStatus()
                  },
                  fieldsUpdated:(fields)=>{
                    this.updateTempStatus(fields)
                  },
                  popoverTarget: !this.props.isMobile ? this._edit_lead_status_button.current : null,
                  popoverPlacement: "bottom"

                });
                this.props.appRedirect({redirect: "goForward", payload: {add: "lead-status"}})
              }}
              style={{
                borderWidth: 1,
                borderColor: this.props.colors.white_text_color,
                borderStyle: "solid",
                borderRadius: this.props.isMobile ? 40 : 30,
                padding: this.props.isMobile ? 20 : 15,
                paddingTop: this.props.isMobile ? 10 : 5,
                paddingBottom: this.props.isMobile ? 10 : 5,
                backgroundColor: "rgba(31,41,51,0.25)"
              }}
              >
                <Row style={{
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}>
                  <Wrapper>
                    <Copy style={{fontSize: 12, color: this.props.colors.white_text_color}}>
                      {this.props.active_property.deal.deal_status_title}
                    </Copy>
                  </Wrapper>
                  <Icon
                    size={14}
                    icon={"keyboard-arrow-down"}
                    color={this.props.colors.white_text_color}
                    style={{
                      marginLeft: 5
                    }}
                  />
                </Row>
              </Button>
            </Wrapper>
          </Row>
        );

      }


      //status if the user is a dealfinder
      return(
        <Wrapper>
          <Row style={{
            alignItems: "center",
            justifyContent: "flex-start"
          }}
          >

          </Row>
        </Wrapper>
      );



    }

    if(this.props.add_deal_loading.some(property => property.property_id === this.props.active_property.property_id)){
      return(
        <Row>
          <Wrapper
            style={{
              borderWidth: 1,
              borderColor: this.props.colors.white_text_color,
              borderStyle: "solid",
              borderRadius: this.props.isMobile ? 40 : 30,
              padding: this.props.isMobile ? 20 : 15,
              paddingTop: this.props.isMobile ? 10 : 5,
              paddingBottom: this.props.isMobile ? 10 : 5,
              backgroundColor: "rgba(31,41,51,0.25)"
            }}
            >
            <Row style={{
              alignItems: "center",
              justifyContent: "flex-start"
            }}>
              <Wrapper style={{marginRight: 5, alignItems: "center",justifyContent: "center", height: 10}}>
                <Spin size="small" color={this.props.colors.white_text_color}/>
              </Wrapper>
              <Wrapper>
                <Copy style={{fontSize: 12, color: this.props.colors.white_text_color}}>
                  Adding Lead...
                </Copy>
              </Wrapper>

            </Row>
          </Wrapper>
        </Row>
      )
  }

    return(
      <Row>
        <Button onPress={()=>{

          if(!this.props.active_property.deal &&
            !this.props.add_deal_loading.some(loading_property =>
              loading_property.property_id === this.props.active_property.property_id
            )
          ){
            this.props.addDeal({
              token: this.props.token,
              property: this.props.active_property,
              route_id: this.props.current_route ?
                this.props.current_route.route_id : 0,
              address: this.props.active_property.property_address,
              address2: this.props.active_property.property_address2,
              city: this.props.active_property.property_address_city,
              state: this.props.active_property.property_address_state,
              zip: this.props.active_property.property_address_zip,
              devicetype: this.props.isMobile ? "mobile_map" : this.props.device+"_map"
            })
          }

        }}
        style={{
          borderWidth: 1,
          borderColor: this.props.colors.white_text_color,
          borderStyle: "solid",
          borderRadius: this.props.isMobile ? 40 : 30,
          padding: this.props.isMobile ? 20 : 15,
          paddingTop: this.props.isMobile ? 10 : 5,
          paddingBottom: this.props.isMobile ? 10 : 5,
          backgroundColor: "rgba(31,41,51,0.25)"
        }}
        >
          <Row style={{
            alignItems: "center",
            justifyContent: "flex-start"
          }}>
            <Icon
              size={14}
              icon={"add"}
              color={this.props.colors.white_text_color}
              style={{
                marginRight: 5
              }}
            />
            <Wrapper>
              <Copy style={{fontSize: 12, color: this.props.colors.white_text_color}}>
                Add Lead
              </Copy>
            </Wrapper>

          </Row>
        </Button>
      </Row>
    )
  }
}

export default PropertyStatusButton;
