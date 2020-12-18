import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Row,
  Copy,
  Title,
  Button
} from 'app/NativeComponents/common';

class ActiveDeals extends Component{



  render(){
    if(this.props.active_deals &&this.props.analytics_dates ){
      if(this.props.analytics_dates.length > 0){

        return (
          <Card>
            <CardBody style={{
              padding: 15,
              paddingBottom: 15
            }}>
              <Copy>Active Leads Snapshot</Copy>
            </CardBody>
            <CardBody style={{
              paddingTop: 0,
              paddingBottom: 0
            }}>

              <Row style={{
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap"
              }}>
                {
                  this.props.active_deals.map((status, i)=>{
                    return(
                      <Button
                      key={i}
                      onPress={()=>{
                        this.props.clearAllLeadFilters();
                        this.props.applyFilters([this.props.active_list]);

                        this.props.applyFilters({
                          filters: {
                            deal_status_ids: status.id
                          },
                          preset: null,
                          preset_object: null})
                        this.props.appRedirect({
                          redirect: "leads_push"
                        });
                      }}
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        marginRight: "1.6%",
                        marginBottom:15,
                        width: "30%"
                      }}>
                        <Wrapper>
                          <Title style={{
                            fontSize: 32,
                            marginBottom: 5,
                            color: this.props.colors.active_color,
                            textAlign: "center"
                          }}>{status.deal_count != 0 ? status.deal_count : "--"}</Title>
                          <Copy style={{
                            textAlign: "left"
                          }}>{status.title}</Copy>
                        </Wrapper>
                      </Button>
                    )
                  })
                }
              </Row>
            </CardBody>
          </Card>
        );
      }
    }

    //render a placeholder card eventually
    return <Wrapper />;

  }

}

export default ActiveDeals;
