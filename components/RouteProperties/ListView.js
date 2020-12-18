import React, { PureComponent } from 'react';

import { WebContainer, Wrapper, CardBody, Spin, Title, Copy, Row } from 'app/NativeComponents/common';

import RoutePropertiesList from './RoutePropertiesList';

class ListView extends PureComponent{

  render(){
    if(this.props.route_properties_toggle_tab == "list"){
      if(this.props.route_properties){
        if(this.props.route_properties.length > 0){
          return (
            <WebContainer>
              <RoutePropertiesList {...this.props}/>
            </WebContainer>
          );
        }else if(this.props.route_properties_refreshing || this.props.route_properties_loading){
          return(
            <WebContainer>
              <Wrapper  style={{flex: 1}}>
                  <Wrapper style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    alignSelf: "stretch",
                    flex: 1
                  }}>
                    <CardBody>
                      <Row>
                        <Spin size="small"/>
                        <Copy style={{marginLeft: 10}}>Loading...</Copy>
                      </Row>
                    </CardBody>
                  </Wrapper>
              </Wrapper>
            </WebContainer>
          );
        }
      }

      return (
        <WebContainer>
          <Wrapper style={{flex: 1}}>
            <WebContainer>
              <CardBody style={{marginTop: 20}}>
                <Title style={{textAlign: "center"}}>No properties found.</Title>
                <Copy style={{textAlign: "center"}}>There were no leads added during this route.</Copy>
              </CardBody>
            </WebContainer>
          </Wrapper>
        </WebContainer>

      )
    }
    return <Wrapper />
  }
}

export default ListView
