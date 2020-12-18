import React, { Component } from 'react';

import { Button, CardBody, Split, Stretch, Title, Wrapper, CenterCenter, Icon, Copy, Row, Card } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';


import {
  numberFormat
} from 'app/NativeActions';

class NumberFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      min_options: props.filter_options,
      max_options: props.filter_options,
      options: props.filter_options,
      filter_title: props.filter_title,
      filter_min: props.filter_min,
      filter_max: props.filter_max,
      toggle_filter: false,
      show_filter: false,
      include_empty: false,
      show_empty: props.show_empty
    }
  }

  componentDidMount() {
    this.checkFilterSearch();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.filter_search !== this.props.filter_search){
      this.checkFilterSearch();
    }



    if(prevState.filter_min !== this.state.filter_min){
      this.props.editLeadFilter({
        prop: this.props.filter_min_prop,
        value: this.state.filter_min
      })
    }else if(this.props.filter_min !== this.state.filter_min){
      this.setState({filter_min: this.props.filter_min})
    }


    if(prevState.filter_max !== this.state.filter_max){
      this.props.editLeadFilter({
        prop: this.props.filter_max_prop,
        value: this.state.filter_max
      })
    }else if(this.props.filter_max !== this.state.filter_max){
      this.setState({filter_max: this.props.filter_max})
    }

    if(prevState.include_empty !== this.state.include_empty){
      this.props.editLeadFilter({
        prop: this.props.empty_prop,
        value: this.state.include_empty
      })
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

  toggleFilter(toggle){
    this.setState({
      toggle_filter: toggle
    })
  }

  formatNumber(number){
    switch(this.props.filter_type){
      default:
        return number;
      case "money":
        return "$"+numberFormat(parseFloat(number));
      case "square_feet":
        return numberFormat(parseFloat(number))+" sq ft";
      case "acres":
        return numberFormat(parseFloat(number))+" acres";
      case "units":
        return numberFormat(parseFloat(number))+" units";
    }
  }

  renderItemText(){

    if(this.state.filter_min===null) {
      this.state.max_options = this.state.options;
    }

    if(!this.state.filter_min && !this.state.filter_max){
      if(this.props.toggle_highlight_filters){
        return "N/A"
      }
      return "Any Amount";
    }

    if(this.state.filter_min === null && this.state.filter_max === null){
      if(this.props.toggle_highlight_filters){
        return "N/A"
      }
      return "Any Amount";
    }else if(this.state.filter_min !== null && this.state.filter_max === null){
      return "More than or equal to "+this.formatNumber(this.state.filter_min);
    }else if(this.state.filter_min === null && this.state.filter_max !== null){
      return "Less than or equal to "+this.formatNumber(this.state.filter_max);
    }else if(this.state.filter_min !== null && this.state.filter_max !== null && (parseFloat(this.state.filter_min) === parseFloat(this.state.filter_max) || parseInt(this.state.filter_min) === parseInt(this.state.filter_max))){
      return "Exactly "+this.formatNumber(this.state.filter_min);
    }else if(this.state.filter_min !== null && this.state.filter_max !== null && parseFloat(this.state.filter_min) !== parseFloat(this.state.filter_max) && parseInt(this.state.filter_min) !== parseInt(this.state.filter_max)){
      return "Between "+this.formatNumber(this.state.filter_min)+" and "+this.formatNumber(this.state.filter_max);
    }
  }

  getSelectTitle(number, options){

    if(number === null || !number){
      return "Any"
    }

    for(let i = 0; i<options.length; i++){
      if(parseFloat(number) === parseFloat(options[i].value)){
        return options[i].label;
      }
    }
  }

  minChange(sVal) {
    let temp_max = [];
    if(sVal!=-1) {
      temp_max.push({value: -1, label: "Any"});
    }
    this.state.options.forEach(function(val,index){
        if(sVal <= val.value) {
         temp_max.push(val);
       }
    });
    this.setState({max_options: temp_max});

  }

  maxChange(sVal) {
      let temp_min = [];
      this.state.options.forEach(function(val,index){
          if(sVal >= val.value) {
              temp_min.push(val);
          }
      });
    if(sVal==-1) {
      temp_min = this.state.options;
    }
    this.setState({min_options: temp_min});

  }

  render() {
    if(this.state.show_filter){
      if(this.state.toggle_filter === true){
        let selHtml = null;
        if(this.state.show_empty && ( this.state.filter_min || this.state.filter_max )) {
         selHtml = (
              <Row>
                <Wrapper>
                  <Button
                      style={{
                        marginTop:10,
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
          );
        }
        selHtml = (
          <Wrapper style={{
            backgroundColor: this.props.colors.background_color,
            borderTopWidth: 1,
            borderTopColor: this.props.colors.border_color,
            borderTopStyle: "solid",
            borderBottomWidth: 1,
            borderBottomColor: this.props.colors.border_color,
            borderBottomStyle: "solid",
          }}>
            <Button onPress={()=>{
              this.toggleFilter(false)
            }}>
              <CardBody>
                <Split>
                  <Stretch>
                    <Title>{this.state.filter_title}</Title>
                    <Copy>{this.renderItemText()}</Copy>
                  </Stretch>
                  <Wrapper>
                    <CenterCenter>
                      <Icon style={{marginLeft: 10}} icon="keyboard-arrow-up" />
                    </CenterCenter>
                  </Wrapper>
                </Split>
              </CardBody>
            </Button>
            <Wrapper style={{padding: 10, paddingLeft: 25, paddingRight: 25}}>
              <Row>
                <Copy>Between</Copy>
                <Wrapper>
                  <Card style={{paddingLeft: 15, paddingRight: 15, borderRadius: 30, paddingTop: 5, paddingBottom: 5}}>
                    <Select
                      size="small"
                      item_ref={this.props.filter_min_prop}
                      items={this.state.min_options}
                      title="Minimum"
                      label="Select an option"
                      value={this.state.filter_min ? this.state.filter_min : -1}
                      text={this.getSelectTitle(this.state.filter_min, this.state.options)}
                      onSelect={value => {
                        this.setState({
                          filter_min: parseFloat(value) === -1 ? null : value
                        });
                        this.minChange(value);
                      } }
                    />
                  </Card>
                </Wrapper>
                <Wrapper>
                  <Copy> and </Copy>
                </Wrapper>
                <Wrapper>
                  <Card style={{paddingLeft: 15, paddingRight: 15, borderRadius: 30, paddingTop: 5, paddingBottom: 5}}>
                    <Select
                      size="small"
                      item_ref={this.props.filter_max_prop}
                      items={this.state.max_options}
                      title="Maximum"
                      label="Select an option"
                      value={this.state.filter_max ? this.state.filter_max : -1}
                      text={this.getSelectTitle(this.state.filter_max, this.state.options)}
                      onSelect={value => {
                        this.setState({
                          filter_max: parseFloat(value) === -1 ? null : value
                        });
                          this.maxChange(value);
                      }}
                    />
                  </Card>
                </Wrapper>
              </Row>
              {selHtml}
            </Wrapper>
          </Wrapper>
        )


        return selHtml;
      }

      return (
        <Button onPress={()=>{
          this.toggleFilter(true)
        }}>
          <CardBody>
            <Split>
              <Stretch>
                <Title>{this.state.filter_title}</Title>
                <Copy>{this.renderItemText()}</Copy>
              </Stretch>
              <Wrapper>
                <CenterCenter>
                  <Icon style={{marginLeft: 10}} icon="keyboard-arrow-down" />
                </CenterCenter>
              </Wrapper>
            </Split>
          </CardBody>
        </Button>
      )
    }

    return <Wrapper />
  }

}


export default NumberFilter;
