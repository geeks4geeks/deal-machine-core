import React, { Component } from 'react';

import {
  Wrapper,
  Copy,
  Spin,
  Button,
  Card,
  Title,
  Bold,
  Icon,
  Row,
} from 'app/NativeComponents/common';
import { List, PillButton } from 'app/NativeComponents/snippets';

import ListItem from './ListItem';

class ListView extends Component {

  render() {

    if((this.props.lists.length === 0 && this.props.lists_loading) || this.props.lists_refreshing){
      return(
        <Wrapper>
          <Wrapper style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Row>
              <Spin size={"small"}/>
              <Copy style={{marginLeft: 5}}>Loading Lists...</Copy>
            </Row>
          </Wrapper>
        </Wrapper>
      )
    }

    if(this.props.lists.length > 0 && !this.props.lists_refreshing){
      return (
          <Card>
          <List
            rowNumber={1}
            style={{flex: 1}}
            items={this.props.lists}
            infiniteScroll={true}
            itemStruture={({item}) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  onPress={()=>{
                    this.props.setActiveList(item)
                    this.props.appRedirect({redirect: "list_item", payload:{id: item.id}})
                  }}
                  active_list={this.props.active_list}
                  colors={this.props.colors}
                  isMobile={this.props.isMobile}
                />
              )
            }}
            canRefresh={true}
            onRefresh={()=>{
              this.props.getTeamLists("refresh")
            }}
            is_refreshing={this.props.lists_refreshing}
            canLoadMore={
              !this.props.lists_loaded_all &&
              !this.props.lists_loading &&
              !this.props.lists_refreshing &&
              this.props.lists.length > 0
            }
            isLoadingMore={
              this.props.lists_loading &&
              !this.props.lists_refreshing &&
              this.props.lists.length > 0
            }
            onLoadMore={()=>{
              if(!this.props.lists_loaded_all && this.props.lists_refreshing !== true && this.props.lists_loading !== true){
                this.props.getTeamLists("load")
              }
            }}
          />
        </Card>
      )
    }

    if(this.props.lists.length === 0){
      return(
        <Wrapper>
          <Wrapper style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Title style={{
              textAlign: "center"
            }}>
              No list found.
            </Title>
            <Copy style={{
              textAlign: "center"
            }}>No lists were found matching your criteria.</Copy>

          </Wrapper>
        </Wrapper>
      )
    }

    return <Wrapper />
  }

}


export default ListView
