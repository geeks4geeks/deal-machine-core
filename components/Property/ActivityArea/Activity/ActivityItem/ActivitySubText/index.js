import React, { Component } from 'react';
import { Wrapper, Copy} from 'app/NativeComponents/common';
import moment from 'moment';

import DealStatusSubText from './DealStatusSubText';
import TagsSubText from './TagsSubText';
import OwnerInfoSubText from './OwnerInfoSubText';
import ImageSubText from './ImageSubText';
import PropertyAddressSubText from './PropertyAddressSubText';
import PurchaseDetailsSubText from './PurchaseDetailsSubText';
import MailingOptionsSubText from './MailingOptionsSubText';
import BulkEditSubText from './BulkEditSubText';

class ActivitySubText extends Component{

  render(){

    if(this.props.type == "note"){
      return (
        <Copy>
          {this.props.item.text ? this.props.item.text : ""}
        </Copy>
      )
    }else if(this.props.type == "mailed"){
      var date = new Date();
      var offsetInHours = date.getTimezoneOffset() / 60;
      if(this.props.item.timeline.returned_to_sender_date != null){
        return (
          <Copy>
            {"Returned on "+moment(this.props.item.timeline.returned_to_sender_date).subtract(offsetInHours, "hours").format("MMM Do, YYYY")}
          </Copy>
        );
      }else if(this.props.item.timeline.processed_for_delivery_date != null && (this.props.item.timeline.re_routed_date == null || this.props.item.timeline.re_routed_date < this.props.item.timeline.processed_for_delivery_date)){
        return (
          <Copy>
            {"Delivered on "+moment(this.props.item.timeline.processed_for_delivery_date).subtract(offsetInHours, "hours").format("MMM Do, YYYY")}
          </Copy>
        );
      }else{
        if(this.props.item.timeline.expected_delivery_date){
          return (
            <Copy>
              {"Expected delivery on "+moment(this.props.item.timeline.expected_delivery_date).format("MMM Do, YYYY")}
            </Copy>
          );
        }
      }
    }else if(this.props.type == "change_log"){

      switch(this.props.item.action_type){

        case "deal_status":
        case "bulk_edit_change_status":
          return <DealStatusSubText {...this.props} />

        break;

        case "bulk_edit":
        case "settings_update":
          return <BulkEditSubText {...this.props} />
				break;

				case "edit_photo":
          return <ImageSubText {...this.props} />
				break;

				case "mailing_options":
        case "bulk_edit_mailing_option":

          return <MailingOptionsSubText {...this.props} />;
				break;

				case "owner":
          return <OwnerInfoSubText {...this.props}/>
				break;

				case "property_address":
          return <PropertyAddressSubText {...this.props} />
				break;

				case "purchase_details":
          return <PurchaseDetailsSubText {...this.props} />
				break;

				case "tags":
          return <TagsSubText {...this.props} />
				break;
      }

    }

    return <Wrapper />;
  }
}

export default ActivitySubText;
