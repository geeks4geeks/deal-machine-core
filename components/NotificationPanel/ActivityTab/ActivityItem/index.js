import React, { Component } from 'react';
import {
  Wrapper,
  Row,
  ProfilePic,
  Copy,
  Bold,
  Icon,
  Button
} from 'app/NativeComponents/common';

import {
  openUrl,
  renderDate
} from 'app/NativeActions';

import moment from 'moment';

import ActivityImage from './ActivityImage'

class ActivityItem extends Component{

  render(){
    switch(this.props.item.activity_type){

      case "leads_added":

        if(this.props.item.activity_number == 1){
          return(
            <Button onPress={()=>{
              this.props.appRedirect({redirect: "property", payload:{property_id: "3"+this.props.item.lead_id, dashboard: this.props.isMobile ? false : true}})
            }} style={{padding: 20}}>
              <Row style={{alignItems:"flex-start"}}>
                <ProfilePic
                  size={36}
                  email={this.props.item.user_email}
                  image={this.props.item.user_image}
                  style={{marginTop: 2, marginRight: 10}}
                />
                <Wrapper style={{flex: 1}}>
                  <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> added <Bold>{this.props.item.lead_address}</Bold></Copy>
                  <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created)}</Copy>

                  <ActivityImage {...this.props}/>
                </Wrapper>
                <Wrapper style={{alignItems: "center", justifyContent: "center", width: 50}}>
                  <Icon size={18} icon="keyboard-arrow-right" />
                </Wrapper>
              </Row>
            </Button>
          )
        }

        return (
          <Button onPress={()=>{
            let lead_text = this.props.item.activity_number == 1 ? "1 lead" : this.props.item.activity_number+" leads";
            this.props.setActivityPropertiesType({
              title: "Showing "+lead_text+" added by "+this.props.item.user_firstname+" "+this.props.item.user_lastname+" on "+renderDate(this.props.item.date_created, true),
              slug: this.props.item.activity_type,
              date: moment(this.props.item.date_created).format("YYYY-MM-DD"),
              team_member_id: this.props.item.user_id
            })
            this.props.appRedirect({redirect: "notification_leads"})
          }} style={{padding: 20}}>
            <Row style={{alignItems:"flex-start"}}>
              <ProfilePic
                size={36}
                email={this.props.item.user_email}
                image={this.props.item.user_image}
                style={{marginTop: 2, marginRight: 10}}
              />
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> added <Bold>{this.props.item.activity_number}</Bold> {this.props.item.activity_number == 1 ? "lead" : "leads"}</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created, true)}</Copy>
              </Wrapper>
              <Wrapper style={{alignItems: "center", justifyContent: "center", width: 50}}>
                <Icon size={18} icon="keyboard-arrow-right" />
              </Wrapper>
            </Row>
          </Button>
        )
      break;


      case "build_list":

        if(this.props.item.activity_number == 1){
          return(
            <Button onPress={()=>{
              this.props.appRedirect({redirect: "property", payload:{property_id: "3"+this.props.item.lead_id, dashboard: this.props.isMobile ? false : true}})
            }} style={{padding: 20}}>
              <Row style={{alignItems:"flex-start"}}>
                <ProfilePic
                  size={36}
                  email={this.props.item.user_email}
                  image={this.props.item.user_image}
                  style={{marginTop: 2, marginRight: 10}}
                />
                <Wrapper style={{flex: 1}}>
                  <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> created the list <Bold>{this.props.item.activity_description}</Bold> and generated the lead <Bold>{this.props.item.lead_address}</Bold></Copy>
                  <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created)}</Copy>
                  <ActivityImage {...this.props}/>
                </Wrapper>
                <Wrapper style={{alignItems: "center", justifyContent: "center", width: 50}}>
                  <Icon size={18} icon="keyboard-arrow-right" />
                </Wrapper>
              </Row>
            </Button>
          )
        }

        return (
          <Button onPress={()=>{
            let lead_text = this.props.item.activity_number == 1 ? "1 lead" : this.props.item.activity_number+" leads";
            this.props.setActivityPropertiesType({
              title: "Showing "+lead_text+" generated from the list "+this.props.item.activity_description+" on "+renderDate(this.props.item.date_created, true),
              slug: this.props.item.activity_type,
              date: moment(this.props.item.date_created).format("YYYY-MM-DD"),
              team_member_id: this.props.item.user_id
            })
            this.props.appRedirect({redirect: "notification_leads"})
          }} style={{padding: 20}}>
            <Row style={{alignItems:"flex-start"}}>
              <ProfilePic
                size={36}
                email={this.props.item.user_email}
                image={this.props.item.user_image}
                style={{marginTop: 2, marginRight: 10}}
              />
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> created the list <Bold>{this.props.item.activity_description}</Bold> and generated <Bold>{this.props.item.activity_number}</Bold> {this.props.item.activity_number == 1 ? "lead" : "leads"}</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created, true)}</Copy>
              </Wrapper>
              <Wrapper style={{alignItems: "center", justifyContent: "center", width: 50}}>
                <Icon size={18} icon="keyboard-arrow-right" />
              </Wrapper>
            </Row>
          </Button>
        )
      break;

      case "mailers_sent":

        return (
          <Button onPress={()=>{
            let lead_text = this.props.item.activity_number == 1 ? "1 mailer" : this.props.item.activity_number+" mailers";
            this.props.setActivityPropertiesType({
              title: "Showing "+lead_text+" sent on "+renderDate(this.props.item.date_created, true),
              slug: this.props.item.activity_type,
              date: moment(this.props.item.date_created).format("YYYY-MM-DD"),
            })
            this.props.appRedirect({redirect: "notification_leads"})
          }} style={{padding: 20}}>
            <Row style={{alignItems:"flex-start"}}>
              <Wrapper
                size={36}
                style={{
                  marginRight: 10,
                  width:36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: this.props.colors.gray_color,
                  alignItems:"center",
                  justifyContent: "center"
                }}
              >
                <Icon size={18} icon="mail" />
              </Wrapper>
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.activity_number}</Bold> {this.props.item.activity_number == 1 ? "mailer sent" : "mailers sent"}</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created, true)}</Copy>
              </Wrapper>

              <Wrapper style={{alignItems: "center", justifyContent: "center", width: 50}}>
                <Icon size={18} icon="keyboard-arrow-right" />
              </Wrapper>
            </Row>
          </Button>
        );

      case "skip_trace":


        if(this.props.item.activity_number == 1){
          return(
            <Button onPress={()=>{
              this.props.appRedirect({redirect: "property", payload:{property_id: "3"+this.props.item.lead_id, dashboard: this.props.isMobile ? false : true}})
            }} style={{padding: 20}}>
              <Row style={{alignItems:"flex-start"}}>
                <ProfilePic
                  size={36}
                  email={this.props.item.user_email}
                  image={this.props.item.user_image}
                  style={{marginTop: 2, marginRight: 10}}
                />
                <Wrapper style={{flex: 1}}>
                  <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> skip traced <Bold>{this.props.item.lead_address}</Bold></Copy>
                  <Copy>{this.props.item.activity_number_2 > 0 ? "Skip trace successful" : "Skip trace failed"} </Copy>
                  <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created)}</Copy>
                  <ActivityImage {...this.props}/>
                </Wrapper>
                <Wrapper style={{alignItems: "center", justifyContent: "center", width: 50}}>
                  <Icon size={18} icon="keyboard-arrow-right" />
                </Wrapper>
              </Row>
            </Button>
          )
        }
        return (
          <Button onPress={()=>{
            let lead_text = this.props.item.activity_number == 1 ? "1 lead" : this.props.item.activity_number+" leads";
            this.props.setActivityPropertiesType({
              title: "Showing "+lead_text+" skip traced by "+this.props.item.user_firstname+" "+this.props.item.user_lastname+" on "+renderDate(this.props.item.date_created, true),
              slug: this.props.item.activity_type,
              date: moment(this.props.item.date_created).format("YYYY-MM-DD"),
              team_member_id: this.props.item.user_id
            })
            this.props.appRedirect({redirect: "notification_leads"})
          }} style={{padding: 20}}>
            <Row style={{alignItems:"flex-start"}}>
              <ProfilePic
                size={36}
                email={this.props.item.user_email}
                image={this.props.item.user_image}
                style={{marginTop: 2, marginRight: 10}}
              />
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> skip traced <Bold>{this.props.item.activity_number}</Bold> {this.props.item.activity_number == 1 ? "lead" : "leads"}</Copy>
                <Copy>{this.props.item.activity_number_2} of {this.props.item.activity_number} successful</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created, true)}</Copy>
              </Wrapper>
              <Wrapper style={{alignItems: "center", justifyContent: "center", width: 50}}>
                <Icon size={18} icon="keyboard-arrow-right" />
              </Wrapper>
            </Row>
          </Button>
        );

      case "export":
        return (
          <Wrapper style={{padding: 20}}>

            <Row style={{alignItems:"flex-start"}}>
              <ProfilePic
                size={36}
                email={this.props.item.user_email}
                image={this.props.item.user_image}
                style={{marginTop: 2, marginRight: 10}}
              />
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> exported leads</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created)}</Copy>
                <Button style={{marginTop: 5}} onPress={()=>{
                  openUrl(this.props.item.activity_description);
                }}>
                  <Row>
                    <Icon
                      size={14}
                      icon={"get-app"}
                      style={{marginRight: 5}}
                    />
                    <Copy>Download CSV</Copy>
                  </Row>
                </Button>
              </Wrapper>

            </Row>
          </Wrapper>
        );

      case "bulk_import":
        return (
          <Wrapper style={{padding: 20}}>
            <Row style={{alignItems:"flex-start"}}>
              <ProfilePic
                size={36}
                email={this.props.item.user_email}
                image={this.props.item.user_image}
                style={{marginTop: 2, marginRight: 10}}
              />
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> imported a list. <Bold>{this.props.item.activity_number}</Bold> of <Bold>{this.props.item.activity_number_2}</Bold> were successfully imported.</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created)}</Copy>
              </Wrapper>
            </Row>
          </Wrapper>
        );

      case "routes":

        return (
          <Button onPress={()=>{
            let lead_text = this.props.item.activity_number == 1 ? "1 lead" : this.props.item.activity_number+" leads";
            this.props.setActivityPropertiesType({
              title: "Showing "+lead_text+" added by "+this.props.item.user_firstname+" "+this.props.item.user_lastname+" during their drive on "+renderDate(this.props.item.date_created),
              slug: this.props.item.activity_type,
              route_id: this.props.item.activity_id,
              team_member_id: this.props.item.user_id
            })
            this.props.appRedirect({redirect: "notification_leads"})

          }} style={{padding: 20}}>
            <Row style={{alignItems:"flex-start"}}>
              <ProfilePic
                size={36}
                email={this.props.item.user_email}
                image={this.props.item.user_image}
                style={{marginTop: 2, marginRight: 10}}
              />
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> drove <Bold>{this.props.item.activity_number_2 && this.props.item.activity_number_2 != "" ? parseFloat(this.props.item.activity_number_2).toFixed(2) : "0"}</Bold> miles adding <Bold>{this.props.item.activity_number}</Bold> {this.props.item.activity_number == 1 ? "lead" : "leads"}</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created)}</Copy>
                <ActivityImage {...this.props}/>

              </Wrapper>
              <Wrapper style={{alignItems: "center", justifyContent: "center", width: 50}}>
                <Icon size={18} icon="keyboard-arrow-right" />
              </Wrapper>
            </Row>
          </Button>
        );

      case "notes":
        return (
          <Button onPress={()=>{
            this.props.appRedirect({redirect: "property", payload:{property_id: "3"+this.props.item.lead_id, dashboard: this.props.isMobile ? false : true}})

          }} style={{padding: 20}}>
            <Row style={{alignItems:"flex-start"}}>
              <ProfilePic
                size={36}
                email={this.props.item.user_email}
                image={this.props.item.user_image}
                style={{marginTop: 2, marginRight: 10}}
              />
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> wrote a note for <Bold>{this.props.item.lead_address}</Bold>.</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created)}</Copy>
                <Copy>{this.props.item.activity_description}</Copy>
              </Wrapper>
            </Row>
          </Button>
        )

      default:
        return (
          <Wrapper style={{padding: 20}}>
            <Row style={{alignItems:"flex-start"}}>
              <ProfilePic
                size={36}
                email={this.props.item.user_email}
                image={this.props.item.user_image}
                style={{marginTop: 2, marginRight: 10}}
              />
              <Wrapper style={{flex: 1}}>
                <Copy><Bold>{this.props.item.user_firstname+" "+this.props.item.user_lastname}</Bold> {this.props.item.activity_title}.</Copy>
                <Copy style={{color: this.props.colors.light_text_color, fontSize: 12}}>{renderDate(this.props.item.date_created)}</Copy>
              </Wrapper>
            </Row>
          </Wrapper>
        )
    }

    return <Wrapper />
  }

}

export default ActivityItem;
