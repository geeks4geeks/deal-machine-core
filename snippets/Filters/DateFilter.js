import React, { Component } from 'react';

import { Button, CardBody, Split, Stretch, Title, Wrapper, CenterCenter, Icon, Copy, Row, Card, Input } from 'app/NativeComponents/common';

import {
  numberFormat
} from 'app/NativeActions';

import moment from 'moment';

class DateFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: props.filter_options,
      filter_title: props.filter_title,
      filter_min_title: props.filter_min_title,
      filter_max_title: props.filter_max_title,
      filter_min: props.filter_min,
      filter_max: props.filter_max,
      toggle_filter: false,
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



      if(prevState.filter_min !== this.state.filter_min){
        let filter_min = this.state.filter_min.split('/').join('');
        filter_min = filter_min.replace(/ /g, "");
        if(filter_min.length === 8){
          this.props.editLeadFilter({
            prop: this.props.filter_min_prop,
            value: moment(this.state.filter_min).format("YYYY-MM-DD")
          })
        }else if(this.props.filter_min !== null){
          this.props.editLeadFilter({
            prop: this.props.filter_min_prop,
            value: null
          })
        }

      }else if(this.state.filter_min !== this.props.filter_min && this.props.filter_min === null && this.state.filter_min !== ""){
        this.setState({filter_min: ""})

      }


      if(prevState.filter_max !== this.state.filter_max){
        if(this.state.filter_max){
          let filter_max = this.state.filter_max.split('/').join('');
          filter_max = filter_max.replace(/ /g, "");
          if(filter_max.length === 8){
            this.props.editLeadFilter({
              prop: this.props.filter_max_prop,
              value: moment(this.state.filter_max).format("YYYY-MM-DD")
            })
          }else if(this.props.filter_max !== null){
            this.props.editLeadFilter({
              prop: this.props.filter_max_prop,
              value: null
            })
          }
        }
      }else if(this.state.filter_max !== this.props.filter_max && this.props.filter_max === null && this.state.filter_max !== ""){
        this.setState({filter_max: ""})
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

  formatValue(value){
    switch(this.props.filter_type){
      default:
        return value;
      case "date":
        return moment(value).format("MMM Do, YYYY")
    }
  }

  renderItemText(){

    if(!this.props.filter_min && !this.props.filter_max){
      if(this.props.toggle_highlight_filters){
        return "N/A"
      }
      return "Any Date";
    }

    if((this.props.filter_min === null || this.props.filter_min === "") && (this.props.filter_max === null || this.props.filter_max === "")){
      if(this.props.toggle_highlight_filters){
        return "N/A"
      }
      return "Any Date";
    }else if((this.props.filter_min !== null && this.props.filter_min !== "") && (this.props.filter_max === null || this.props.filter_max === "")){
      return "After or equal to "+this.formatValue(this.props.filter_min);
    }else if((this.props.filter_min === null || this.props.filter_min === "") && (this.props.filter_max !== null && this.props.filter_max !== "")){
      return "Before or equal to "+this.formatValue(this.props.filter_max);
    }else if((this.props.filter_min !== null && this.props.filter_min !== "") && (this.props.filter_max !== null && this.props.filter_max !== "") && this.props.filter_min === this.props.filter_max){
      return "During "+this.formatValue(this.props.filter_min);
    }else if((this.props.filter_min !== null && this.props.filter_min !== "") && (this.props.filter_max !== null && this.props.filter_max !== "")){
      return "Between "+this.formatValue(this.props.filter_min)+" and "+this.formatValue(this.props.filter_max);
    }
  }

  render() {
    if(this.state.show_filter){
      if(this.state.toggle_filter === true){
        return(
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
                    <Input
                      ref={this.props.filter_min_prop}
                      name={this.props.filter_min_prop}
                      size="small"
                      type="number"
                      mask={"99/99/9999"}
                      mask_type={"datetime"}
                      returnKeyType={"search"}
                      blurOnSubmit={true}
                      autoCorrect={false}
                      autoFocus={false}
                      keyboardType="default"
                      placeholder={this.props.filter_min_title}
                      onChange={value => {
                        this.setState({filter_min: value})

                      }}
                      onSubmitEditing={()=>{

                      }}

                      onFocus={()=>{
                      }}
                      onBlur={()=>{

                      }}

                      value={this.state.filter_min}
                      type="text"
                    />

                  </Card>
                </Wrapper>
                <Wrapper>
                  <Copy> and </Copy>
                </Wrapper>
                <Wrapper>
                  <Card style={{paddingLeft: 15, paddingRight: 15, borderRadius: 30, paddingTop: 5, paddingBottom: 5}}>
                    <Input
                      ref={this.props.filter_max_prop}
                      name={this.props.filter_max_prop}
                      size="small"
                      type="number"
                      mask={"99/99/9999"}
                      mask_type={"datetime"}
                      returnKeyType={"search"}
                      blurOnSubmit={true}
                      autoCorrect={false}
                      autoFocus={false}
                      keyboardType="default"
                      placeholder={this.props.filter_max_title}
                      onChange={value => {
                        this.setState({filter_max: value})
                      }}
                      onSubmitEditing={()=>{

                      }}

                      onFocus={()=>{
                      }}
                      onBlur={()=>{

                      }}

                      value={this.state.filter_max}
                      type="text"
                    />
                  </Card>
                </Wrapper>
              </Row>

            </Wrapper>


          </Wrapper>
        )
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
      );
    }

    return <Wrapper />
  }

}


export default DateFilter;
