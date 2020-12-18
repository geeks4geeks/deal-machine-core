import React, { Component } from 'react';
import { Wrapper, Row } from 'app/NativeComponents/common';

import TeamMemberFilterTag from './TeamMemberFilterTag';
import TagFilterTag from './TagFilterTag';
import CampaignFilterTag from './CampaignFilterTag';
import TemplateFilterTag from './TemplateFilterTag';

class FilterTags extends Component{

  render(){
    if(this.props.analytics_filters.team_member != "none" ||
      this.props.analytics_filters.tag != "none" ||
      this.props.analytics_filters.template != "none" ||
      this.props.analytics_filters.campaign != "none"
    ){
      return (
        <Wrapper>
          <Row style={{
            flexWrap: "wrap",
            justifyContent: "flex-end"
          }}>
            <TeamMemberFilterTag {...this.props} />
            <TagFilterTag {...this.props}/>
            <CampaignFilterTag {...this.props}/>
            <TemplateFilterTag {...this.props}/>

          </Row>
        </Wrapper>
      );
    }

    return <Wrapper />

  }

}

export default FilterTags;
