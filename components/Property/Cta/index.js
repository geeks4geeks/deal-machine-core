import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper } from 'app/NativeComponents/common';

import LookupFailed from './LookupFailed';
import DealFinderSuccess from './DealFinderSuccess';
import OwnerFound from './OwnerFound';
import MailSent from './MailSent';
import Archived from './Archived';

import {
  hideCTA
  //checkIfAllAddressesAreToggled
} from 'app/NativeActions';

class Cta extends Component{

  render() {
    if(this.props.active_property.deal && (this.props.isMobile || parseInt(this.props.user.team_clearance_level) === 0)){
      if(parseInt(this.props.active_property.deal.closed) === 1){
        return <Wrapper/>
      }else if(parseInt(this.props.active_property.deal.archived) === 1){
        return <Archived {...this.props}/>
      }else if(this.props.active_property.deal.owner_name && this.props.active_property.deal.owner_name !== ""){
        if(this.props.user.team_clearance_level > 0){
            if(parseInt(this.props.active_property.deal.hide_cta) !== 1){
              if(this.props.active_property.deal.owner_name &&
                parseInt(this.props.active_property.deal.archived) !== 1 &&
                parseInt(this.props.active_property.deal.closed) !== 1){
                //if they have not performed an enhanced search or sent mail
                if(parseInt(this.props.active_property.deal.approved) !== 1){
                  return <OwnerFound {...this.props} />;
                //enhanced search was successful
                }else if(parseInt(this.props.active_property.deal.approved) === 1){
                  return <MailSent {...this.props}/>;
                }
              }
            }

        }else if(parseInt(this.props.user.team_clearance_level) === 0){
          return <DealFinderSuccess {...this.props}/>;
        }

      }else{
        return <LookupFailed {...this.props}/>;
      }

    }
    return <Wrapper />;
  }


}


const mapStateToProps = () => {

  return {
  }
}


export default connect(mapStateToProps, {
  hideCTA
})(Cta);
