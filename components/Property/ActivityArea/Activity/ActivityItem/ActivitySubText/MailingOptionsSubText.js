import React, { Component } from 'react';
import { Row, Card, Wrapper, Copy, Bold, Icon} from 'app/NativeComponents/common';

class MailingOptionsSubText extends Component{


  renderInfo(data){

    if(data.campaign_id != 0){
      return(
        <Wrapper style={{
          padding: 5
        }}>
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
            flex: 1,
            marginLeft: 0

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

export default MailingOptionsSubText;
