import React, { Component } from 'react';

import {
  Wrapper,
  CardBody,
  Copy,
  Bold,
  Row,
  Icon,
  Button,
  Spin
} from 'app/NativeComponents/common';

import ListIcon from './ListIcon';

class ListItem extends Component {


  renderSubText(){
    if(this.props.item.building == 1){
      return(
        <Row>
          <Spin size="small" />
          <Copy style={{marginLeft: 5}}>Building List...</Copy>
        </Row>
      )
    }
    return <Copy>{this.props.item.lead_count ? this.props.item.lead_count === 1 ? "1 lead" : this.props.item.lead_count+" leads" : "0 leads"}</Copy>;
  }
  render() {
    const { active_list, item, colors, isMobile, onPress } = this.props;
    return (
      <CardBody style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.border_color,
        borderBottomStyle: "solid",
        backgroundColor: active_list ? active_list.id == item.id ? colors.background_color : colors.card_color : colors.card_color,
        padding: 15
      }}>
        <Button onPress={onPress}>
          <Row>
            <ListIcon item={item} colors={colors} isMobile={isMobile} />
            <Wrapper style={{flex: 1}}>
              <Copy><Bold>{item.title}</Bold></Copy>
              {this.renderSubText()}
            </Wrapper>
          </Row>
        </Button>
      </CardBody>
    )
  }

}


export default ListItem;
