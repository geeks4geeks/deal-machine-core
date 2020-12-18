import React, { Component } from 'react';

import { Wrapper, Copy, Row, Button, Icon } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

class SelectFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      filter_title: props.filter_title,
      filter_value: props.filter_value,
      show_filter: false,
      show_empty: props.show_empty,
      include_empty: false
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


    if(prevState.include_empty !== this.state.include_empty){
      this.props.editLeadFilter({
        prop: this.props.empty_prop,
        value: this.state.include_empty
      })
    } else if(this.props.include_empty !== this.state.include_empty){
       this.setState({include_empty: this.props.include_empty})
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


  getSelectTitle(number, options){
    if(number === null || !number){
      return "N/A"
    }

    for(let i = 0; i<options.length; i++){
      if(number == options[i].value){
        return options[i].label;
      }
    }
  }

  render() {
    if(this.state.show_filter){
      let selHtml = (
            <Select
              item_ref={this.props.filter_prop}
              items={this.props.filter_options}
              title={this.props.filter_title}
              label="Select an option"
              value={this.state.filter_value ? this.state.filter_value : -1}
              text={this.getSelectTitle(this.state.filter_value, this.props.filter_options)}
              onSelect={value => {
                this.setState({
                  filter_value: parseInt(value) === -1 ? null : value
                })
              }}
            />
      );
      if(this.state.show_empty && this.state.filter_value) {
        selHtml = ( <Wrapper>
          {selHtml}
          <Row>
            <Wrapper>
              <Button
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop:-5,
                    marginBottom:10
                  }}
                  onPress={()=>{
                    this.setState({
                      include_empty: !this.state.include_empty
                    })
                  }}>
                <Row>
                  <Icon
                      icon={this.state.include_empty ? 'check-box' :'check-box-outline-blank'}
                      size={20}
                      style={{
                        marginRight: 5
                      }}
                  />
                  <Copy>Include properties missing data from county records</Copy>
                </Row>
              </Button>
            </Wrapper>
          </Row>
        </Wrapper> )
      }
      return selHtml
    }

    return <Wrapper />
  }

}


export default SelectFilter;
