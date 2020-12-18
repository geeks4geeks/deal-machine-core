import React, { Component } from 'react';
import { Wrapper, Row, ExternalImage, CardBody } from 'app/NativeComponents/common';
import { PhotoOverlay } from 'app/NativeComponents/snippets';

class Screenshot extends Component{


  render(){
      if(this.props.item.screenshot && this.props.item.screenshot_back){

        //calculate height
        const width = 150;
        let height = width*0.68;

        switch(this.props.item.template_type){
          case "postcard":
          default:
            height = width*0.68;
          break;

          case "handwritten":
            height = width*1.3;
          break;

        }

        return (
          <CardBody>
            <Row style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 5,
              paddingBottom: 5
            }}>
              <Wrapper style={{
                padding: 5,
                position: "relative"
              }}>

                <PhotoOverlay
                  image={this.props.item.screenshot}
                  use_full={true}
                  height={height}
                  width={width}
                  backgroundColor="transparent"
                />
              </Wrapper>

              <Wrapper style={{
                padding: 5,
                position: "relative"
              }}>

                <PhotoOverlay
                  image={this.props.item.screenshot_back}
                  use_full={true}
                  height={height}
                  width={width}
                  backgroundColor="transparent"
                />
              </Wrapper>
            </Row>
          </CardBody>
        );
      }

    return <Wrapper />

  }

}

export default Screenshot;
