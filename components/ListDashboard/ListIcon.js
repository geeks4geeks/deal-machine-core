import React, { Component } from 'react';

import {
  Wrapper,
  Icon
} from 'app/NativeComponents/common';

class ListIcon extends Component {

  render() {

    if(this.props.item.smart_list == 1){
      return(
        <Wrapper style={{paddingRight: this.props.size === "large" ? this.props.isMobile ? 0 : 15 : 15}}>
          <Wrapper style={{
            width: this.props.size === "large" ? 42 : 26,
            height: this.props.size === "large" ? 42 : 26,
            borderRadius: this.props.size === "large" ? 21 : 13,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: this.props.colors.success_color
          }}>
            <Icon
              size={18}
              icon={"school"}
            />
          </Wrapper>
        </Wrapper>
      )
    }

    switch(this.props.item.list_type){
      case "normal":
      default:
        return(
          <Wrapper style={{paddingRight: this.props.size === "large" ? this.props.isMobile ? 0 : 15 : 15}}>
            <Wrapper style={{
              width: this.props.size === "large" ? 42 : 26,
              height: this.props.size === "large" ? 42 : 26,
              borderRadius: this.props.size === "large" ? 21 : 13,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.props.colors.gray_color
            }}>
              <Icon
                size={18}
                icon={"reorder"}
              />
            </Wrapper>
          </Wrapper>
        )
      break;

      case "bulk_import":
      case "bulk_upload":
        return(
          <Wrapper style={{paddingRight: this.props.size === "large" ? this.props.isMobile ? 0 : 15 : 15}}>
            <Wrapper style={{
              width: this.props.size === "large" ? 42 : 26,
              height: this.props.size === "large" ? 42 : 26,
              borderRadius: this.props.size === "large" ? 21 : 13,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.props.colors.gray_color
            }}>
              <Icon
                size={18}
                icon={"publish"}
              />
            </Wrapper>
          </Wrapper>
        )
      break;

      case "build_list":
        return(
          <Wrapper style={{paddingRight: this.props.size === "large" ? this.props.isMobile ? 0 : 15 : 15}}>
            <Wrapper style={{
              width: this.props.size === "large" ? 42 : 26,
              height: this.props.size === "large" ? 42 : 26,
              borderRadius: this.props.size === "large" ? 21 : 13,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.props.colors.gray_color
            }}>
              <Icon
                size={14}
                fa_icon={"gears"}
              />
            </Wrapper>
          </Wrapper>
        )
      break;
    }

    return <Wrapper />

  }

}


export default ListIcon;
