import React, { Component } from 'react';

import { Wrapper, Card, CardBody, Spin, Title, Copy } from 'app/NativeComponents/common';
import { List, PillButton } from 'app/NativeComponents/snippets';

import PropertyItem from 'app/DealMachineCore/snippets/PropertyItem';

class MobileList extends Component {


  componentDidMount(){

  }
  componentDidUpdate(prevProps){

  }


  render(){

    if((this.props.list_properties_loading && this.props.list_properties.length === 0) || this.props.list_properties_refreshing){

      return (
        <Wrapper style={{flex: 1, width: "100%"}}>
          <Wrapper style={{
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "stretch",
            flex: 1
          }}>
            <CardBody>
              <Spin />
            </CardBody>
          </Wrapper>
        </Wrapper>
      )
    }else if(!this.props.list_properties_refreshing && this.props.list_properties.length > 0){

      return (
        <List
              rowNumber={1}
              style={{flex: 1, alignSelf: "stretch", width: "100%"}}
              listHeader={ ()=>{return (
                <Wrapper />
              )}}
              items={this.props.list_properties}
              infiniteScroll={true}
              itemStruture={({item}) => {
                return (
                    <Card style={{marginTop: 0}}>

                    <PropertyItem
                              key={item.property_id}
                              property={item}
                              user={this.props.user}
                              onPress={(property)=>this.props.pressProperty(property)}

                              list_settings={this.props.list_settings}

                              selected_leads={this.props.selected_leads}
                              checkLead={this.props.checkLead}

                              setStatusModal={this.props.setStatusModal}
                              appRedirect={this.props.appRedirect}
                              updateLead={this.props.updateLead}

                              token={this.props.token}
                              active_property={this.props.active_property}
                              list_properties_page={this.props.list_properties_page}
                              selecting={this.props.selecting}
                              selected_all={this.props.selected_all}

                              bypass_start_mailers_button={true}
                           />
                         </Card>
                )
              }}
              canRefresh={true}
              onRefresh={()=>{
                this.props.getProperties("refresh", 1);
              }}
              is_refreshing={this.props.list_properties_refreshing}
              canLoadMore={
                !this.props.list_properties_loaded_all &&
                !this.props.list_properties_loading &&
                !this.props.list_properties_refreshing &&
                this.props.list_properties.length > 0
              }
              isLoadingMore={
                this.props.list_properties_loading &&
                !this.props.list_properties_refreshing &&
                this.props.list_properties.length > 0
              }
              onLoadMore={()=>{
                this.props.getProperties("load_more");
              }}
        />
      )
    }

    if(!this.props.list_properties_loading && !this.props.list_properties_refreshing){
      return (
        <Wrapper style={{flex: 1, width: "100%"}}>
          <CardBody style={{marginTop: 20, alignItems: "center", justifyContent: "center"}}>
            <Title style={{textAlign: "center"}}>Your leads will show here.</Title>
            <Copy style={{textAlign: "center", marginBottom: 10}}>There are no leads to display yet based on your search. Try changing your search options. Or add a new lead.</Copy>
            <PillButton primary={true} style={{}} innerStyle={{}} onPress={()=>{
              this.props.appRedirect({
                redirect: "manuallyaddlead"
              })
            }}>
              Add Lead
            </PillButton>
          </CardBody>
        </Wrapper>
      )
    }
  }
}


export default MobileList;
