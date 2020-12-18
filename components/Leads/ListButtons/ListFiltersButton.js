import React from 'react';
import {
  Button,
  Wrapper,
  Card,
  Icon,
  Row,
  Copy
} from 'app/NativeComponents/common';

const ListFiltersButton = (props) => {

  return (
    <Button onPress={()=>{
      //toogle map options state
      props.toggleHighlightFilters(false);
      props.resetEditedFilters();
      props.selectTeamFilter(props.applied_team_filter);
      props.appRedirect({redirect: "leadfilters", payload: {active_property: props.active_property, page_id: props.page_id}});
    }}>
      <Card style={{
        borderRadius: 20,
        height: 30,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Wrapper style={{
          padding: 0,
          paddingRight: 15,
          paddingLeft: 15,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Row style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Icon
              icon={"filter-list"}
              size={18}
              style={{
                marginRight: 5
              }}
            />
            <Copy>{props.isMobile ? "Filter" : "Filter Leads"}</Copy>
          </Row>
        </Wrapper>
      </Card>
    </Button>
  )

}



export default ListFiltersButton;
