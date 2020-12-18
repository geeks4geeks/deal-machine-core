import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper, ModalContainer, ModalOverlay, Modal } from "app/NativeComponents/common";

import DrawMap from "app/NativeComponents/components/DrawMap";

class DrawingMap extends Component {

  constructor(props){
    super(props);

    this.state = {
      is_drawing: false,
      drawing_coordinates: props.drawing_coordinates ? props.drawing_coordinates.length > 2 ? props.drawing_coordinates : [] : [],
      completed_drawing: props.drawing_coordinates ? props.drawing_coordinates.length > 2 ? true : false : false ,
      expand_map: false
    }

    this.toggleDrawing = this.toggleDrawing.bind(this);
    this.addDrawingCoordinate = this.addDrawingCoordinate.bind(this);
    this.completeDrawing = this.completeDrawing.bind(this);
    this.resetDrawing = this.resetDrawing.bind(this);
    this.expandMap = this.expandMap.bind(this);
  }

  toggleDrawing(toggle){
    this.setState({is_drawing: toggle, drawing_coordinates: !toggle ? [] : this.state.drawing_coordinates})
  }

  addDrawingCoordinate(coordinate){
    this.setState({
      drawing_coordinates: [...this.state.drawing_coordinates, coordinate]
    })
  }

  expandMap(toggle){
    this.setState({
      expand_map: toggle
    })
  }

  resetDrawing(){

    this.setState({
      is_drawing: true,
      drawing_coordinates: [],
      completed_drawing: false
    })

    if(this.props.onDrawingReset){
      this.props.onDrawingReset()
    }
  }

  completeDrawing(){
    this.setState({
      drawing_coordinates: this.state.drawing_coordinates.length > 2 ? [...this.state.drawing_coordinates, this.state.drawing_coordinates[0]] : [],
      is_drawing: false,
      completed_drawing: true
    })

    if(this.props.onDrawingSuccess){
      this.props.onDrawingSuccess(this.state.drawing_coordinates.length > 2 ? [...this.state.drawing_coordinates, this.state.drawing_coordinates[0]] : [])
    }
  }

  renderWebMap(){
    return(
      <ModalContainer style={{maxWidth: "90vw"}}>
        <DrawMap
          {...this.props}
          map_height={"90vh"}

          is_drawing={this.state.is_drawing}
          toggleDrawing={this.toggleDrawing}
          addDrawingCoordinate={this.addDrawingCoordinate}
          drawing_coordinates={this.state.drawing_coordinates}
          completed_drawing={this.state.completed_drawing}
          completeDrawing={this.completeDrawing}
          resetDrawing={this.resetDrawing}

          expand_map={this.state.expand_map}
          expandMap={this.expandMap}

        />
      </ModalContainer>
    )
  }

  renderWebExtendedMap(){
    return(
      <ModalContainer style={{maxWidth: "90vw"}}>
        <DrawMap
          {...this.props}
          map_height={"90vh"}

          is_drawing={this.state.is_drawing}
          toggleDrawing={this.toggleDrawing}
          addDrawingCoordinate={this.addDrawingCoordinate}
          drawing_coordinates={this.state.drawing_coordinates}
          completed_drawing={this.state.completed_drawing}
          completeDrawing={this.completeDrawing}
          resetDrawing={this.resetDrawing}

          expand_map={this.state.expand_map}
          expandMap={this.expandMap}

        />
      </ModalContainer>
    )
  }

  renderMobileExtendedMap(){
    return(
      <ModalOverlay
        isVisible={true}
        onPress={()=>this.expandMap(false)}
      >
        <Modal>
          <DrawMap
            {...this.props}
            map_height={"100%"}
            is_drawing={this.state.is_drawing}
            toggleDrawing={this.toggleDrawing}
            addDrawingCoordinate={this.addDrawingCoordinate}
            drawing_coordinates={this.state.drawing_coordinates}
            completed_drawing={this.state.completed_drawing}
            completeDrawing={this.completeDrawing}
            resetDrawing={this.resetDrawing}

            expand_map={this.state.expand_map}
            expandMap={this.expandMap}

          />
        </Modal>
      </ModalOverlay>
    )

  }

  render() {

    if(this.state.expand_map){
      if(this.props.device == "desktop"){
        return this.renderWebExtendedMap();
      }
      return this.renderMobileExtendedMap();
    }

    return <DrawMap
              {...this.props}
              is_drawing={this.state.is_drawing}
              toggleDrawing={this.toggleDrawing}
              addDrawingCoordinate={this.addDrawingCoordinate}
              drawing_coordinates={this.state.drawing_coordinates}
              completed_drawing={this.state.completed_drawing}
              completeDrawing={this.completeDrawing}
              resetDrawing={this.resetDrawing}

              expand_map={this.state.expand_map}
              expandMap={this.expandMap}

            />
  }
}

const mapStateToProps = ({ auth, native, property_map }) => {
  const { token, user } = auth;
  const {
    device, platform, isMobile
  } = native;

  const {
    autocomplete_loading, autocomplete_items, autocomplete_error, tap_to_add, map_mode
  } = property_map;
  return {
    token, user,
    device, platform, isMobile,
    autocomplete_loading, autocomplete_items, autocomplete_error

  };
};

export default connect(
  mapStateToProps,
  {

  }
)(DrawingMap);
