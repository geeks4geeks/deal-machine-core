import React, { Component } from "react";

import { Wrapper, Button, Row, Copy, Icon, Card } from "app/NativeComponents/common";

class PresetItem extends Component {


  renderOptions(){
    if(this.props.show_options){
      return(
        <Wrapper style={{marginLeft: 15}}>
          <Button onPress={this.props.onEdit}>
            <Row>
              <Icon
                icon={"edit"}
                size={14}
              />

            </Row>
          </Button>
        </Wrapper>
      )
    }
  }

  render() {

    return (
      <Button onPress={()=>{
        this.props.onPress({preset_id: this.props.preset ? this.props.preset.id : null, preset_object: this.props.preset})
      }}>
        <Card style={{margin: 0, marginBottom: 5, marginRight: 5, padding: 15, paddingLeft: 5, paddingTop: 5, paddingBottom: 5, borderRadius: 30}}>
          <Row>
            <Icon
              icon={this.props.is_active ? "radio-button-checked" : "radio-button-unchecked"}
              size={18}
              style={{marginRight: 5}}
            />
            <Copy>{this.props.title}</Copy>

            {this.renderOptions()}
          </Row>
        </Card>
      </Button>
    )

  }
}


export default PresetItem;
