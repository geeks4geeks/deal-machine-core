import React, { Component } from "react";
import { Wrapper, Row, Copy } from "app/NativeComponents/common";

import PresetItem from 'app/DealMachineCore/snippets/Presets/PresetItem';

class CustomFilters extends Component {

  render() {
    return (
      <Wrapper style={{padding: 20, paddingLeft: 10, paddingRight: 10}}>
        <Copy style={{marginBottom: 10}}>Or use custom filters:</Copy>
        <Row style={{flexWrap: "wrap", overflow: "visible"}}>
          <PresetItem
            onPress={({preset_id, preset_object})=>{
              this.props.updatePreset({preset: null, preset_object: null})
            }}
            is_active={this.props.preset == null ? true : false}
            title={"Custom Filters"}
            preset={null}

          />
        </Row>
      </Wrapper>
    )
  }
}


export default CustomFilters;
