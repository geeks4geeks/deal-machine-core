import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Title, Copy } from 'app/NativeComponents/common';

import {
  formatAddress
} from 'app/NativeActions';

import TimelineItem from './TimelineItem';

class MailerTimeline extends Component{


  render(){
    return (

        <Wrapper style={{
          marginTop: 10
        }}>
          <TimelineItem
            display={this.props.mailer.date_created}
            icon="print"
            title="Mail Printed"
            date={this.props.mailer.date_created}
          />
          <TimelineItem
            display={this.props.mailer.in_transit_date && this.props.mailer.mail_provider == "lob"}
            icon="directions-bus"
            title="Mail In Transit"
            date={this.props.mailer.in_transit_date}
          />
          <TimelineItem
            display={this.props.mailer.in_local_area_date && this.props.mailer.mail_provider == "lob"}
            icon="my-location"
            title="Mail In Local Area"
            date={this.props.mailer.in_local_area_date}
          />
          <TimelineItem
            display={this.props.mailer.processed_for_delivery_date && this.props.mailer.mail_provider == "lob"}
            icon="mail"
            title="Mail Delivered"
            date={this.props.mailer.processed_for_delivery_date}
          />
          <TimelineItem
            display={this.props.mailer.re_routed_date && this.props.mailer.mail_provider == "lob"}
            icon="refresh"
            title="Mail Rerouted"
            date={this.props.mailer.re_routed_date}
          />
          <TimelineItem
            display={this.props.mailer.returned_to_sender_date && this.props.mailer.mail_provider == "lob"}
            icon="error"
            title="Mail Returned To Sender"
            date={this.props.mailer.returned_to_sender_date}
          />
          <TimelineItem
            display={(this.props.mailer.expected_delivery_date && this.props.mailer.mail_provider != "lob") || (this.props.mailer.expected_delivery_date &&
              this.props.mailer.returned_to_sender_date == null &&
              this.props.mailer.processed_for_delivery_date == null &&
              this.props.mailer.re_routed_date == null)}
            icon="mail"
            title="Expected Delivery"
            date={this.props.mailer.expected_delivery_date}
            just_date
          />
        </Wrapper>
    );

  }

}

export default MailerTimeline;
