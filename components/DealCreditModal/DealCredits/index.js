import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';
import { CardLabel } from 'app/NativeComponents/snippets';

import CreditText from './CreditText';

class DealCredits extends Component{


  render(){
    if(this.props.user.team_clearance_level > 0){
      return(
        <CreditText {...this.props} />
      );
    }
    return <Wrapper />
  }

}

export default DealCredits;
