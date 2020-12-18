
import React from 'react';

import {
  Wrapper,
  Button,
  Icon,
  Row,
  Copy,
  Bold,
  Card
} from 'app/NativeComponents/common';

const renderLine2 = (props) => {
  if(props.line2 && props.line2 !== ""){
    return (
      <Copy style={{
        whiteSpace: "nowrap",
        fontSize: 10
      }}>
        {props.line2}
      </Copy>
    )
  }

}

const renderSelect = (props) => {
  if(props.selectable){
    return (
      <Button onPress={props.selectItem ? ()=>props.selectItem(!props.selected) : ()=>{}} style={{
        alignSelf: "stretch",
        marginRight: 5,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Icon
          icon={props.selected ? "check-box" : "check-box-outline-blank"}
        />
      </Button>
    )
  }

}

const OwnerItem = (props) => {
  if(props.disabled){
    return (
      <Card style={{
        overflow: props.device === "desktop" ? "hidden" : "visible",
        borderRadius: 5, padding:10, paddingTop: 5,
        paddingBottom: 5, margin: 0, marginRight: 5, marginLeft: 0,  minHeight: 50, alignItems: "flex-start", justifyContent: "center"}}>
        <Row>
          {renderSelect(props)}
          <Wrapper>
            <Copy style={{fontSize: 10,
              textDecorationLine: props.bad_item ? 'line-through' : 'none',
              textDecorationStyle: 'solid'}}>{props.label}</Copy>
            <Copy style={{
              whiteSpace: "nowrap",
              textDecorationLine: props.bad_item ? 'line-through' : 'none',
              textDecorationStyle: 'solid'
            }}>
              <Bold>
                {props.line1}
              </Bold>
            </Copy>
            {renderLine2(props)}
          </Wrapper>

        </Row>
      </Card>
    )
  }
  return (
    <Button onPress={props.onPress} style={{
      overflow: props.device === "desktop" ? "hidden" : "visible"}}>
      <Card style={{borderRadius: 5, padding:10, paddingTop: 5,
        paddingBottom: 5, margin: 0, marginRight: 5, marginLeft: 0, minHeight: 50, alignItems: "flex-start", justifyContent: "center"}}>
        <Row>
          {renderSelect(props)}
          <Wrapper>
            <Copy style={{fontSize: 10,
              textDecorationLine: props.bad_item ? 'line-through' : 'none',
              textDecorationStyle: 'solid'}}>{props.label}</Copy>
            <Copy style={{
              whiteSpace: "nowrap",
              textDecorationLine: props.bad_item ? 'line-through' : 'none',
              textDecorationStyle: 'solid'
            }}>
              <Bold>
                {props.line1}
              </Bold>
            </Copy>
            {renderLine2(props)}
          </Wrapper>

        </Row>
      </Card>
    </Button>
  )


}



export default OwnerItem;
