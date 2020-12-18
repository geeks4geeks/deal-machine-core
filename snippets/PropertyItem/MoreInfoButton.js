import React, { Component } from 'react';

import {
  Row,
  Button,
  Icon,
  Wrapper,
  Copy

} from 'app/NativeComponents/common';

/*
import {
} from 'app/NativeActions';
*/

class MoreInfoButton extends Component {

    render() {
      if(true){
        return (
          <Row>
            <Button onPress={this.props.onPress}>
              <Wrapper style={{
                borderWidth: 1,
                borderColor: this.props.colors.border_color,
                borderStyle: "solid",
                borderRadius: this.props.isMobile ? 30 : 30,
                padding: this.props.isMobile ? 15 : 15,
                paddingTop: this.props.isMobile ? 10 : 5,
                paddingBottom: this.props.isMobile ? 10 : 5,
                margin: 15,
                marginLeft: 0,
                marginRight: 10,
                backgroundColor: this.props.colors.card_color
              }}>
                <Row style={{
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}>
                  <Wrapper>
                    <Copy style={{fontSize: 12}}>
                      More Info
                    </Copy>
                  </Wrapper>
                  <Icon
                    size={14}
                    icon={"keyboard-arrow-right"}
                    style={{
                      marginLeft: 5
                    }}
                  />
                </Row>
              </Wrapper>
            </Button>
          </Row>
        );
      }

      return <Wrapper />;
    }
  }



  export default MoreInfoButton;
