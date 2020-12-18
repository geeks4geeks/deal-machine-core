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
            <Spin />
          </Wrapper>
        </Wrapper>
      )
    }

    if(this.props.lists.length > 0 && !this.props.lists_refreshing){
      return (
          <Card>
          <List
            listFooter={()=>{
              if((this.props.selected_lists.length > 0 ||
                this.props.list_modal.type === "edit_lists_for_lead" ||
                this.props.list_modal.type === "filter_lists_for_leads")
                && (!this.props.list_modal.popoverTarget || this.props.device !== "desktop")
              ){

                return(
                  <Row style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: 10,
                    marginTop: 10
                  }}>
                    <PillButton primary={true} onPress={()=>{
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
            items={this.props.lists}
            infiniteScroll={true}
            itemStruture={({item}) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  selected_lists={this.props.selected_lists}
                  checkListItem={this.props.checkListItem}
                  colors={this.props.colors}
                />
              )
            }}
            canRefresh={true}
            onRefresh={()=>{
              this.props.searchLists("refresh")
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
                this.props.searchLists("load")
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
            }}>No lists were found matching your criteria. Would you like to create one instead?</Copy>
            <Row style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20
            }}>

              <PillButton primary={true} onPress={()=>{
                this.props.appRedirect({redirect: "goForward", payload:{add: "create-list"}});
              }}>
                Create List
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
