import React, { Component } from 'react';
import { Wrapper, Scroll } from 'app/NativeComponents/common';

import BillingOptions from './BillingOptions';
import MailingOptions from './MailingOptions';
import NotificationOptions from './NotificationOptions';

import AppOptions from './AppOptions';
import PromoOptions from './PromoOptions';
import ExportOptions from './ExportOptions';

class Body extends Component{


  render(){
    if(this.props.user){
      return (
        <Scroll>
          <BillingOptions {...this.props}/>
          <MailingOptions {...this.props}/>
          <NotificationOptions {...this.props} />

          <PromoOptions {...this.props}/>

          <AppOptions {...this.props}/>

          <ExportOptions {...this.props} />
        </Scroll>
      );
    }

    return <Wrapper />;
  }

}

export default Body;
