import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { ColorPicker } from 'app/NativeComponents/snippets';

class PrimaryColor extends Component{

  render(){


    if(this.props.editTemplate.html_template.default_primary_color.hex != null){
      return (
        <Card>
          <ColorPicker
            ref_name={"primary_color"}
            placeholder={this.props.editTemplate.html_template.default_primary_color.title}
            onChange={value => {
              if(this.props.device == "desktop" && value.hex){
                this.props.templateFieldChanged({ prop: "primary_color", value: value.hex })
              }else{
                this.props.templateFieldChanged({ prop: "primary_color", value })
              }
            }}
            value={this.props.editTemplate.primary_color != null ? this.props.editTemplate.primary_color : this.props.editTemplate.html_template.default_primary_color.hex}
            onColorSelect={()=>{}}
            {...this.props}
          />
        </Card>
      );
    }

    return <Wrapper />

  }
}

export default PrimaryColor;
