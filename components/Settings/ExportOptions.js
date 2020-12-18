import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Copy, Title } from 'app/NativeComponents/common';
import { MenuButton, MenuItem } from 'app/NativeComponents/snippets';

import UploadButton from './UploadButton';

import {
  AppConfig
} from 'app/NativeActions';

class ExportOptions extends Component{

  componentDidMount(){
    if(this.props.device == "desktop" && (this.props.user.team_clearance_level > 1 || this.props.user.can_export_data == 1)){
      //inject zapier into page
      var elem = document.createElement('script');
      elem.id = "zapier_script"
      elem.src = 'https://zapier.com/apps/embed/widget.js?guided_zaps=25148,25153,25156&html_id=zapier';
      document.body.appendChild(elem);
    }
  }

  componentWillUnmount(){
    //remove zapier from page
    if(this.props.device == "desktop" && (this.props.user.team_clearance_level > 1 || this.props.user.can_export_data == 1)){
      var element = document.getElementById("zapier_script");
      element.parentNode.removeChild(element);
    }
  }


  render(){
    if(this.props.device == "desktop" && (this.props.user.team_clearance_level > 1 || this.props.user.can_export_data == 1)){
      return (
        <Wrapper>
          <Card>


            <UploadButton {...this.props}/>

          </Card>
          <CardBody>
            <Copy>Looking to export your leads? Export your leads by selecting them in the "Leads View" and press "Export Leads."</Copy>
          </CardBody>
          <CardBody>
            <Title>Integrate your account with Zapier:</Title>
          </CardBody>
          <div id="zapier" />
        </Wrapper>

      );

    }else if(this.props.device == "mobile" && (this.props.user.team_clearance_level > 1 || this.props.user.can_export_data == 1)){

      return(
        <Card>
          <MenuItem
            to=''
            onPress={()=>{
              this.props.setModal({
              title: 'This feature is only available in desktop version',
              description: 'Please visit: DealMachine.com on your desktop computer',
              icon: "desktop-mac",
              submit: 'Dismiss',
              onPress: ()=>{
              },
              cancel: '',
              onCancel: ()=>{}
            });
            this.props.toggleModal({show: true, type: "normal"});
            }}
            title="Export Leads"
            text={"Export leads to a .csv file"}
          />
        </Card>
      );

    }

    return <Wrapper />


  }

}

export default ExportOptions;
