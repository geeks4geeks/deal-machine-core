import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Row,
  Icon,
  ProfilePic,
  Title,
  Copy,
  Bold,
  Spin,
  Button
} from 'app/NativeComponents/common';

import {
  appRedirect,
  initEditNote,
  initMailTimeline,
  /* common functions */
  renderActivityCopy
} from 'app/NativeActions'

import ActivityIcon from './ActivityIcon';
import ActivityLoading from './ActivityLoading';
import ActivityDateCreated from './ActivityDateCreated';
import ActivitySubText from './ActivitySubText';

class ActivityItem extends Component{


  renderAddressCount(item, type){
    if(item.addresses && type == "mailed"){
      if(item.addresses.length > 1){
        return "("+item.addresses.length+" addresses)";
      }
    }

    return "";
  }


  render(){


    const { style, user, item, type, team_activity, all_statuses, all_tags } = this.props;

    if(item){

      var title = renderActivityCopy({item: item, user: user})
      var icon = "";
      var fa_icon = "";

      var image = "";
      var image_email = "";

      var detailed_item = false;

      switch(type){
        case "created":
          icon = "home";
        break;

        case "approved":
          icon = "check";
        break;

        case "archived":
          icon = "delete";
        break;

        case "paused":
          icon = "pause";
        break;

        case "closed":
          icon = "attach-money";
        break;

        case "change_log":

          detailed_item = true;

          switch(item.action_type){

            case "approve":
            case "bulk_edit_start_mailers":

              icon = "check";
              detailed_item = false;

            break;

            case "pause":
            case "bulk_edit_pause_mailers":

              icon = "pause";
              detailed_item = false;

            break;

            case "archive":
              icon = "delete";
              detailed_item = false;

            break;

            case "unarchive":
              icon = "restore";
              detailed_item = false;

            break;

            case "close":
              icon = "attach-money";
              detailed_item = false;

            break;

            case "deal_status":
            case "bulk_edit_change_status":

              icon = "edit";

            break;

            case "bulk_edit":
              icon = "list";
    				break;

            case "settings_update":
              icon = "settings";
    				break;

    				case "edit_photo":
              icon = "photo";
    				break;

    				case "mailing_options":
            case "bulk_edit_mailing_option":

              icon = "markunread-mailbox";
    				break;

    				case "owner":
              fa_icon = "id-card";
    				break;

    				case "property_address":
              icon = "place";
    				break;

    				case "purchase_details":
              icon = "edit";
    				break;

    				case "tags":
              fa_icon = "tags";
    				break;

          }


        break;



        case "enhanced_search":
          icon = "search";
        break;

        case "mailed":
          icon = "mail";
        break;

        case "note":
          image_email = item.email;
          image = item.image;
        break;

        default:
        break;
      }

      if(detailed_item == false || (detailed_item == true && this.props.detailed_options == true)){

        if(((type == "note" && item.date_created) || type == "mailed") && !team_activity){
          return (
            <Button onPress={()=>{
              if(type == "note"){
                this.props.initEditNote({note: item});
                this.props.appRedirect({redirect: "goForward", payload:{add: "edit-note"}});
              }else if(type == "mailed"){
                this.props.initMailTimeline({addresses: item.addresses});
                this.props.appRedirect({redirect: "goForward", payload:{add: "mail-timeline"}});
              }
            }}>
              <Row style={{
                padding: 15,
                alignItems: "flex-start"
              }}>
                <ActivityIcon
                  icon={icon}
                  fa_icon={fa_icon}
                  image={image}
                  image_email={image_email}
                  deal_image={item.deal_image}
                  colors={this.props.colors}

                />
                <Wrapper style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <Copy>
                    <Bold>{title}</Bold>
                    {" "}
                    <Bold>{this.renderAddressCount(item, type)}</Bold>
                  </Copy>
                  <ActivitySubText
                    item={item}
                    type={type}
                    all_statuses={all_statuses}
                    all_tags={all_tags}
                    device={this.props.device}
                    colors={this.props.colors}

                  />
                  <ActivityDateCreated
                    type={type}
                    colors={this.props.colors}
                    date_created={item.date_created}
                  />
                </Wrapper>
                <ActivityLoading
                  item={item}
                  type={type}
                />
              </Row>
            </Button>
          );
        }

        if(team_activity){
          return(
            <Button onPress={this.props.onPress}>
              <Row style={{
                padding: 15,
                alignItems: "flex-start"
              }}>
                <ActivityIcon
                  icon={icon}
                  fa_icon={fa_icon}
                  image={image}
                  image_email={image_email}
                  deal_image={item.deal_image}
                  colors={this.props.colors}

                />
                <Wrapper style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <Title>
                    {item.property_address && item.property_address != "" ? item.property_address : item.address}
                  </Title>
                  <Copy>
                    <Bold>{title}</Bold>
                    {" "}
                    <Bold>{this.renderAddressCount(item, type)}</Bold>
                  </Copy>
                  <ActivitySubText
                    item={item}
                    type={type}
                    all_statuses={all_statuses}
                    all_tags={all_tags}
                    device={this.props.device}
                    colors={this.props.colors}

                  />
                  <ActivityDateCreated
                    colors={this.props.colors}
                    date_created={item.date_created}
                  />
                </Wrapper>
                <Wrapper style={{
                  alignSelf: "stretch",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10
                }}>
                  <Icon
                     size={20}
                     icon={"keyboard-arrow-right"}
                  />
                </Wrapper>
              </Row>
            </Button>
          )
        }


        return (
          <Row style={{
            padding: 15,
            alignItems: "flex-start"
          }}>
            <ActivityIcon
              icon={icon}
              fa_icon={fa_icon}
              image={image}
              image_email={image_email}
              colors={this.props.colors}

            />
            <Wrapper style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}>

              <Copy>
                <Bold>{title}</Bold>
                {" "}
                <Bold>{this.renderAddressCount(item, type)}</Bold>
              </Copy>
              <ActivitySubText
                item={item}
                type={type}
                all_statuses={all_statuses}
                all_tags={all_tags}
                device={this.props.device}
                colors={this.props.colors}

              />
              <ActivityDateCreated
                colors={this.props.colors}
                date_created={item.date_created}
              />
            </Wrapper>
            <ActivityLoading
              item={item}
              type={type}
            />
          </Row>
        );
      }

    }

    return <Wrapper />;
  }
}

export default connect(null, {
  appRedirect,
  initEditNote,
  initMailTimeline
})(ActivityItem);
