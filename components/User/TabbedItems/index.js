import React, { Component } from 'react';
import { Wrapper, Title, Card, CardBody, Row } from 'app/NativeComponents/common';

import TabButton from './TabButton';

import Permissions from './Permissions';
import Access from './Access';

class TabbedItems extends Component {

  constructor(props){
    super(props);

    this.state = {
      tab: "permissions"
    }
  }

  selectTab(tab){
    this.setState({tab});
  }

  renderAccessButton(){
    return(
      <TabButton
        title="Access"
        slug={"access"}
        active_tab={this.state.tab}
        colors={this.props.colors}
        onPress={()=>{
          this.selectTab("access")
        }}
      />
    )
  }

  render(){

    if(this.props.user.team_clearance_level > 1){
      if(this.props.active_team_member.member_type == "team_member"){

        if(this.props.isMobile){
            return(
            <Wrapper>
              <Row style={{alignItems:"center", justifyContent: "center", flexWrap: "wrap"}}>
                <TabButton
                  title="Permissions"
                  slug={"permissions"}
                  active_tab={this.state.tab}
                  colors={this.props.colors}

                  onPress={()=>{
                    this.selectTab("permissions")
                  }}
                />
                {
                  this.renderAccessButton()
                }

              </Row>
              <Wrapper style={{flex: 1}}>
                <Permissions tab={this.state.tab} {...this.props}/>
                <Access tab={this.state.tab} {...this.props}/>

              </Wrapper>
            </Wrapper>
          )
        }

        return(
          <Wrapper className="dm-user-tabbed-items">
            <Wrapper className="dm-user-tabs" style={{padding: 20, paddingTop: 10}}>
              <TabButton
                title="Permissions"
                slug={"permissions"}
                active_tab={this.state.tab}
                onPress={()=>{
                  this.selectTab("permissions")
                }}
                colors={this.props.colors}

              />
              {this.renderAccessButton()}
            </Wrapper>
            <Wrapper style={{flex: 1}}>
              <Permissions tab={this.state.tab} {...this.props}/>
              <Access tab={this.state.tab} {...this.props}/>

            </Wrapper>
          </Wrapper>
        )
      }
    }

    return <Wrapper />
  }
}


export default TabbedItems;
