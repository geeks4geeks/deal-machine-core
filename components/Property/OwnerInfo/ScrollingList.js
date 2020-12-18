
import React from 'react';

import {
  Wrapper,
  Copy,
  Scroll,
  Row
} from 'app/NativeComponents/common';

const ScrollingList = (props) => {

  return (
    <Wrapper style={{backgroundColor: props.colors.background_color}}>
      <Wrapper style={{padding: 15, paddingBottom: 0}}>
        <Copy>{props.label} </Copy>
      </Wrapper>
      <Scroll
        horizontal={true}
      >
        <Row style={{padding: 15}}>
          {props.renderHeader ? props.renderHeader() : ()=>{return <Wrapper />}}
          {props.items.map((item, index)=>{
            return props.renderItem({item, index})
          })}
          {props.renderFooter ? props.renderFooter() : ()=>{return <Wrapper />}}

        </Row>
      </Scroll>
    </Wrapper>
  )


}



export default ScrollingList;
