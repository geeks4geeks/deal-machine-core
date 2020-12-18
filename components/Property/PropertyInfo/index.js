import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Title, Copy } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

import Sale from './Sale';
import Mortgage from './Mortgage';
import School from './School';
import Tax from './Tax';
import Home from './Home';

class PropertyInfo extends Component{

  constructor(props){
    super(props);

    this.state = {
      tab: ""
    }

  }

  updateHouseTab(tab){
    this.setState({tab: tab === this.state.tab ? "" : tab})
  }

  render(){

    if(this.props.active_property.property_data_type === "phantom"){
      if(this.props.active_property.deal){
        return(
          <Card>
            <CardBody style={{alignItems: "flex-start", justifyContent: "center"}}>
              <Title>Data Not In Sync</Title>
              <Copy>Press below to re-sync this lead with the county records.</Copy>
              <PillButton onPress={()=>{
                this.props.updateLead({
                  token: this.props.token,
                  type: "sync_data",
                  deal_ids: this.props.active_property.deal.id
                })
              }} primary={true} style={{marginLeft: 0}}>
                Sync Data
              </PillButton>
            </CardBody>

          </Card>
        )
      }
    }
    if(this.props.active_property.owner_name && this.props.active_property.owner_name !== "" &&
      this.props.user.team_clearance_level > 0){

      return (
        <Card>
          <CardBody>
            <Sale
              {...this.props}
              tab={this.state.tab}
              updateHouseTab={this.updateHouseTab.bind(this)}
            />
            <Mortgage
              {...this.props}
              tab={this.state.tab}
              updateHouseTab={this.updateHouseTab.bind(this)}
            />

            <Tax
              {...this.props}
              tab={this.state.tab}
              updateHouseTab={this.updateHouseTab.bind(this)}
            />
            <Home
              {...this.props}
              tab={this.state.tab}
              updateHouseTab={this.updateHouseTab.bind(this)}
            />
            <School
              {...this.props}
              tab={this.state.tab}
              updateHouseTab={this.updateHouseTab.bind(this)}
            />
          </CardBody>
        </Card>
      )
    }
    return <Wrapper />
  }
}

export default PropertyInfo;
