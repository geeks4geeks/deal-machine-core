import React, { Component } from 'react';
import {
  Scroll,
  Wrapper,
  Icon,
  Row,
  Card,
  CardBody,
  Title,
  Copy
} from 'app/NativeComponents/common';

import ShareButtons from 'app/NativeComponents/components/ShareButtons';

class Body extends Component{


  render(){

    const { code, title, description } = this.props.stats.invite;
    return (
      <Scroll>
        <CardBody>
          <Row>
            <Icon
              icon="group-add"
              size={20}
              style={{marginRight: 5}}
            />
            <Title>
              {title}
            </Title>
          </Row>
          <Copy>
            {description}
          </Copy>
        </CardBody>
        <Card>
          <CardBody>
            <Title style={{
              fontSize: 34
            }}>
              {code}
            </Title>
          </CardBody>
        </Card>
        <ShareButtons
          {...this.props}
          url={this.props.stats.invite.url}
          message={this.props.stats.invite.share_message}
          title={this.props.stats.invite.share_title}
          subject={this.props.stats.invite.subject}
          more_options={true}
        />
      </Scroll>
    );

  }

}

export default Body;
