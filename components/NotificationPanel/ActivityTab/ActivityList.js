import React, { Component } from 'react';
import { Wrapper, Row, Spin, Title, Copy } from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';

import ActivityItem from './ActivityItem';

class ActivityList extends Component{


  render(){

    if(this.props.team_activity_refreshing || (this.props.team_activity.length === 0 && this.props.team_activity_loading)){
      return(
        <Wrapper style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
          <Row>
            <Spin size={"small"}/>
            <Copy style={{marginLeft: 10}}>Loading Activity...</Copy>
          </Row>
        </Wrapper>
      )
    }

    if(this.props.team_activity.length > 0){
      return (
        <Wrapper style={{flex: 1}}>
          <List
            rowNumber={1}
            style={{flex: 1}}
            items={this.props.team_activity}
            infiniteScroll={true}
            itemStruture={({item, i}) => {
              return <ActivityItem
                      key={i}
                      item={item}
                      colors={this.props.colors}
                      setActivityPropertiesType={this.props.setActivityPropertiesType}
                      appRedirect={this.props.appRedirect}
                      isMobile={this.props.isMobile}
                      />
            }}
            canRefresh={true}
            onRefresh={()=>{
              this.props.getActivity({
                load_type: "refresh"
              });
            }}
            is_refreshing={this.props.team_activity_refreshing}
            canLoadMore={
              !this.props.team_activity_loaded_all &&
              !this.props.team_activity_loading &&
              !this.props.team_activity_refreshing &&
              this.props.team_activity.length > 0
            }
            isLoadingMore={
              this.props.team_activity_loading &&
              !this.props.team_activity_refreshing &&
              this.props.team_activity.length > 0
            }
            onLoadMore={()=>{
              if(!this.props.team_activity_loaded_all && this.props.team_activity_refreshing != true && this.props.team_activity_loading != true){
                this.props.getActivity({
                  load_type: "load_more",
                  begin: this.props.team_activity_begin
                });
              }

            }}

          />

        </Wrapper>
      );
    }

    if(this.props.team_activity.length === 0){
      return(
        <Wrapper style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
          <Title style={{textAlign:"center"}}>There is nothing to display.</Title>
          <Copy>There is no activity on your account to display.</Copy>
        </Wrapper>
      )
    }

  }

}

export default ActivityList;
