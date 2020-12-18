import React, { Component } from 'react';
import {
  Wrapper,
  Icon,
  Button,
  Title,
  Row,
  Copy
} from 'app/NativeComponents/common';

import {
  TemplatePreview
} from 'app/NativeComponents/snippets';

import SendingNextText from './SendingNextText';
import moment from "moment";

class CampaignUpNext extends Component{


  renderPreviews(){
    if(this.props.active_property.deal.mail_template_type == "handwritten"){

      return(
        <Row style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 5,
          paddingBottom: 5
        }}>
          <Wrapper style={{
            padding: 5
          }}>
            <TemplatePreview
              platform={this.props.platform}
              deal_id={this.props.active_property.deal.id}
              date={this.props.preview_info.date}

              template_type={this.props.active_property.deal.mail_template_type}
              token={this.props.token}
              image={this.props.active_property.deal.mailer_preview}
              save_info={true}
              width={150}
            />
          </Wrapper>

          <Wrapper style={{
            padding: 5
          }}>
            <TemplatePreview
              side="back"
              platform={this.props.platform}
              deal_id={this.props.active_property.deal.id}
              date={this.props.preview_info.date}

              token={this.props.token}
              image={this.props.active_property.deal.mailer_preview}
              save_info={true}
              width={150}
            />
          </Wrapper>

        </Row>
      )

    }

    return(
      <Row style={{
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 5,
        paddingBottom: 5
      }}>
        <Wrapper style={{
          padding: 5
        }}>
          <TemplatePreview
            platform={this.props.platform}
            deal_id={this.props.active_property.deal.id}
            date={this.props.preview_info.date}

            token={this.props.token}
            image={this.props.active_property.deal.mailer_preview}
            save_info={true}
            width={150}
          />
        </Wrapper>
        <Wrapper style={{
          padding: 5
        }}>
          <TemplatePreview
            side="back"
            platform={this.props.platform}
            deal_id={this.props.active_property.deal.id}
            date={this.props.preview_info.date}

            token={this.props.token}
            image={this.props.active_property.deal.mailer_preview_back}
            save_info={true}
            width={150}
          />
        </Wrapper>
      </Row>
    )
  }

  render(){

    if(this.props.active_property.deal.campaign_id != 0 && this.props.active_property.deal.campaign_complete != 1){

      return (
        <Wrapper>
          <Row style={{
            justifyContent: "space-between"
          }}>
            <Title>Next Mailer: </Title>
            <Button onPress={()=>{
              this.props.reloadPreviews({reload: true, reloadId: this.props.active_property.deal.id, date: moment().format("X")})
            }}
            style={{
              marginLeft: 5
            }}>
              <Row>
                <Icon
                  icon="refresh"
                  size={18}
                  style={{
                    marginRight: 5
                  }}
                />
                <Copy>Reload Previews</Copy>
              </Row>
            </Button>
          </Row>
          <Button onPress={()=>{
            this.props.reloadPreviews({reload: true})
            this.props.showTemplatePreview({
              show: true,
              deal_id: this.props.active_property.deal.id,
              template_type: this.props.active_property.deal.mail_template_type,
              template_preview: this.props.active_property.deal.mailer_preview,
              template_preview_back: this.props.active_property.deal.mailer_preview_back,
              save_info: true
            });
          }}>
            {this.renderPreviews()}
          </Button>
          <SendingNextText {...this.props}/>
        </Wrapper>
      );

    }

    return <Wrapper />;
  }
}

export default CampaignUpNext;
