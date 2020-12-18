import React, { Component } from 'react';

import { Wrapper } from 'app/NativeComponents/common';
import { ToggleSwitch } from 'app/NativeComponents/snippets';

class SwitchFilter extends Component {

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
      this.props.editLeadFilter({
        prop: this.props.filter_prop,
        value: this.state.filter_value
      })
    }else if(this.props.filter_value !== this.state.filter_value){
      this.setState({filter_value: this.props.filter_value})
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


  render() {
    if(this.state.show_filter){
      return(
        <ToggleSwitch
          value={parseInt(this.state.filter_value === 1) ? true : false}
          onChange={value => {
            this.setState({
              filter_value: value === true ? 1 : 0
            })
          }}
          title={this.props.filter_title}
          text={this.props.filter_text}
        />
      )
    }

    return <Wrapper />
  }

}


export default SwitchFilter;
