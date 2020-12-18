import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { ColorPicker } from 'app/NativeComponents/snippets';

class SecondaryColor extends Component{

  render(){


    if(this.props.editTemplate.html_template.default_secondary_color.hex != null){
      return (
        <Card styl>
          <ColorPicker
            {...this.props}
            ref_name={"secondary_color"}
            placeholder={this.props.editTemplate.html_template.default_secondary_color.title}
            onChange={value => {
              if(this.props.device == "desktop" && value.hex){
                this.props.templateFieldChanged({ prop: "secondary_color", value: value.hex })
              }else{
                this.props.templateFieldChanged({ prop: "secondary_color", value })
              }
            }}
            value={this.props.editTemplate.secondary_color != null ? this.props.editTemplate.secondary_color : this.props.editTemplate.html_template.default_secondary_color.hex}
            onColorSelect={()=>{}}
          />
        </Card>
      );
    }

    return <Wrapper />

  }
}

export default SecondaryColor;
