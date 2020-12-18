import React, { Component } from 'react';
import { Wrapper, Card, Row, Copy, Bold, Button, Icon } from 'app/NativeComponents/common';
import moment from 'moment';

class DatesFilterTag extends Component{

  handleClearFilter(){
    this.props.updateSingleRouteFilter({prop: "start_date", value: null});
    this.props.updateSingleRouteFilter({prop: "end_date", value: null})

  }

  render(){
    if(this.props.route_filters.start_date != this.props.originalRouteFilters.start_date &&
      this.props.route_filters.end_date != this.props.originalRouteFilters.end_date
    ){
      return (
        <Card style={{
          marginLeft: 0,
          borderRadius: 15,
          height: 30,
          alignItems: "flex-start",
          justifyContent:"center"
        }}>
          <Row style={{
            padding: 0,
            paddingLeft: 15,
            paddingRight: 15
          }}>
            <Copy><Bold>Added between: </Bold> {moment(this.props.route_filters.start_date).format("MMM Do")+" and "+moment(this.props.route_filters.end_date).format("MMM Do")}</Copy>
            <Button
              onPress={()=>this.handleClearFilter()}>
              <Icon icon="close" style={{marginLeft: 5}} />
            </Button>
          </Row>
        </Card>
      );
    }
    return <Wrapper/>
  }
}

export default DatesFilterTag;
