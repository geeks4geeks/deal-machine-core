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
  Row
} from 'app/NativeComponents/common';
import { List, PillButton } from 'app/NativeComponents/snippets';
import ListItem from './ListItem';
class ListView extends Component {

  renderItem(item){

  }

  render() {
    if(this.props.tags_loading){
      return(
        <Wrapper>
          <Wrapper style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Spin />
          </Wrapper>
        </Wrapper>
      )
    }

    if(this.props.all_tags.length > 0 && !this.props.tags_loading){
      return (
        <Card>
          <List
            listFooter={()=>{
              if((this.props.selected_tags.length > 0 ||
                this.props.tag_modal.type === "edit_tags_for_lead") && (!this.props.tag_modal.popoverTarget || this.props.device !== "desktop")
              ){

                return(
                  <Row style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: 20
                  }}>
                    <PillButton onPress={()=>{
                      this.props.confirmUpdate();
                    }}>
                      {this.props.renderRightButtonText()}
                    </PillButton>
                  </Row>
                )

              }

              return <Wrapper />
            }}
            rowNumber={1}
            style={{flex: 1}}
            items={this.props.all_tags}
            infiniteScroll={true}
            itemStruture={({item}) => {
              if(item.hidden_tag == 0){
                return (
                  <ListItem
                    key={item.id}
                    item={item}
                    selected_tags={this.props.selected_tags}
                    checkItem={this.props.checkItem}
                    colors={this.props.colors}
                  />
                )
              }
            }}
            canRefresh={false}
            onRefresh={()=>{
            }}
            is_refreshing={false}
            canLoadMore={false}
            isLoadingMore={false}
            onLoadMore={()=>{}}
          />
        </Card>
      )
    }

    if(this.props.all_tags.length === 0){
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
              No tags found.
            </Title>
            <Copy style={{
              textAlign: "center"
            }}>No tags were found matching your criteria. Would you like to create one instead?</Copy>
            <Row style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20
            }}>
              <PillButton onPress={()=>{
                this.props.appRedirect({redirect: "goForward", payload:{add: "create-tag"}});
              }}>
                Create Tag
              </PillButton>
            </Row>
          </Wrapper>
        </Wrapper>
      )
    }

    return <Wrapper />
  }

}


export default ListView
