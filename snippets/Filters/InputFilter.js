import React, { Component } from 'react';

import { Wrapper, Input } from 'app/NativeComponents/common';

class InputFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      filter_title: props.filter_title,
      filter_value: props.filter_value,
      show_filter: false
    }
  }

  componentDidMount() {
    this.checkFilterSearch();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.filter_search !== this.props.filter_search){
      this.checkFilterSearch();
    }

    if(prevState.filter_value !== this.state.filter_value){
      clearInterval(this._input_interval)
      this._input_interval = setTimeout(()=>{
        if(!this.props.filter_length || this.state.filter_value.length === parseInt(this.props.filter_length)){
          this.props.editLeadFilter({
            prop: this.props.filter_prop,
            value: this.state.filter_value
          })
        }else if(this.props.filter_value !== null){
          this.props.editLeadFilter({
            prop: this.props.filter_prop,
            value: null
          })
        }
        this._input_interval = null;

      }, 250)
    }else if(this.props.filter_value === null && prevProps.filter_value !== null && this.state.filter_value !== "" && this._input_interval === null){
      this.setState({filter_value: ""})
    }
  }

  checkFilterSearch(){
    if(this.props.filter_search && this.props.filter_search.length > 0){
      if(this.state.filter_title.toLowerCase().startsWith(this.props.filter_search.toLowerCase().trim())){
        this.setState({show_filter: true})
      }else{
        this.setState({show_filter: false})
      }
    }else{
      this.setState({show_filter: true})
    }
  }

  componentWillUnmount(){
    clearInterval(this._input_interval)
  }

  render() {
    if(this.state.show_filter){
      return(
        <Input
          ref={this.props.filter_prop}
          name={this.props.filter_prop}
          returnKeyType={"search"}
          blurOnSubmit={true}
          autoCorrect={false}
          autoFocus={false}
          keyboardType="default"
          placeholder={this.state.filter_title}
          onChange={value => {
            //location search
            this.setState({filter_value: value})

          }}
          onSubmitEditing={()=>{

          }}

          onFocus={()=>{
          }}
          onBlur={()=>{

          }}

          value={this.state.filter_value}
          type="text"
        />
      )
    }

    return <Wrapper />
  }

}


export default InputFilter;
