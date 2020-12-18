import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import CampaignStep from '../CampaignStep';

class Body extends Component{


  render(){
    if(this.props.editCampaign.steps){
      if(this.props.editCampaign.steps.length > 0){
          return (
            <Wrapper>
              {
                this.props.editCampaign.steps.map((step, i) =>{
                  return (
                    <CampaignStep
                      key={i}
                      step={step}
                      {...this.props}
                    />
                  );
                })
              }
            </Wrapper>
          )
      }

    }

    return <Wrapper />
  }
}

export default Body;
