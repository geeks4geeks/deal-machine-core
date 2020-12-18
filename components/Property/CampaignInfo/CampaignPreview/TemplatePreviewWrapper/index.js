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

class TemplatePreviewWrapper extends Component{


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
              owner={{
                owner_name: this.props.active_property.owner_name,
                owner_address: this.props.active_property.owner_address,
                owner_address2: this.props.active_property.owner_address2,
                owner_address_city: this.props.active_property.owner_address_city,
                owner_address_state: this.props.active_property.owner_address_state,
                use_owner_address: this.props.active_property.deal.use_owner_address,
              }}
              other_addresses={[]}
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
              owner={{
                owner_name: this.props.active_property.owner_name,
                owner_address: this.props.active_property.owner_address,
                owner_address2: this.props.active_property.owner_address2,
                owner_address_city: this.props.active_property.owner_address_city,
                owner_address_state: this.props.active_property.owner_address_state,
                use_owner_address: this.props.active_property.deal.use_owner_address,
              }}
              other_addresses={[]}
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
            owner={{
              owner_name: this.props.active_property.owner_name,
              owner_address: this.props.active_property.owner_address,
              owner_address2: this.props.active_property.owner_address2,
              owner_address_city: this.props.active_property.owner_address_city,
              owner_address_state: this.props.active_property.owner_address_state,
              use_owner_address: this.props.active_property.deal.use_owner_address,
            }}
            other_addresses={[]}
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
            owner={{
              owner_name: this.props.active_property.owner_name,
              owner_address: this.props.active_property.owner_address,
              owner_address2: this.props.active_property.owner_address2,
              owner_address_city: this.props.active_property.owner_address_city,
              owner_address_state: this.props.active_property.owner_address_state,
              use_owner_address: this.props.active_property.deal.use_owner_address,
            }}
            other_addresses={[]}
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

    if(this.props.active_property.deal.campaign_id == 0){

      return (
        <Wrapper>
          <Row style={{
            justifyContent: "space-between"
          }}>
            <Title>Mailer Preview: </Title>
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
            this.props.showTemplatePreview({
              show: true,
              deal_id: this.props.active_property.deal.id,
              template_type: this.props.active_property.deal.mail_template_type,
              save_info: true,
              template_preview: this.props.active_property.deal.mailer_preview,
              template_preview_back: this.props.active_property.deal.mailer_preview_back
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

export default TemplatePreviewWrapper;
