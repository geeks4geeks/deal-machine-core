import React, { Component } from 'react';

import {
  Wrapper,
  CardBody,
  Title,
  Copy,
  Row,
  Button,
  Bold,
  Icon
} from 'app/NativeComponents/common';

class ListItem extends Component {



  isChecked(){

    if(parseInt(this.props.selected_status) === parseInt(this.props.item.id)){
      return true;
    }

    return false;
  }

  renderCopy(){
    if(this.isChecked()){
      return <Copy>{this.props.item.description}</Copy>;
    }
  }

  renderSpecialStatus(){
    if(this.isChecked()){
      switch(this.props.item.slug){

        default:
        break;

        case "pending_approval":
          return(
            <Copy>
              <Bold>
                *This status will pause mailers for {this.props.selected_leads.length > 1 ? "these leads." : "this lead."}
              </Bold>
            </Copy>
          )

        case "with_marketing":
          return(
            <Copy>
              <Bold>
                *This status will start mailers for {this.props.selected_leads.length > 1 ? "these leads." : "this lead."}
              </Bold>
            </Copy>
          )

        case "marketing_complete":
          return(
            <Copy>
              <Bold>
                *This status and all proceeding statuses will complete mailers for {this.props.selected_leads.length > 1 ? "these leads." : "this lead."}
              </Bold>
            </Copy>
          )

        case "in_trash":
          return(
            <Copy>
              <Bold>
                *This status will send {this.props.selected_leads.length > 1 ? "these leads." : "this lead"} to the trash.
              </Bold>
            </Copy>
          )

        case "won_deal":
          return(
            <Copy>
              <Bold>
                *This status will mark {this.props.selected_leads.length > 1 ? "these leads." : "this lead"} as "won".
              </Bold>
            </Copy>
          )
      }
    }


  }

  render() {

    return (
      <CardBody style={{
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.border_color,
        borderBottomStyle: "solid",
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
                icon={this.isChecked() ? "radio-button-checked" : "radio-button-unchecked"}
                size={22}
              />
            </Wrapper>
            <Wrapper style={{flex: 1}}>
              <Title>{this.props.item.title}</Title>
              {this.renderCopy()}
              {this.renderSpecialStatus()}
            </Wrapper>
          </Row>
        </Button>
      </CardBody>
    )
  }

}


export default ListItem;
