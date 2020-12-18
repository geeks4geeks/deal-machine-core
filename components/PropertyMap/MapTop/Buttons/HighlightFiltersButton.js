import React from 'react';
import {
  Button,
  Row,
  Wrapper,
  Card,
  Copy,
  Bold,
  Icon
} from 'app/NativeComponents/common';

const HighlightFiltersButton = (props) => {

  if(props.user.team_clearance_level > 0){
    return (
      <Button onPress={()=>{
        //toogle map options state
        props.toggleHighlightFilters(true);
        props.resetEditedFilters();
        props.selectTeamFilter(props.applied_team_filter);
        props.appRedirect({redirect: "mapFilters"});
      }}>
        <Card style={{
          borderRadius: 20
        }}>
          <Wrapper style={{
            padding: 5,
            paddingRight: 15,
            paddingLeft: 15,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Row>
              {/*
              <Icon
                icon={"highlight"}
                size={18}
                style={{marginRight: 5}}
              />
              */}
              <Copy><Bold>Highlights</Bold></Copy>
            </Row>
          </Wrapper>
        </Card>
      </Button>
    )
  }

  return <Wrapper />

}



export default HighlightFiltersButton;
