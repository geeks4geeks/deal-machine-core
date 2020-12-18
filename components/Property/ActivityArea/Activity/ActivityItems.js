import React, { Component } from 'react';
import { Wrapper, Spin } from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';

import ActivityItem from './ActivityItem';

class ActivityItems extends Component{

  constructor(props) {
    super(props);
    this.state = {
      triggerReset: false
    }
  }

  render(){
    if((!this.props.loading && this.props.device === "desktop") || this.props.device === "mobile"){

      return(
        <List
          ref={(ref) => {this.activityList = ref}}
          id="activity_list"
          rowNumber={1}
          style={{flex: 1}}
          scrollView={true}
          items={this.props.activity_items}
          infiniteScroll={false}
          itemStruture={({item}) => {

            return <ActivityItem
                      colors={this.props.colors}
                      key={item.id+item.date_created}
                      user={this.props.user}
                      type={item.activity_type}
                      item={item}
                      all_statuses={this.props.all_statuses}
                      all_tags={this.props.all_tags}
                      active_property={this.props.active_property}
                      deal_id={this.props.active_property.deal.id}
                      colors={this.props.colors}
                      device={this.props.device}
                      detailed_options={this.props.detailed_options}
                   />
          }}
          canRefresh={true}
          is_refreshing={false}
          onRefresh={()=>{
            this.props.getActivity({
              token: this.props.token,
              deal_id: this.props.active_property.deal.id
            });
          }}
          canLoadMore={false}
          invertedScroll={true}
        />
      )
    }else{
      return (
        <Wrapper style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          flex: 1
        }}>
          <Spin size="small"/>
        </Wrapper>
      )
    }
  }
}

export default ActivityItems
