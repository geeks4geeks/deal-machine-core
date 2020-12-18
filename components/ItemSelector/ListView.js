import React, { Component } from 'react';

import {
  Wrapper,
  Copy,
  Button,
  Card,
  Title,
  Bold,
  Row
} from 'app/NativeComponents/common';
import { List, PillButton } from 'app/NativeComponents/snippets';
import ListItem from './ListItem';
class ListView extends Component {

  render() {

    if(this.props.item_selector_modal.items.length > 0){
      return (
      <List
          listFooter={()=>{
            return(
              <Row style={{
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: 20
              }}>
                <PillButton primary={true} onPress={()=>{
                  this.props.confirmUpdate();
                }}>
                  {this.props.renderRightButtonText()}
                </PillButton>
              </Row>
            )
          }}
          rowNumber={1}
          style={{flex: 1}}
          items={this.props.item_selector_modal.items}
          infiniteScroll={true}
          itemStruture={({item}) => {
            return (
              <ListItem
                key={item.value}
                item={item}
                item_selector_modal={this.props.item_selector_modal}
                selected_items={this.props.selected_items}
                checkItem={this.props.checkItem}
              />
            )
          }}
          canRefresh={false}
          onRefresh={()=>{}}
          is_refreshing={false}
          canLoadMore={false}
          isLoadingMore={false}
          onLoadMore={()=>{}}
        />
      )
    }

    if(this.props.item_selector_modal.items.length === 0){
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
              No items found.
            </Title>
            <Copy style={{
              textAlign: "center"
            }}>No items were found matching your criteria.</Copy>
          </Wrapper>
        </Wrapper>
      )
    }

    return <Wrapper />
  }

}


export default ListView
