import React, { Component } from 'react';
import { Wrapper, Row, Icon, Copy, Bold } from 'app/NativeComponents/common';

import { renderDate } from 'app/NativeActions';

class TimelineItem extends Component{


  render(){
      if(this.props.display){
        return (
          <Wrapper>
            <Row>
              <Wrapper style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                marginLeft: 10,
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Icon
                  icon={this.props.icon}
                  size={20}
                />
              </Wrapper>
              <Wrapper style={{
                justifyContent: "center",
                alignItems: "flex-start",
                flex: 1
              }}>
                <Copy>
                  <Bold>{this.props.title}</Bold>
                </Copy>
                <Copy>
                  {renderDate(this.props.date, this.props.just_date)}
                </Copy>
              </Wrapper>
            </Row>
          </Wrapper>
        );
      }

    return <Wrapper />

  }

}

export default TimelineItem;
