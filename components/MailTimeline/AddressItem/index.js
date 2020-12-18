import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Title, Copy } from 'app/NativeComponents/common';

import {
  formatAddress
} from 'app/NativeActions';

import TimelineItem from './TimelineItem';
import Screenshot from './Screenshot';

class AddressItem extends Component{


  render(){
    return (
      <Card>
        <CardBody>

          <Screenshot item={this.props.address.timeline} />

          <Title>
            {
              formatAddress({address: {
                address: this.props.address.address,
                address2: this.props.address.address2,
                address_city: this.props.address.address_city,
                address_state: this.props.address.address_state,
                address_zip: this.props.address.address_zip
              }}).line1
            }
          </Title>
          <Copy>
            {
              formatAddress({address: {
                address: this.props.address.address,
                address2: this.props.address.address2,
                address_city: this.props.address.address_city,
                address_state: this.props.address.address_state,
                address_zip: this.props.address.address_zip
              }}).line2
            }
          </Copy>
          <Wrapper style={{
            marginTop: 10
          }}>
            <TimelineItem
              display={this.props.address.timeline.date_created}
              icon="print"
              title="Mail Printed"
              date={this.props.address.timeline.date_created}
            />
            <TimelineItem
              display={this.props.address.timeline.in_transit_date && this.props.address.timeline.mail_provider == "lob"}
              icon="directions-bus"
              title="Mail In Transit"
              date={this.props.address.timeline.in_transit_date}
            />
            <TimelineItem
              display={this.props.address.timeline.in_local_area_date && this.props.address.timeline.mail_provider == "lob"}
              icon="my-location"
              title="Mail In Local Area"
              date={this.props.address.timeline.in_local_area_date}
            />
            <TimelineItem
              display={this.props.address.timeline.processed_for_delivery_date && this.props.address.timeline.mail_provider == "lob"}
              icon="mail"
              title="Mail Delivered"
              date={this.props.address.timeline.processed_for_delivery_date}
            />
            <TimelineItem
              display={this.props.address.timeline.re_routed_date && this.props.address.timeline.mail_provider == "lob"}
              icon="refresh"
              title="Mail Rerouted"
              date={this.props.address.timeline.re_routed_date}
            />
            <TimelineItem
              display={this.props.address.timeline.returned_to_sender_date && this.props.address.timeline.mail_provider == "lob"}
              icon="error"
              title="Mail Returned To Sender"
              date={this.props.address.timeline.returned_to_sender_date}
            />

            <TimelineItem
              display={(this.props.address.expected_delivery_date && this.props.address.timeline.mail_provider != "lob") || (this.props.address.timeline.expected_delivery_date && this.props.address.timeline.returned_to_sender_date == null && this.props.address.timeline.processed_for_delivery_date == null && this.props.address.timeline.re_routed_date == null)}
              icon="mail"
              title="Expected Delivery"
              date={this.props.address.expected_delivery_date}
              just_date
            />
          </Wrapper>
        </CardBody>
      </Card>
    );

  }

}

export default AddressItem;
