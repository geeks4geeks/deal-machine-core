import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  ExternalImage,
  Wrapper,
  Spin
} from 'app/NativeComponents/common';

import {
  AppConfig
} from 'app/NativeActions';

import {
  generatePreviewImages,
  reloadPreviews
} from 'app/DealMachineCore/actions';

import moment from 'moment';
import { store } from 'app/store';

class Preview extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      image: ""
    }

  }

  getPreviewImages(reload = false){

    this.setState({image: null, loading: true})

    const preview_url = this.generatePreviewUrl(reload);
    if(preview_url && preview_url != ""){

      this.props.generatePreviewImages({
        token: this.props.token,
        url: preview_url,
        template_id: this.props.template_id,
        deal_id: this.props.deal_id,
        html_template_id: this.props.html_template_id,
        save_info: this.props.save_info ? 1 : 0
      });
    }
  }

  checkAddress(){

    for(var i = 0; i<this.props.other_addresses.length; i++){
      if(this.props.other_addresses[i].send_mail == 1){

        return this.props.other_addresses[i];
      }
    }
  }

  generatePreviewUrl(reload = false, has_scale = false){

    const {
      style,
      token,
      side = "",
      width,
      html_template_id = 0,
      template_id = 0,
      template_type,
      deal_id = 0,
      payload = null,
      platform = ""
    } = this.props;

    if(template_id != 0 || deal_id != 0 || html_template_id != 0){
      //get url depending on if a template_id or deal_id is passed
      var url = AppConfig().base_url+"preview/?preview=true&token="+token;
      if(html_template_id != 0){
        url = url+"&html_template_id="+html_template_id;
      }else if(template_id != 0){
        //get template preview url
        url = url+"&template_id="+template_id;

      }else if(deal_id != 0){
        //get deal_id preview url
        url = url+"&deal_id="+deal_id;

      }

      if(side == "back"){
        url = url+"&side=back";
      }

      if(this.props.owner.use_owner_address != 1 && this.checkAddress().send_mail == 1){
        url = url+
        "&owner_address="+encodeURIComponent(this.checkAddress().address)+
        "&owner_address_city="+encodeURIComponent(this.checkAddress().address_city)+
        "&owner_address_state="+encodeURIComponent(this.checkAddress().address_state)+
        "&owner_address_zip="+encodeURIComponent(this.checkAddress().address_zip);
      }


      //var scale = width/600;
      //if(scale != 600 && platform == "desktop"){
      //  url = url+"&scale="+scale;
      //}

      if(reload == true){

        url = url+"&d="+moment().format("X");

      }else if(this.props.preview_info.date != null){
        url = url+"&d="+this.props.preview_info.date;
      }

      if(payload){

        if(payload.section_a  || payload.section_a == ""){
          url = url+"&section_a="+encodeURIComponent(payload.section_a)
        }
        if(payload.section_b || payload.section_b == ""){
          url = url+"&section_b="+encodeURIComponent(payload.section_b)
        }
        if(payload.section_c || payload.section_c == ""){
          url = url+"&section_c="+encodeURIComponent(payload.section_c)
        }
        if(payload.section_d || payload.section_d == ""){
          url = url+"&section_d="+encodeURIComponent(payload.section_d)
        }

        if(payload.primary_color){
          url = url+"&primary_color="+encodeURIComponent(payload.primary_color)
        }
        if(payload.secondary_color){
          url = url+"&secondary_color="+encodeURIComponent(payload.secondary_color)
        }

        if(payload.signature_id){
          url = url+"&signature_id="+encodeURIComponent(payload.signature_id)
        }

      }

      var scale = width/600;
      if(scale != 600 && has_scale){
        url = url+"&scale="+scale;
      }

      return url;
    }

    return "";
  }

  componentDidMount(){

    if(!this.props.webview){
      if(!this.props.image || this.props.image == ""){
        this.getPreviewImages();

      }else if(this.props.preview_info.reload == true){

        if(this.props.preview_info.reloadId &&
          this.props.preview_info.reloadId != 0 &&
          (
            (this.props.preview_info.reloadId == this.props.deal_id && this.props.deal_id != 0) ||
            (this.props.preview_info.reloadId == this.props.template_id && this.props.template_id != 0)
          )
        ){

          this.getPreviewImages(true);
          this.props.reloadPreviews({reload: false, reloadId: 0, date: this.props.preview_info.date});
        }else if(this.props.is_preview){

          this.getPreviewImages(true);
          this.props.reloadPreviews({reload: false, reloadId: 0, date: this.props.preview_info.date});

        }else{
          this.setState({image: this.props.image, loading: false})

        }


      }else{

        this.setState({image: this.props.image, loading: false})
      }
    }

  }

  componentDidUpdate(prevProps){
    if(!prevProps.webview){
      if((!this.props.image || this.props.image == "") && prevProps.image && prevProps.image != ""){

        this.getPreviewImages(true);
      }

      if(this.props.image && this.props.image != "" && (prevProps.image == "" || !prevProps.image)){

        this.setState({image: this.props.image, loading: false})
      }

      if(this.props.preview_info.reload == true){

        if(this.props.preview_info.reloadId &&
          this.props.preview_info.reloadId != 0 &&
          (
            (this.props.preview_info.reloadId == prevProps.deal_id && prevProps.deal_id != 0) ||
            (this.props.preview_info.reloadId == prevProps.template_id && prevProps.template_id != 0)
          )
        ){

          this.getPreviewImages(true);
          this.props.reloadPreviews({reload: false, reloadId: 0, date: this.props.preview_info.date});
        }else if(this.props.is_preview == true){

          this.getPreviewImages(true);
          this.props.reloadPreviews({reload: false, reloadId: 0, date: this.props.preview_info.date});
        }

      }
    }
  }


  render(){

    let height = this.props.width*0.68;

    switch(this.props.template_type){
      case "postcard":
      default:
        height = this.props.width*0.68;
      break;

      case "handwritten":
        height = this.props.width*1.3;
      break;

    }


    if(!this.props.webview){
      if(this.state.loading == false && this.state.image){

        return (
          <ExternalImage
            style={{
              width: this.props.width,
              height: height,
              resizeMode: "cover"
            }}
            image={this.state.image}
          />
        );

      }else{

        const colors = store.getState().settings.colors;

        return (
          <Wrapper style={{
            backgroundColor: colors.gray_color,
            width: this.props.width,
            height: height,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Spin size="small"/>
          </Wrapper>
        );
      }
    }

    return <Wrapper />;

  }



}


const mapStateToProps = ({ auth, template }) => {

  const { token, user } = auth;
  const { preview_info } = template;

  return {
    token,
    user,
    preview_info
  }
}

export default connect(mapStateToProps, { generatePreviewImages, reloadPreviews })(Preview);
