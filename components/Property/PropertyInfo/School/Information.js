import React, { Component } from 'react';
import {
  Wrapper,
  CardBody,
  Split,
  Stretch
} from 'app/NativeComponents/common';
import {
  InformationItem
} from 'app/NativeComponents/snippets';

class Information extends Component{

  render(){
    //if(this.props.tab === "school"){
      return (
        <Wrapper>
          <InformationItem
            style={{marginBottom: 15}}
            size="medium"
            item={this.props.active_property.school_district}
            label={"School district:"}
          />

        </Wrapper>
      );
    //}

    //return <Wrapper />
  }
}

export default Information;
