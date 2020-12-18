import React, { Component } from 'react';

import {
  Wrapper,
  CardBody,
  Title,
  Row,
  Button,
  Icon
} from 'app/NativeComponents/common';

class ListItem extends Component {



  isChecked(){
    for(let i = 0; i<this.props.selected_lists.length; i++){
      if(this.props.selected_lists[i].id === this.props.item.id){
        return true;
      }
    }

    return false;
  }
  render() {

    return (
      <CardBody style={{
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.background_color,
        borderBottomStyle: "solid",
        padding: 15
      }}>
        <Button onPress={()=>{
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
              <Icon
                icon={this.isChecked() ? "check-box" : "check-box-outline-blank"}
                size={22}
              />
            </Wrapper>
            <Title style={{flex: 1}}>{this.props.item.title}</Title>
          </Row>
        </Button>

      </CardBody>
    )
  }

}


export default ListItem;
