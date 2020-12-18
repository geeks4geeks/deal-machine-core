import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Copy, Bold } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

import {
  /* common functions */
  renderPrice,
  numberWithCommas
} from 'app/NativeActions';

class Buttons extends Component{


  render(){
    if(this.props.checkIfNeedsToSave()){
      return (
        <Wrapper>
          <CardBody>
            <Copy>
              If your balance falls to zero, recharge your balance with <Bold>{renderPrice(parseInt(this.props.credit_amount)*100)}</Bold>
            </Copy>
          </CardBody>
          <Wrapper style={{alignItems: "flex-end", justifyContent: "center"}}>
            <PillButton
              formButton
              primary={true}
              onPress={()=>this.props.saveDefaultCreditAmount()}
            >
            {this.props.onboarding ? "Complete" : "Update DealCredit Reload Amount"}
            </PillButton>
          </Wrapper>
        </Wrapper>

      );
    }


    return <Wrapper />
  }


}

export default Buttons;
