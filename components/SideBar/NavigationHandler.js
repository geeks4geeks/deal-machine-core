import React, { Component } from 'react';

import{
  Wrapper
} from 'app/NativeComponents/common';

import NavigationService from 'app/Router/NavigationService';



class NavigationHandler extends Component{



  componentWillUnmount(){
    clearInterval(this._drawer_interval);
  }

  componentDidUpdate(prevProps){

    if(prevProps.open != this.props.open && this.props.open != null){
      if(this.props.open == "open"){
        //this.props.getStats({token: this.props.token});
        NavigationService.drawer({open: "open"});

      }else if(this.props.open == "close"){
        NavigationService.drawer({open: "close"});
      }

      clearInterval(this._drawer_interval);
      this._drawer_interval = setTimeout(()=>{
        this.props.toggleDrawer(null)
      }, 500)
    }
  }

  render(){
    return <Wrapper/>
  }
}


export default NavigationHandler;
