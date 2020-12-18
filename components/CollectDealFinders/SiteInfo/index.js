import React, { Component } from 'react';
import { Wrapper, Input, Copy, Card, CardBody, HTMLEditor } from 'app/NativeComponents/common';
import { CardLabel } from 'app/NativeComponents/snippets';

import VideoContainer from '../VideoContainer';

class SiteInfo extends Component{

  renderGreetingVideo(){
    if(this.props.edit_user_dealfinder_page.greeting_video != ""){
      return(
        <VideoContainer
          video={this.props.edit_user_dealfinder_page.greeting_video ? this.props.edit_user_dealfinder_page.greeting_video : this.props.dealfinder_page_defaults.default_greeting_video}
          autoPlay={false}
        />
      );
    }
  }

  render(){

    if(this.props.edit_team_link_toggle == "site" && this.props.edit_live_page == "on"){
      return(
        <Wrapper>
          <CardBody>
            <Copy>
              Determine what your landing page looks like with custom text and a welcome video. We’ve included all the content already, so you’re ready to go!
            </Copy>
          </CardBody>

          <Card>
            <Input
              ref={"header"}
              name={"header"}
              placeholder={"Heading"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "header", value})
              }}
              value={this.props.edit_user_dealfinder_page.header || this.props.edit_user_dealfinder_page.header == "" ? this.props.edit_user_dealfinder_page.header : this.props.dealfinder_page_defaults.default_header}

              type="text"
            />

            <Input
              ref={"subheader"}
              name={"subheader"}
              placeholder={"Sub-Heading"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "subheader", value})
              }}
              value={this.props.edit_user_dealfinder_page.subheader || this.props.edit_user_dealfinder_page.subheader == "" ? this.props.edit_user_dealfinder_page.subheader : this.props.dealfinder_page_defaults.default_subheader}

              type="text"
            />
          </Card>

          <Card>

          </Card>
          <Card style={{overflow: "hidden"}}>
            <CardLabel
              title={"Greeting Video:"}
              icon={"videocam"}
              hasButton={false}
              onPress={()=>{}}
              hasBorder={true}
            />
            {this.renderGreetingVideo()}
            <Input
              ref={"greeting_video"}
              name={"greeting_video"}
              placeholder={"Youtube Link"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "greeting_video", value})
              }}
              value={this.props.edit_user_dealfinder_page.greeting_video || this.props.edit_user_dealfinder_page.greeting_video == "" ? this.props.edit_user_dealfinder_page.greeting_video : this.props.dealfinder_page_defaults.default_greeting_video}

              type="text"
            />
          </Card>

          <Card style={{overflow: "hidden"}}>
            <CardLabel
              title={"Site Content:"}
              icon={"code"}
              hasButton={false}
              onPress={()=>{}}
              hasBorder={true}
            />
            <HTMLEditor
              data={this.props.edit_user_dealfinder_page.description ? this.props.edit_user_dealfinder_page.description : this.props.dealfinder_page_defaults.default_description}
              onChange={(data)=>{
                this.props.editTeamLinkInfo({prop: "description", value: data})
              }}
            />

          </Card>

          <Card>
            <Input
              ref={"cta"}
              name={"cta"}
              placeholder={"Call-to-action"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "cta", value})
              }}
              value={this.props.edit_user_dealfinder_page.cta || this.props.edit_user_dealfinder_page.cta == "" ? this.props.edit_user_dealfinder_page.cta : this.props.dealfinder_page_defaults.default_cta}
              type="text"
            />
          </Card>

          <Card>
            <CardLabel
              title={"Contact Info:"}
              icon={"info"}
              hasButton={false}
              onPress={()=>{}}
              hasBorder={true}
            />
            <Input
              ref={"name"}
              name={"name"}
              placeholder={"Contact Name"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "name", value})
              }}
              value={this.props.edit_user_dealfinder_page.name || this.props.edit_user_dealfinder_page.name == "" ? this.props.edit_user_dealfinder_page.name : this.props.dealfinder_page_defaults.default_name}
              type="text"
            />
            <Input
              ref={"company"}
              name={"company"}
              placeholder={"Contact Company"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "company", value})
              }}
              value={this.props.edit_user_dealfinder_page.company || this.props.edit_user_dealfinder_page.company == "" ? this.props.edit_user_dealfinder_page.company : this.props.dealfinder_page_defaults.default_company}

              type="text"
            />

            <Input
              ref={"phone"}
              name={"phone"}
              placeholder={"Contact Phone Number"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "phone", value})
              }}
              value={this.props.edit_user_dealfinder_page.phone || this.props.edit_user_dealfinder_page.phone == "" ? this.props.edit_user_dealfinder_page.phone : this.props.dealfinder_page_defaults.default_phone}
              type="text"
              mask_type={'cel-phone'}
              mask={"(999) 999-9999"}
            />

            <Input
              ref={"email"}
              name={"email"}
              placeholder={"Contact Email"}
              onChange={(value)=>{
                this.props.editTeamLinkInfo({prop: "email", value})
              }}
              value={this.props.edit_user_dealfinder_page.email || this.props.edit_user_dealfinder_page.email == "" ? this.props.edit_user_dealfinder_page.email : this.props.dealfinder_page_defaults.default_email}
              type="text"
            />

          </Card>

        </Wrapper>
      );


    }

    return <Wrapper />

  }
}

export default SiteInfo;
