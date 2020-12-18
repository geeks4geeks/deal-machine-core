import React, { Component } from 'react';

import {
  Wrapper,
  Title,
  Row,
  Button,
  Icon
} from 'app/NativeComponents/common';

class ListItem extends Component {



  isChecked(){
    for(let i = 0; i<this.props.selected_items.length; i++){
      if(this.props.selected_items[i].value === this.props.item.value){
        return true;
      }
    }
    return false;
  }

  render() {

    return (
      <Wrapper style={{
        padding: 15
      }}>
        <Button
          onPress={()=>{
            this.props.checkItem(this.props.item)
          }}
        >
          <Row>

            <Wrapper style={{
              padding: 15,
              alignItems: "flex-start",
              justifyContent: "center",
              alignSelf: "stretch"
            }}>
              <Icon
                icon={
                  this.props.item_selector_modal.item_limit === 1 ?
                    this.isChecked() ? "radio-button-checked" : "radio-button-unchecked" :
                      this.isChecked() ? "check-box" : "check-box-outline-blank"
                }
                size={22}
              />
            </Wrapper>
            <Wrapper>
              <Title>{this.props.item.label}</Title>
            </Wrapper>
          </Row>
        </Button>
      </Wrapper>
    )
  }

}


export default ListItem;
