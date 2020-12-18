import React, { Component } from 'react';

import {
  Wrapper,
  Card,
  Row,
  Spin,
  Copy
} from 'app/NativeComponents/common';
import { DragDropList } from 'app/NativeComponents/snippets';

import ListItem from './ListItem';
class ListView extends Component {

  checkColumnSearch(column_title){
    if(this.props.column_search && this.props.column_search.length > 0){
      if(column_title.toLowerCase().startsWith(this.props.column_search.toLowerCase().trim())){
        return true;
      }else{
        return false;
      }
    }

    return true;

  }

  renderMainColumn(){
    if(this.props.list_columns[0]){
      if(this.checkColumnSearch(this.props.list_columns[0].title)){
        return(
          <ListItem
            key={this.props.list_columns[0].id}
            item={this.props.list_columns[0]}
            list_columns={this.props.list_columns}
            checkListItem={this.props.checkListItem}
            colors={this.props.colors}
          />
        )
      }
    }
  }


  render() {

    if(this.props.list_columns){
      if(this.props.list_columns.length > 0){

        return (
          <Card>

            {this.renderMainColumn()}
            <DragDropList
              id="list_columns_draggable"
              rowNumber={1}
              style={{flex: 1}}
              items={this.props.list_columns}
              infiniteScroll={true}
              itemStruture={({item}) => {
                if(item.main_column !== true && this.checkColumnSearch(item.title)){
                  return (
                    <ListItem
                      key={item.id}
                      item={item}
                      list_columns={this.props.list_columns}
                      checkListItem={this.props.checkListItem}
                      colors={this.props.colors}
                    />
                  )
                }
              }}
              handleReorder={(data)=>{
                this.props.reorderItems(data);
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
    }

    if(this.props.list_columns.length === 0){
      return(
        <Wrapper>
          <Wrapper style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Row><Spin size="small"/><Copy style={{marginLeft: 10}}>Loading...</Copy></Row>
          </Wrapper>
        </Wrapper>
      )
    }

    return <Wrapper />
  }

}


export default ListView;
