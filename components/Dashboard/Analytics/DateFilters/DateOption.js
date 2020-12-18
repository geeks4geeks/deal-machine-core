import React, { Component } from 'react';
import { Button, Wrapper, Copy, Bold, Card } from 'app/NativeComponents/common';

class DateOption extends Component{


  render(){

    if(this.props.date_type == this.props.date_option){
      //is active button
      return(
        <Button style={{
          marginLeft: 5,
          marginRight: 5,
          alignItems:"center",
          justifyContent: "center",
        }}
        onPress={()=>{
          if(this.props.onPress){
            this.props.onPress();
          }
        }}
        >
          <Card style={{
            borderRadius: 20,
            margin: 0
          }}>
            <Wrapper style={{
              padding: 5,
              paddingRight: 15,
              paddingLeft: 15
            }}>
              <Copy><Bold>{this.props.title}</Bold></Copy>
            </Wrapper>
          </Card>

        </Button>
      );

    }
    return (
      <Button style={{
        marginLeft: 5,
        marginRight: 5,
        alignItems:"center",
        justifyContent: "center",
      }}
      onPress={()=>{
        if(!this.props.onPress){
          this.props.changeAnalyticsDateOption({
            date_option: this.props.date_type,
            user: this.props.user
          });
        }else{
          this.props.onPress();
        }
      }}
      >
        <Wrapper style={{
          padding: 5,
          paddingRight: 15,
          paddingLeft: 15
        }}>
          <Copy>{this.props.title}</Copy>
        </Wrapper>

      </Button>
    );
  }

}

export default DateOption;
