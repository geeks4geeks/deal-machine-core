import React, { Component } from 'react';
import { Row, Card, Wrapper, Copy, Bold, Icon} from 'app/NativeComponents/common';

class BulkEditSubText extends Component{


  renderStatus(deal_status_id, data){

    let deal_status_title = "N/A";
    if(this.props.all_statuses){
      if(this.props.all_statuses.length > 0){
        for(let i = 0; i<this.props.all_statuses.length; i++){
          if(deal_status_id == this.props.all_statuses[i].id){
            deal_status_title = this.props.all_statuses[i].title;

            switch(this.props.all_statuses[i].slug){

              case "in_trash":
              case "won_deal":
              case "lost_deal":
              case "not_interested":
              case "unqualified":
              case "unresponsive":
              case "returned_to_sender":

              break;

              default:
                if(data.approved == 1){
                  deal_status_title += "; Approved for sending;";
                }else if(data.paused == 1){
                  deal_status_title += "; Mailers Paused;";
                }
              break;


            }

          }
        }
      }
    }

    return deal_status_title;


  }

  renderInfo(data){

    if(data.campaign_id != 0){
      return(
        <Wrapper style={{
          padding: 5
        }}>
          <Copy><Bold>Status: </Bold>{this.renderStatus(data.deal_status, data)}</Copy>
          <Copy><Bold>Using Campaign: </Bold>{data.campaign_title && data.campaign_title != "" ? data.campaign_title : "N/A"}</Copy>
        </Wrapper>
      )
    }else{

      let repeat_mail_text = "";
      if(data.resend_freq == 0){
        repeat_mail_text = "Off";
      }else{
        repeat_mail_text = "On; ";

        if(data.resend_freq == 1){
          repeat_mail_text += "Sending every day"
        }else{
          repeat_mail_text += "Sending every "+data.resend_freq+" days";
        }
        if(data.resend_limit == 0){
          repeat_mail_text += "; Repeating forever";
        }else if(data.resend_limit == 1){
          repeat_mail_text += "; Repeating once";
        }else{
          repeat_mail_text += "; Repeating "+data.resend_limit+" times";
        }
      }

      return(
        <Wrapper style={{
          padding: 5
        }}>
          <Copy><Bold>Status: </Bold>{this.renderStatus(data.deal_status, data)}</Copy>
          <Copy><Bold>Using Template: </Bold>{data.mail_template_name && data.mail_template_name != "" ? data.mail_template_name : "N/A"}</Copy>
          <Copy><Bold>Repeat Mail: </Bold>{repeat_mail_text}</Copy>
        </Wrapper>
      )

    }

  }


  render(){

    if(this.props.item.original_data && this.props.item.next_change_log){

      return(
        <Row>
          <Card style={{
            marginLeft: 0,
            flex: 1
          }}>
            {this.renderInfo(this.props.item.original_data)}
          </Card>

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

          <Card style={{
            flex: 1
          }}>
            {this.renderInfo(this.props.item.next_change_log)}
          </Card>


        </Row>
      )


    }


    return <Wrapper />;
  }
}

export default BulkEditSubText;
