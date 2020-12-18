import React, { Component } from 'react';

import {
  Input,
  Wrapper,
  Row,
  Copy,
  Button,
  Icon
} from 'app/NativeComponents/common';

class SearchBar extends Component {

  componentWillUnmount(){
    clearInterval(this._search_interval);
  }

  renderCreateTagButton(){
    if(this.props.user.team_clearance_level > 0){
      return(
        <Button onPress={()=>{
          this.props.appRedirect({redirect: "goForward", payload:{add: "create-tag"}});
        }} style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 20
        }}>
          <Copy>Create Tag</Copy>
        </Button>
      )
    }
  }

  render() {

    return (
      <Wrapper style={{
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.border_color,
        borderBottomStyle: "solid"
      }}>
        <Row>
          <Wrapper style={{
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 20
          }}>
            <Icon
              icon="search"
              size={18}
            />
          </Wrapper>
          <Input
            style={{
              borderBottomWidth: 0,
              flex: 1
            }}
            ref="search"
            name="search"
            returnKeyType={"search"}
            blurOnSubmit={true}
            autoCorrect={false}
            autoFocus={false}
            keyboardType="default"
            placeholder={"Search Tags"}
            onChange={value => {
              //location search
             this.props.updateTagSearch(value);

             clearInterval(this._search_interval);
             this._search_interval = setTimeout(()=>{
               this.props.searchTags(value);
             }, 250);
            }}
            onSubmitEditing={()=>{

            }}

            onFocus={()=>{
            }}
            onBlur={()=>{

            }}

            value={this.props.tag_search}
            type="text"
          />
          {this.renderCreateTagButton()}
        </Row>
      </Wrapper>
    )
  }

}


export default SearchBar
