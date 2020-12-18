import React, { Component } from 'react';
import { Wrapper, Spin} from 'app/NativeComponents/common';

class ActivityLoading extends Component{

  render(){
    if(this.props.type == "note"){
      if(!this.props.item.date_created){
        return (
          <Wrapper style={{
            width: 50,
            justifyContent:"center",
            alignItems: "flex-start"
          }}>
            <Spin size={"small"} />
          </Wrapper>
        )
      }
    }

    return <Wrapper />;
  }
}

export default ActivityLoading;
