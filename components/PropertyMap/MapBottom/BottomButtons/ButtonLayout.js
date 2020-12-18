import React from 'react';
import {
  Wrapper,
  Card,
  Button,
  Row,
  Spin,
  Copy,
  Bold,
  Icon
} from 'app/NativeComponents/common';

const renderIconOrSpinner = (props) => {

  if(props.spin){
    return(
      <Spin size="small"/>
    )
  }

  return(
    <Icon
      icon={props.icon}
      size={20}
    />
  )
}

const renderInsideItems = (props) =>{
  return(
    <Card style={{
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 20,
      ...props.style

    }}>
      <Row>
        <Wrapper style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5
        }}>
          {renderIconOrSpinner(props)}
        </Wrapper>
        <Copy>
          <Bold>{props.text}</Bold>
        </Copy>
      </Row>
    </Card>
  )
}

const ButtonLayout = (props) =>{

  if(props.disabled){
    return(
      <Wrapper style={{
        marginBottom: 20,
        ...props.outerstyle
      }}>
        {renderInsideItems(props)}
      </Wrapper>
    )
  }
  return(
    <Button
      onPress={props.onPress}
      style={{
        marginBottom: 20,
        ...props.outerstyle
      }}
    >
      {renderInsideItems(props)}
    </Button>
  )

}


export default React.memo(ButtonLayout);
