import React from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Title,
  Copy,
  Icon,
  Row,
  Bold
} from 'app/NativeComponents/common';

import AddressAddButton from './AddressAddButton';

const ActiveAddress = (props) =>{

  if(!props.property && props.address && (props.device === "mobile" || props.isMobile)){

    return(
      <Wrapper style={{
        width: "100%",
        maxWidth: 1000,

      }}>
        <Card>
          <Row >
              <Wrapper
              style={{
                width: 100,
                alignSelf: "stretch",
                backgroundColor: props.colors.gray_color,
                alignItems: "center",
                justifyContent: "center"
              }}>
                  <Icon
                    size={36}
                    icon="home"
                  />
              </Wrapper>
              <Row style={{
                flex: 1
              }}>
                <CardBody style={{
                  padding: 10,
                  flex: 1
                }}>
                  <Wrapper style={{
                    alignSelf: "stretch"
                  }}>
                    <Copy><Bold>Property Address:</Bold></Copy>

                    <Title>{props.address.address}</Title>
                    <Copy>{props.address.city+", "+props.address.state+" "+props.address.zip}</Copy>
                    <AddressAddButton
                      token={props.token}
                      add_deal_loading={props.add_deal_loading}
                      address={props.address}
                      addDeal={props.addDeal}
                      current_route={props.current_route}
                      colors={props.colors}
                    />

                  </Wrapper>

                </CardBody>
              </Row>
          </Row>
        </Card>
      </Wrapper>
    )
  }

  return <Wrapper />;

}


export default React.memo(ActiveAddress);
