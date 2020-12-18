import React from 'react';
import {
  Wrapper,
  Row
} from 'app/NativeComponents/common';

import {
  InformationItem
} from 'app/NativeComponents/snippets'


const MoreInformation = (props) =>{

  let column_count = 4;

  if(props.user.team_clearance_level > 0){
    if(props.list_settings && props.property.owner_status_info){
      if(props.list_settings.user_list_columns.length > 0){

        return(
          <Row style={{
            flexWrap: "wrap",

            paddingTop: 10,
            paddingBottom: 10,
            alignSelf: "stretch",
            position: "relative"
          }}>

            {props.list_settings.user_list_columns.map((info, i)=>{

              if(info.card_column && info.show && column_count > 0){
                column_count = column_count - 1;

                return (
                  <Wrapper
                    key={i}
                    style={{
                    marginTop: 10,
                    width: "50%"
                  }}>
                    <InformationItem

                      style={{
                        marginRight: 5
                      }}
                      size={"small"}
                      label={info.title+":"}
                      item={props.property[info.slug] ? props.property[info.slug] : "--"}
                      format={props.property[info.slug] ? info.format : ""}
                    />

                  </Wrapper>
                )

              }
              return <Wrapper />
            })}

          </Row>
        )
      }
    }
  }

  return <Wrapper />;
}


export default MoreInformation;
