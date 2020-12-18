import React, { Component } from 'react';
import {
  Wrapper,
  Row,
  Spin,
  Copy,
  Scroll,
  Icon,
  Button,
  Title
} from 'app/NativeComponents/common';

import SearchItem from './SearchItem';

import{
  dismissMobileKeyboard,
  getMyLocation
} from 'app/NativeActions';

class SearchItems extends Component{

  constructor(props) {
    super(props);
  }

  renderAutocompeleteError(){
    if(this.props.autocomplete_error){
      return(
        <Wrapper style={{
          padding: 20
        }}>
          <Row>
            <Copy>No results found.</Copy>
          </Row>
        </Wrapper>
      )
    }
  }

  render(){
    if(this.props.autocomplete_loading){
      return (
        <Wrapper style={{
          padding: 15
        }}>
          <Row>
            <Wrapper style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10
            }}>
              <Spin size="small" />
            </Wrapper>
            <Copy>Searching leads...</Copy>
          </Row>
        </Wrapper>
      )
    }

    if(this.props.focused || this.props.autocomplete_items.length > 0){
      return(
        <Scroll
        keyboardShouldPersistTaps={"always"}
        style={{
          maxHeight: 350
        }}>
          {this.props.autocomplete_items.map((item, i)=>{
            return(
              <SearchItem
                key={i}
                property={item}
                {...this.props}
              />
            )
          })}
          {this.renderAutocompeleteError()}

        </Scroll>
      );

    }



    return <Wrapper />

  }
}


export default SearchItems;
