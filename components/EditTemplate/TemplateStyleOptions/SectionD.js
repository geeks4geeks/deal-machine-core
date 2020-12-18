import React, { Component } from 'react';
import { Wrapper, MultiLineInput } from 'app/NativeComponents/common';

import BracketHelper from './BracketHelper';

class SectionD extends Component{

  render(){


    if(this.props.editTemplate.html_template.section_d.max_length > 0){
      return (
        <BracketHelper
          name="section_d"
          section_title={this.props.editTemplate.html_template.section_d.title}
          onChange={value => this.props.checkForLongWords(value, (value)=>{
            this.props.templateFieldChanged({ prop: "section_d", value })
          })}
          templateFieldChanged={this.props.templateFieldChanged}
          prop={"section_d"}
          value={this.props.editTemplate.section_d == null ?
            this.props.editTemplate.html_template.section_d.default_text :
            this.props.editTemplate.section_d
          }
          device={this.props.device}
          maxLength={this.props.editTemplate.html_template.section_d.max_length}
          {...this.props}

        />
      );
    }

    return <Wrapper />

  }
}

export default SectionD;
