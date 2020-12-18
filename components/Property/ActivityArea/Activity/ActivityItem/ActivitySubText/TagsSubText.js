import React, { Component } from 'react';
import { Wrapper, Copy} from 'app/NativeComponents/common';

class TagsSubText extends Component{

  render(){

    let old_tags = "";
    let new_tags = "";

    let old_tag_array = [];
    let new_tag_array = [];

    if(this.props.item.changes_array.tags){
      if(this.props.item.changes_array.tags.old != null){
        old_tag_array = this.props.item.changes_array.tags.old.split(',');
      }
      if(this.props.item.changes_array.tags.new != null){
        new_tag_array = this.props.item.changes_array.tags.new.split(',');
      }
    }

    if(this.props.all_tags && (old_tag_array.length > 0 || new_tag_array.length > 0)){
      if(this.props.all_tags.length > 0){
        for(let i = 0; i<this.props.all_tags.length; i++){

          for(let j = 0; j<old_tag_array.length; j++){
            if(old_tag_array[j] == this.props.all_tags[i].id){
              if(j == 0){
                old_tags += this.props.all_tags[i].title;
              }else if(j == old_tag_array.length - 1){
                old_tags += " and " + this.props.all_tags[i].title;
              }else{
                old_tags += ", " + this.props.all_tags[i].title;
              }
            }
          }

          for(let j = 0; j<new_tag_array.length; j++){
            if(new_tag_array[j] == this.props.all_tags[i].id){
              if(j == 0){
                new_tags += this.props.all_tags[i].title;
              }else if(j == new_tag_array.length - 1){
                new_tags += " and " + this.props.all_tags[i].title;
              }else{
                new_tags += ", " + this.props.all_tags[i].title;
              }
            }
          }
        }
      }
    }

    if(old_tags != "" || new_tags != ""){

      if(old_tags == ""){
        return <Copy>Added the tags "{new_tags}."</Copy>
      }else if(new_tags == ""){
        return <Copy>Removed the tags "{old_tags}."</Copy>
      }else{
        return <Copy>Changed the tags from "{old_tags}" to "{new_tags}."</Copy>
      }


    }

    return <Wrapper />;
  }
}

export default TagsSubText;
