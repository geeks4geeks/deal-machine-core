import React, { Component } from 'react';

import {
  Input,
  Wrapper,
  Row,
  Card,
  Icon,
  Button,
  Copy
} from 'app/NativeComponents/common';

class SearchBar extends Component {


  render() {
    return (
      <Card>
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
            placeholder={"Search Columns"}
            onChange={value => {
              //location search
             this.props.updateColumnSearch(value);

            }}
            onSubmitEditing={()=>{

            }}

            onFocus={()=>{
            }}
            onBlur={()=>{

            }}

            value={this.props.column_search}
            type="text"
          />


        </Row>
      </Card>
    )

  }

}


export default SearchBar
