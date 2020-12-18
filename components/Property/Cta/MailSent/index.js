import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  CenterCenter,
  Animation,
  Icon
} from 'app/NativeComponents/common';

import {
  CloseButton
} from 'app/NativeComponents/snippets';

import CtaText from './CtaText';
import CtaTitle from './CtaTitle';

class MailSent extends Component{

  render(){
    return (
      <Wrapper>
        <Card>
          <CardBody>
            <CenterCenter>
              <Animation type="zoomIn">
                <Icon
                  color={this.props.colors.success_color}
                  icon={this.props.active_property.deal.campaign_id !== 0 ? "flag" : "mail"}
                  size={44}
                />
              </Animation>
              <CtaTitle {...this.props} />
              <CtaText {...this.props}/>
            </CenterCenter>
          </CardBody>

          <CloseButton onPress={()=>this.props.hideCTA({token: this.props.token, deal_id: this.props.active_property.deal.id})}/>

        </Card>

      </Wrapper>
    );
  }

}

export default MailSent;
