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
    //if(this.props.tab === "sale"){
      return (
        <Wrapper>
          <Split>
            <Stretch>
              <InformationItem
                style={{marginBottom: 15}}
                size="medium"

                item={this.props.active_property.saledate}
                label={"Sale date:"}
                format={"date"}
              />
            </Stretch>
            <Stretch>
              <InformationItem
                style={{marginBottom: 15}}
                size="medium"

                item={this.props.active_property.saleprice}
                label={"Sale price:"}
                format={"money"}
              />
            </Stretch>

          </Split>
        </Wrapper>
      );
    //}

    //return <Wrapper />
  }
}

export default Information;
