import React from 'react';
import {
  Wrapper,
  Row,
  Spin,
  Copy
} from 'app/NativeComponents/common';
import {
  PillButton
} from 'app/NativeComponents/snippets';

const AddressAddButton = (props) =>{

  if(props.add_deal_loading.some(property => property.property_id ==props.address.full_address)){
    return(
      <Wrapper style={{
        marginTop: 5
      }}>
        <Wrapper style={{margin: 0, padding: 5, paddingRight: 15, paddingLeft: 15}}>
          <Row>
            <Spin size={"small"}/>
            <Copy style={{marginLeft: 5}}>Searching for property owner...</Copy>
          </Row>
        </Wrapper>
      </Wrapper>
    )
  }

  return (

    <Wrapper style={{
      marginTop: 5
    }}>
      <PillButton style={{margin: 0}} onPress={()=>{
        props.addDeal({
          token: props.token,
          property: {
            property_id: props.address.full_address,
            from_data_source_id: props.address.full_address,
            from_data_source: "address"
          },
          route_id: props.current_route ? props.current_route.id : 0,
          address: props.address.address1,
          address2: props.address.address2,
          city: props.address.city,
          state: props.address.state,
          zip: props.address.zip,
          devicetype: props.isMobile ? "mobile_map" : props.device+"_map"

        })
      }}>
        Search Owner And Add Lead
      </PillButton>
    </Wrapper>

  );
}


export default React.memo(AddressAddButton);
