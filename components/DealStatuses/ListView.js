import React, { Component } from 'react';

import {
  Wrapper,
  Copy,
  Spin,
  Button,
  Card,
  Title,
  Bold,
  Row
} from 'app/NativeComponents/common';
import {
  PillButton
} from 'app/NativeComponents/snippets';
import { List } from 'app/NativeComponents/snippets';
import ListItem from './ListItem';
class ListView extends Component {

  render() {

    if(this.props.all_statuses.length === 0 && this.props.all_statuses_loading){
      return(
        <Wrapper>
          <Wrapper style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Spin size="small"/>
          </Wrapper>
        </Wrapper>
      )
    }

    if(this.props.all_statuses.length > 0){
      return (
          <Card>
            <List
              listFooter={()=>{
                if(this.props.selected_status && this.props.selected_status !== 0 && (!this.props.status_modal.popoverTarget || this.props.device !== "desktop")){

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

                }

                return <Wrapper />
              }}
              rowNumber={1}
              style={{flex: 1}}
              items={this.props.all_statuses}
              infiniteScroll={true}
              itemStruture={({item}) => {
                return (
                  <ListItem
                    key={item.id}
                    item={item}
                    colors={this.props.colors}
                    selected_status={this.props.selected_status}
                    selected_leads={this.props.selected_leads}
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
          </Card>
      )
    }

    if(this.props.all_statuses.length === 0){
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
              No status found.
            </Title>
            <Copy style={{
              textAlign: "center"
            }}>No statues were found matching your criteria.</Copy>

          </Wrapper>
        </Wrapper>
      )
    }

    return <Wrapper />
  }

}


export default ListView
