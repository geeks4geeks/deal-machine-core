import React, { Component } from 'react';

import {
  Wrapper,
  Input,
  Card,
  Row,
  Spin,
  Copy,
  Bold,
  Button
} from 'app/NativeComponents/common';

import ListIcon from 'app/DealMachineCore/components/ListDashboard/ListIcon';
import ListLeadCount from './ListLeadCount';
import ListLocationAndFilters from './ListLocationAndFilters';
import SmartListToggle from './SmartListToggle';
import StartMarketingToggle from './StartMarketingToggle';

import {
  renderDate
} from 'app/NativeActions';

class Body extends Component{

  renderListTypeDate(){
    if(this.props.active_list.building == 1){
      return(
        <Row style={{paddingLeft: 15, paddingRight: 15}}>
        <Spin size="small"/>
        <Copy style={{marginLeft: 5}}>
        {this.props.active_list.estimated_count > 0 ? "Building List ("+this.props.active_list.lead_count+"/"+this.props.active_list.estimated_count+")..." : "Building List"}
        </Copy>
          <Button style={{marginLeft: 15}} onPress={()=>{
            this.props.getLists({
              token: this.props.token,
              load_type: "refresh_single_list",
              list_id: this.props.active_list.id
            })
          }}><Copy><Bold>Check Progress</Bold></Copy></Button>
        </Row>
      )
    }
    switch(this.props.edit_active_list.list_type){
      default:
      case "normal":
        return(
          <Copy style={{paddingLeft: 15, paddingRight: 15, color: this.props.colors.light_text_color}}>Static list created on {renderDate(this.props.edit_active_list.date_created)}</Copy>
        )
      break;

      case "build_list":
        return(
          <Copy style={{paddingLeft: 15, paddingRight: 15, color: this.props.colors.light_text_color}}>Built from List Engine on {renderDate(this.props.edit_active_list.date_created)}</Copy>
        )

      break;

      case "bulk_import":
      case "bulk_upload":
        return(
          <Copy style={{paddingLeft: 15, paddingRight: 15, color: this.props.colors.light_text_color}}>Imported from file on {renderDate(this.props.edit_active_list.date_created)}</Copy>
        )
      break;
    }
  }

  render(){
    if(this.props.edit_active_list){
      return (
        <Wrapper>
          <Card style={{padding: 15, paddingLeft: this.props.isMobile ? 15 : 30}}>
            <Row>
              <ListIcon
                item={this.props.edit_active_list}
                colors={this.props.colors}
                size="large"
                isMobile={this.props.isMobile}
              />
              <Wrapper style={{flex: 1}}>
                <Input
                  style={{padding: 0}}
                  ref="name"
                  name="name"
                  blurOnSubmit={true}
                  autoCapitalize="words"
                  returnKeyType={"done"}
                  placeholder="List name:"
                  maxLength={5}
                  onChange={value => this.props.editActiveList({ prop: "title", value: value })}
                  onSubmitEditing={()=>{}}
                  value={this.props.edit_active_list.title}
                  type="text"
                />
                {this.renderListTypeDate()}
              </Wrapper>
            </Row>
          </Card>
          <ListLeadCount {...this.props}/>
          <ListLocationAndFilters {...this.props}/>
          <SmartListToggle {...this.props} />
          <StartMarketingToggle {...this.props} />
        </Wrapper>
      )
    }
    return <Wrapper />;
  }

}

export default Body;
