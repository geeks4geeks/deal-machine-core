import React, { Component } from 'react';
import { Wrapper, Card, Row, Copy, Bold, Button, Icon } from 'app/NativeComponents/common';


class TemplateFilterTag extends Component{

  handleClearFilter(){
    this.props.updateSingleAnlyticsFilters({prop: "campaign", value: "none"})
    this.props.updateSingleAnlyticsFilters({prop: "campaign_title", value: "none"})

  }

  render(){
    if(this.props.analytics_filters.campaign != "none"){
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
            <Copy><Bold>Using Campaign:</Bold> {this.props.analytics_filters.campaign_title}</Copy>
            <Button
              onPress={(this.handleClearFilter.bind(this))}>
              <Icon icon="close" style={{marginLeft: 5}} />
            </Button>
          </Row>
        </Card>
      );
    }

    return <Wrapper />

  }

}

export default TemplateFilterTag;
