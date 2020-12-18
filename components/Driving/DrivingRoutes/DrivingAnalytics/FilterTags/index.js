import React, { Component } from 'react';
import { Wrapper, Row } from 'app/NativeComponents/common';

import TeamMemberFilterTag from './TeamMemberFilterTag';

class FilterTags extends Component{

  render(){
    if(this.props.analytics_filters.team_member != "none"
    ){
      return (
        <Wrapper>
          <Row style={{
            flexWrap: "wrap",
            justifyContent: "flex-end"
          }}>
            <TeamMemberFilterTag {...this.props} />
          </Row>
        </Wrapper>
      );
    }

    return <Wrapper />

  }

}

export default FilterTags;
