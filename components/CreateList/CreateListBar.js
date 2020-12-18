import React, { Component } from 'react';

import {
  Input,
  Wrapper,
  Card,
  Row,
  Copy,
  Button,
  Bold
} from 'app/NativeComponents/common';
import {
  PillButton
} from 'app/NativeComponents/snippets';

class CreateListBar extends Component {

  render() {

    return (
      <Wrapper>
          <Card>
            <Input
              style={{
                borderBottomWidth: 0
              }}
              ref="search"
              name="search"
              returnKeyType={"default"}
              blurOnSubmit={true}
              autoCorrect={false}
              autoFocus={false}
              keyboardType="default"
              placeholder={"List Name"}
              onChange={value => {
                //location search
               this.props.updateListSearch(value);

              }}
              onSubmitEditing={()=>{
                this.props.newList();
              }}

              onFocus={()=>{
              }}
              onBlur={()=>{

              }}

              value={this.props.list_search}
              type="text"
            />

          </Card>

          <Row style={{
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 20
          }}>
            <PillButton primary={true} onPress={()=>{
              this.props.newList();
            }}>
              Create List
            </PillButton>
          </Row>
      </Wrapper>
    )
  }

}


export default CreateListBar;
