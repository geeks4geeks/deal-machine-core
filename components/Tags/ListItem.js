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
    for(let i = 0; i<this.props.selected_tags.length; i++){
      if(this.props.selected_tags[i].id === this.props.item.id){
        return true;
      }
    }

    return false;
  }
  render() {

    return (
      <Wrapper style={{
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.border_color,
        borderBottomStyle: "solid",
        padding: 15
      }}>
        <Button onPress={()=>{
          this.props.checkItem(this.props.item)
        }}>
          <Row>
            <Wrapper
              style={{
                padding: 15,
                alignItems: "flex-start",
                justifyContent: "center",
                alignSelf: "stretch"
              }}
            >
              <Icon
                icon={this.isChecked() ? "check-box" : "check-box-outline-blank"}
                size={22}
              />
            </Wrapper>
            <Title>{this.props.item.title}</Title>
          </Row>
        </Button>

      </Wrapper>
    )
  }

}


export default ListItem;
