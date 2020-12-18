import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Copy } from 'app/NativeComponents/common';
import { CardLabel } from 'app/NativeComponents/snippets';

import TeamMemberFilter from './TeamMemberFilter';
import TagsFilter from './TagsFilter';
import CampaignFilter from './CampaignFilter';
import TemplateFilter from './TemplateFilter';

import Buttons from './Buttons';

class Body extends Component{

  renderMailerInformation(){
    if(this.props.analytics_type == "all"){
      return(
        <Card>
          <CardLabel
            title={"Mailer Information:"}
            icon={""}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <CampaignFilter {...this.props}/>
          <TemplateFilter {...this.props}/>

        </Card>
      )
    }
  }
  render(){
    return (
      <Wrapper>
        <CardBody>
          <Copy>Edit the following fields to display analytics based on the selected attributes.</Copy>
        </CardBody>
        <Card>
          <CardLabel
            title={"Property Information:"}
            icon={""}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <TeamMemberFilter {...this.props}/>
          <TagsFilter {...this.props}/>
        </Card>

        {this.renderMailerInformation()}

        <Buttons {...this.props}/>

      </Wrapper>
    );
  }

}

export default Body;
