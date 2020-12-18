import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Wrapper, Row, Spin, Copy } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  getTags
} from 'app/NativeActions';

class TagsFilter extends Component{

  constructor(props) {

    super(props);



    this.state = {all_tags_array: []}
  }

  formatArray(){
    var all_tags_array = [];

    //add default
    all_tags_array.push({
      key: -1,
      value: "none",
      label: "All Property Tags"
    });
    if(this.props.all_tags){
      for(var i = 0; i<this.props.all_tags.length; i++){
        all_tags_array.push({
          key: i,
          value: this.props.all_tags[i].id,
          label: this.props.all_tags[i].title
        });
      }
    }

    this.setState({all_tags_array: all_tags_array})
  }

  getItems(){
    if(!this.props.tags_loading){
      this.props.getTags(this.props.token);
    }
  }

  componentDidMount(){
    this.formatArray();
    if(this.props.all_tags.length === 0){
      this.getItems();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.all_tags !== this.props.all_tags){
      this.formatArray()
    }
  }


  renderTitle(tag){
    var tag_title = "";
    for(var i = 0; i<this.state.all_tags_array.length; i++){
      if(tag == this.state.all_tags_array[i].value){
        tag_title = this.state.all_tags_array[i].label;
      }
    }
    return tag_title;
  }

  render(){
    if(this.props.analytics_type == "all"){

      if(this.props.tags_loading){
        return (
          <Wrapper style={{
            padding: 20
          }}>
            <Row>
              <Spin size="small"/>
              <Copy style={{marginLeft: 10}}>Loading Tags...</Copy>
            </Row>
          </Wrapper>
        )
      }

      return(
            <Select
              item_ref={"select_tags"}
              items={this.state.all_tags_array}
              title="Property Tags:"
              label="Select an option"
              value={this.props.filters.tag}
              text={this.props.filters.tag_title}
              onSelect={item => {
                this.props.updateFilter({prop: "tag", value: item});
                this.props.updateFilter({prop: "tag_title", value: this.renderTitle(item)});
              }}
            />
      );
    }

    return <Wrapper />;
  }

}

const mapStateToProps = ({ auth, native, deal, property_tags }) => {
  const { token, user } = auth;
  const { all_tags } = deal;
  const { tags_loading } = property_tags;

  return {
    token,
    user,
    all_tags,
    tags_loading
  };
}


export default connect(mapStateToProps, {
  getTags
})(TagsFilter);
