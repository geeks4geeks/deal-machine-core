import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  Wrapper, Title, Copy, Spin, Row, Card} from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';
import PropertyItem from 'app/DealMachineCore/snippets/PropertyItem';

class PropertyList extends Component {

  render(){
    if(this.props.activity_properties_type.slug !== "mailers_sent"){
      if(this.props.activity_properties_refreshing || (this.props.activity_properties_loading && this.props.activity_properties.length == 0 )){
        return(
          <Wrapper style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
            <Row>
              <Spin size={"small"}/>
              <Copy style={{marginLeft: 10}}>Loading Properties...</Copy>
            </Row>
          </Wrapper>
        )
      }
      if(this.props.activity_properties.length > 0){
        return(
          <List
            rowNumber={1}
            style={{flex: 1}}
            items={this.props.activity_properties}
            infiniteScroll={true}
            itemStruture={({item, i}) => {

                return (
                  <Card style={{marginTop: 0}}>
                    <PropertyItem
                        key={item.property_id}
                        property={item}
                        user={this.props.user}
                        onPress={(property)=>{
                          this.props.selectActiveProperty(property)
                          this.props.appRedirect({redirect: "property", payload:{property_id: property.property_id, dashboard: this.props.isMobile ? false : true}})
                        }}
                        no_active={true}
                        selected_leads={[]}
                        checkLead={()=>{}}
                        selecting={false}
                        selected_all={false}
                        bypass_start_mailers_button={true}
                     />
                  </Card>
                )


            }}
            canRefresh={true}
            onRefresh={()=>{
              this.props.getProperties({
                load_type: "refresh"
              });
            }}
            is_refreshing={this.props.activity_properties_refreshing}
            canLoadMore={
              !this.props.activity_properties_loaded_all &&
              !this.props.activity_properties_loading &&
              !this.props.activity_properties_refreshing &&
              this.props.activity_properties.length > 0
            }
            isLoadingMore={
              this.props.activity_properties_loading &&
              !this.props.activity_properties_refreshing &&
              this.props.activity_properties.length > 0
            }
            onLoadMore={()=>{
              if(!this.props.activity_properties_loaded_all && this.props.activity_properties_refreshing != true && this.props.activity_properties_loading != true){
                this.props.getProperties({
                  load_type: "load_more",
                  begin: this.props.activity_properties_begin
                });
              }

            }}

          />
        )
      }

      if(this.props.activity_properties.length == 0){
        return(
          <Wrapper style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
            <Title style={{textAlign:"center"}}>There is nothing to display.</Title>
            <Copy>There are no properties to display.</Copy>
          </Wrapper>
        )
      }
    }

    return <Wrapper />;
  }
}

export default PropertyList
