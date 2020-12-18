import React, { Component } from 'react';

import {
  Wrapper,
  Title,
  Copy,
  Bold,
  Row,
  Button,
  Icon
} from 'app/NativeComponents/common';

class ListItem extends Component {

  renderColumnText(){

    if(this.props.item.main_column === true){
      return <Copy>Mobile View Option</Copy>;
    }

    if(this.props.item.card_column === true){
      return <Copy>Mobile View Option</Copy>;
    }
  }

  renderIcon(){
    if(this.props.item.main_column === true){
      return <Icon
                icon={"check-box"}
                size={22}
                color={this.props.colors.light_text_color}
             />

    }

    return <Icon
              icon={this.isChecked() ? "check-box" : "check-box-outline-blank"}
              size={22}
           />
  }

  isChecked(){
    if(this.props.item.show){
      return true;
    }
    return false;
  }

  render() {

    return (
      <Wrapper style={{
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.border_color,
        borderBottomStyle: "solid",
        padding: 10
      }}>
        <Button
        disabled={this.props.item.main_column}
        onPress={()=>{
          this.props.checkListItem(this.props.item)
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
              {this.renderIcon()}
            </Wrapper>
            <Wrapper>
              <Title>{this.props.item.title}</Title>
              {this.renderColumnText()}
            </Wrapper>
          </Row>
        </Button>

      </Wrapper>
    )
  }

}


export default ListItem;
