import React, { Component } from 'react';
import {
  Wrapper,
  Row,
  Spin,
  Copy,
  Icon,
  Bold
} from 'app/NativeComponents/common';

import ButtonLayout from 'app/DealMachineCore/components/PropertyMap/MapBottom/BottomButtons/ButtonLayout';
class BottomButtons extends Component {

  render(){

    if(this.props.is_drawing){
      if(this.props.drawing_coordinates.length > 2){
        return(
          <Wrapper>

            <Row style={{
              alignItems: "center",
              justifyContent: "center"
            }}>
              <ButtonLayout
                onPress={()=>{
                  this.props.toggleDrawing(false)
                }}
                icon="close"
                text="Cancel"
                outerstyle={{marginBottom: 0}}

              />
              <ButtonLayout
                onPress={()=>{
                  this.props.completeDrawing()
                  this.props.expandMap(false)
                }}
                icon="check"
                text="Complete Drawing"
                outerstyle={{marginBottom: 0}}
              />
            </Row>
          </Wrapper>
        )
      }

      return(
        <Wrapper>
          <Wrapper style={{
            backgroundColor: this.props.dark_mode == "dark_mode" ? "rgba(31,41,51, 0.7)" : "rgba(255, 255, 255, 0.7)",
            paddingLeft: 15,
            paddingRight: 15
          }}>
            <Row>
              <Copy>
                <Bold>Press on the map to add a coordinate to your drawing.</Bold>
              </Copy>
            </Row>
          </Wrapper>
          <Row style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ButtonLayout
              onPress={()=>{
                this.props.toggleDrawing(false)
              }}
              icon="close"
              text="Cancel"
              outerstyle={{marginBottom: 0}}

            />
          </Row>
        </Wrapper>
      )
    }

    if(this.props.completed_drawing){
      return(
        <Row style={{
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ButtonLayout
            onPress={()=>{
              this.props.resetDrawing()
            }}
            icon="refresh"
            text="Redraw"
            outerstyle={{marginBottom: 0}}

          />
        </Row>
      )
    }

    return(
      <Row style={{
        alignItems: "center",
        justifyContent: "center"
      }}>
        <ButtonLayout
          onPress={()=>{
            this.props.toggleDrawing(true)
          }}
          icon="edit"
          text="Start Drawing"
          outerstyle={{marginBottom: 0}}

        />
      </Row>
    )

    return <Wrapper />
  }
}


export default BottomButtons;
