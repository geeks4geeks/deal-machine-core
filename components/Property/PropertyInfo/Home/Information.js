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
    //if(this.props.tab === "home"){
      return (
        <Wrapper>
          <InformationItem
            style={{marginBottom: 15}}
            size="medium"
            item={this.props.active_property.year_built}
            label={"Year built:"}
          />
          <Split>
            <Stretch>
              <InformationItem
                style={{marginBottom: 15}}
                size="medium"
                item={this.props.active_property.total_bedrooms}
                label={"Bedrooms:"}
              />
            </Stretch>
            <Stretch>
              <InformationItem
              style={{marginBottom: 15}}
              size="medium"
                item={this.props.active_property.total_bathrooms}
                label={"Baths:"}
              />
            </Stretch>

          </Split>

          <InformationItem
            style={{marginBottom: 15}}
            size="medium"
            item={this.props.active_property.units_count}
            label={"Units count:"}
          />

          <Split>
            <Stretch>
              <InformationItem
                style={{marginBottom: 15}}
                size="medium"
                item={this.props.active_property.building_square_feet}
                label={"Square footage:"}
                format={"number"}
              />
            </Stretch>
            <Stretch>
              <InformationItem
                style={{marginBottom: 15}}
                size="medium"
                item={this.props.active_property.lot_acreage}
                label={"Acreage:"}
                format={"acre"}
              />
            </Stretch>

          </Split>

          <InformationItem
            style={{marginBottom: 15}}
            size="medium"
            item={this.props.active_property.county_link}
            label={"County Link:"}
            format={"url"}
          />

        </Wrapper>
      );
    //}

    //return <Wrapper />
  }
}

export default Information;
