import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  CenterCenter
} from 'app/NativeComponents/common';

import {
  CloseButton
} from 'app/NativeComponents/snippets';

import CtaIcon from './CtaIcon';
import CtaText from './CtaText';
import ApprovalButton from './ApprovalButton';


import {
  determineMainOwnerInfo
} from 'app/NativeActions';

class DealFinderSuccess extends Component{

  render(){
    if(this.props.active_property.deal.deal_status_slug === "pending_approval"){
      return (
        <Wrapper>
          <Card>
            <CardBody>

              <CenterCenter>
                <CtaIcon {...this.props} owner={determineMainOwnerInfo(this.props.active_property)} />
                <CtaText {...this.props} owner={determineMainOwnerInfo(this.props.active_property)} />

              </CenterCenter>
            </CardBody>
            <ApprovalButton {...this.props}/>
            <CloseButton onPress={()=>this.props.hideCTA({token: this.props.token, deal_id: this.props.active_property.deal.id})}/>

          </Card>
        </Wrapper>
      );
    }
    return <Wrapper />
  }

}

export default DealFinderSuccess;
