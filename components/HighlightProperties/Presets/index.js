import React, { Component } from 'react';
import { Wrapper, Copy, Row } from 'app/NativeComponents/common';

import SystemPresets from 'app/DealMachineCore/snippets/Presets/SystemPresets';
import CustomPresets from 'app/DealMachineCore/snippets/Presets/CustomPresets';
import CustomFilters from './CustomFilters';

class Presets extends Component {


  render() {


    return (
      <Wrapper>
        <SystemPresets
          title="Use a Quick List:"
          onPress={({preset_id, preset_object})=>{
            this.props.updatePreset({preset: preset_id, preset_object: preset_object})
          }}
          active_preset={this.props.preset}
        />
        <CustomPresets
          {...this.props}
          title="Or one of your presets:"
          onPress={({preset_id, preset_object})=>{
            this.props.updatePreset({preset: preset_id, preset_object: preset_object})
          }}
          active_preset={this.props.preset}

        />
        <CustomFilters {...this.props}/>
      </Wrapper>
    )
  }

}

export default Presets;
