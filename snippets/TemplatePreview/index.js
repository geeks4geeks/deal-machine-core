import React, { Component } from 'react';

import Preview from './Preview';

class TemplatePreview extends Component {


  render(){
    return (
      <Preview {...this.props}/>
    );
  }
}


export { TemplatePreview };
