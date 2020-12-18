import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Row, Title, Copy, Spin } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

import DealFinderList from './DealFinderList';
import InviteDealFinderCard from './InviteDealFinderCard';

class DrivingRoutes extends Component{


  render(){
    if(this.props.tab === "dealfinders"){
      if(this.props.team_members){

        if(this.props.team_members_loading && this.props.team_members.length == 0){
          return(
            <Wrapper  style={{flex: 1}}>
                <Wrapper style={{
                  alignItems: "center",
                  justifyContent: "center"}}>
                  <CardBody>
                    <Row>
                      <Spin size="small"/>
                      <Copy style={{marginLeft: 10}}>Loading DealFinders...</Copy>
                    </Row>
                  </CardBody>
                </Wrapper>
            </Wrapper>
          );
        }

        if(this.props.team_members.length > 0){
          return (
            <Wrapper style={{flex: 1}}>
              <InviteDealFinderCard {...this.props} />
              <DealFinderList {...this.props}/>
            </Wrapper>
          );
        }
      }


    }

    return <Wrapper />
  }

}

export default DrivingRoutes;
