import React, { Component } from 'react';
import { Wrapper, Copy} from 'app/NativeComponents/common';

class DealStatusSubText extends Component{

  render(){

    let old_status_title = "";
    let new_status_title = "";
    if(this.props.all_statuses){
      if(this.props.all_statuses.length > 0){
        for(let i = 0; i<this.props.all_statuses.length; i++){
          if(this.props.item.changes_array.deal_status){
            if(this.props.item.changes_array.deal_status.old == this.props.all_statuses[i].id){
              old_status_title = this.props.all_statuses[i].title;
            }
            if(this.props.item.changes_array.deal_status.new == this.props.all_statuses[i].id){
              new_status_title = this.props.all_statuses[i].title;
            }
          }
        }
      }
    }

    if(old_status_title != "" && new_status_title != ""){
      return (
        <Copy>
          Changed status from "{old_status_title}" to "{new_status_title}."
        </Copy>
      )
    }

    return <Wrapper />;
  }
}

export default DealStatusSubText;
