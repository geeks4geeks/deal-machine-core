import React, { Component } from 'react';
import { Wrapper, Row, Copy, Icon, Button } from 'app/NativeComponents/common';
import { ToggleSwitch } from 'app/NativeComponents/snippets';


class DetailedOptions extends Component{

  render(){
    if(this.props.user.team_clearance_level > 0){
      return (

        <Wrapper style={{
          padding: 5,
        }}>
          <Button onPress={()=>{
            this.props.updateDetailedOptions(!this.props.detailed_options)
          }}>
            <Row style={{
              justifyContent: "flex-end",
            }}>
              <Copy style={{
                fontSize: 10,
              }}>
                Detailed View
              </Copy>
              <Icon
                fa_icon={
                  this.props.detailed_options ? "toggle-on" : "toggle-off"
                }
                style={{
                  marginLeft: 5
                }}
                size={14}
              />
            </Row>
          </Button>

          {/*
          <ToggleSwitch
            value={this.props.detailed_options}
            onChange={value => {
              this.props.updateDetailedOptions(value)
            }}
            text={"View detailed changes to this deal: "}
            style={{
              padding: 10
            }}
          />
          */}

        </Wrapper>
      )
    }else{
      return <Wrapper />
    }
  }
}

export default DetailedOptions;
