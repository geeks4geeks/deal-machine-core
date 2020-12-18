import React, { Component } from 'react';
import { Wrapper, MultiLineInput } from 'app/NativeComponents/common';
import Scroller from './Scroller';

class BracketHelper extends Component{

  constructor(props){
    super(props);
    this.state = {
      focused: false,
      address: this.props.value
    }
  }

  insertBracket(value, slug, prop){
    var new_value = value+slug;
    this.props.templateFieldChanged({prop: this.props.prop, value: new_value})
  }


  componentWillUnmount(){
    clearInterval(this._interval);
  }

  charCounter(value, maxLength){
    let html_strip_value = value.replace(/<[^>]*>?/gm, '');
    return (maxLength - html_strip_value.length) + " / "+maxLength+" characters left";
  }


  render(){
    const {
      caption,
      name,
      section_title,
      onChange,
      prop,
      value,
      maxLength
    } = this.props;

    return (
      <Wrapper>


        <MultiLineInput
          ref={name}
          name={name}
          blurOnSubmit={true}
          returnKeyType="done"
          keyboardType="default"
          placeholder={"Enter text for "+section_title}
          label={section_title}
          onChange={onChange}
          value={value}
          charCount={this.charCounter(value, maxLength)}
          //maxLength={maxLength}
          type={"text"}
          onFocus={()=>{
            this.setState({focused: true})
          }}
          onBlur={()=>{
            clearInterval(this._interval);
            this._interval = setTimeout(()=>{
              this.setState({focused: false})
            }, 200);
          }}
        />

        <Scroller
          {...this.props}
          focused={this.state.focused}
          insertBracket={this.insertBracket.bind(this)}
        />

      </Wrapper>
    );

  }
}

export default BracketHelper;
