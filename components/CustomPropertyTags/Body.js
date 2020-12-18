import React, { Component } from 'react';

import {
  Card,
  Title,
  Copy,
  Spin,
  Wrapper,
  CenterCenter,
  CardBody,
  Scroll
} from 'app/NativeComponents/common';

import TagList from './TagList';
import DefaultTagList from './DefaultTagList';

import Buttons from './Buttons';


class Body extends Component{


  renderCustomTags(){

    if(this.props.tags_loaded && this.props.custom_tags.length > 0){
      return (
        <Wrapper>

          <Card>
            <TagList {...this.props}/>
          </Card>
          <Buttons {...this.props}/>
        </Wrapper>
      )
    }else if(this.props.tags_loaded && this.props.custom_tags.length == 0){
      return(
        <Card>
          <CardBody>

            <CardBody>
              <Title style={{textAlign: "center"}}>Property tags help you stay organized.</Title>
              <Copy style={{textAlign: "center"}}>Create a custom tag here so you can organize properties while you're driving. Example tags: "Important," "Unique list name," or "For Sale By Owner" </Copy>
            </CardBody>

            <Buttons {...this.props}/>
          </CardBody>

        </Card>
      )
    }

    return(
      <Wrapper>
        <Wrapper style={{marginTop: 20}}>
          <CenterCenter>
            <Spin/>
          </CenterCenter>
        </Wrapper>
      </Wrapper>
    );

  }


  render(){

    return(

        <Scroll>
          <Card>
            <DefaultTagList {...this.props}/>
          </Card>
          {this.renderCustomTags()}
        </Scroll>

    )


  }


}

export default Body;
