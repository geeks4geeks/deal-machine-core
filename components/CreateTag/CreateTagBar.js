import React, { Component } from 'react';

import {
  Input,
  Wrapper,
  Card,
  Row,
  Copy,
  Button,
  Bold,

} from 'app/NativeComponents/common';
import {
  PillButton
} from 'app/NativeComponents/snippets';




class CreateTagBar extends Component {

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
              placeholder={"Tag Name"}
              onChange={value => {
                //location search
               this.props.updateTagSearch(value);

              }}
              onSubmitEditing={()=>{
                this.props.newTag();
              }}

              onFocus={()=>{
              }}
              onBlur={()=>{

              }}

              value={this.props.tag_search}
              type="text"
            />

          </Card>

          <Row style={{
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 20
          }}>
            <PillButton primary={true} onPress={()=>{
              this.props.newTag();
            }}>
              Create Tag
            </PillButton>
          </Row>
      </Wrapper>
    )
  }

}


export default CreateTagBar;
