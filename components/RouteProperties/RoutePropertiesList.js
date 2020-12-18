import React, { Component } from 'react';
import { Wrapper, Copy, Card } from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';

import PropertyItem from 'app/DealMachineCore/snippets/PropertyItem';

class RoutePropertiesList extends Component{
  render(){
    return (
      <Wrapper style={{flex: 1, width: "100%"}}>
        <List

          rowNumber={1}
          style={{flex: 1}}
          items={this.props.route_properties}
          infiniteScroll={true}
          itemStruture={({item}) => {
            return (
              <Card style={{marginTop: 0}}>
                <PropertyItem
                  property={item}
                  bypass_start_mailers_button={true}
                  onPress={(property)=>{
                    if(property){
                      this.props.selectActiveProperty(property)
                      this.props.appRedirect({redirect: "property", payload: {property_id: item.property_id}})
                    }
                  }}
                />
              </Card>

            )
          }}
          canRefresh={true}
          onRefresh={()=>{
            this.props.getProperties("refresh")
          }}
          is_refreshing={this.props.route_properties_refreshing}
          canLoadMore={
            !this.props.route_properties_loaded_all &&
            !this.props.route_properties_loading &&
            !this.props.route_properties_refreshing &&
            this.props.route_properties.length > 0
          }
          isLoadingMore={
            this.props.route_properties_loading &&
            !this.props.route_properties_refreshing &&
            this.props.route_properties.length > 0
          }
          onLoadMore={()=>{
            if(!this.props.route_properties_loaded_all && this.props.route_properties_refreshing != true && this.props.route_properties_loading != true){
              this.props.getProperties("load", this.props.active_route.id)
            }
          }}
        />
      </Wrapper>
    );
  }

}

export default RoutePropertiesList;
