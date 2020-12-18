import React, { Component } from 'react';
import { Wrapper, MultiLineInput } from 'app/NativeComponents/common';

import BracketHelper from './BracketHelper';

class SectionB extends Component{

  render(){
    if(this.props.editTemplate.html_template.section_b.max_length > 0){
      return (
        <BracketHelper
          name="section_b"
          section_title={this.props.editTemplate.html_template.section_b.title}
          onChange={value => this.props.checkForLongWords(value, (value)=>{
            this.props.templateFieldChanged({ prop: "section_b", value })
          })}
          templateFieldChanged={this.props.templateFieldChanged}
          prop={"section_b"}
          value={this.props.editTemplate.section_b == null ?
            this.props.editTemplate.html_template.section_b.default_text :
            this.props.editTemplate.section_b
          }
          device={this.props.device}
          maxLength={this.props.editTemplate.html_template.section_b.max_length}
          {...this.props}

        />
      );
    }

    return <Wrapper />

  }
}

export default SectionB;
