import { isPointInPolygon, getDistance } from 'geolib';
import moment from 'moment';
import tinycolor from 'tinycolor2';

export const checkIfCoordinatesAreInProperty = (point, properties) => {
  if(properties){
    for(let i = 0; i<properties.length; i++){
      if(properties[i].coordinates){
        for(let j = 0; j<properties[i].coordinates.length; j++){
          if(isPointInPolygon(point, properties[i].coordinates[j])){
            return properties[i];
          }
        }
      }
    }
  }
  return false;
}


export const checkIfPropertyInBounds = (property, region) => {

  const bounds = {
    westLng: region.center.longitude - region.longitudeDelta/1.5, // westLng - min lng
    southLat: region.center.latitude - region.latitudeDelta/1.5, // southLat - min lat
    eastLng: region.center.longitude + region.longitudeDelta/1.5, // eastLng - max lng
    northLat: region.center.latitude + region.latitudeDelta/1.5
  };

  if(property.location){
    if(isPointInPolygon({
      latitude: property.location.latitude,
      longitude: property.location.longitude
    }, [
      {
        latitude: bounds.southLat,
        longitude: bounds.westLng
      },
      {
        latitude: bounds.southLat,
        longitude: bounds.eastLng
      },
      {
        latitude: bounds.northLat,
        longitude: bounds.eastLng
      },
      {
        latitude: bounds.northLat,
        longitude: bounds.westLng
      }
    ])){
      return true;
    }

  }

  return false;
}

export const renderRouteColor = (route, user) =>{

    const months = moment().diff(route.date_created, 'months', false);
    let color = "";

    if(months > 24){
      //transparent
      color = "transparent";

    }else if(months > 12){
      //red
      color = "#B24C63";
    }else if(months > 6){
      //yellow
      color = "#F9F871";

    }else{
      //green
      color = "#4EE8C3";

    }


    if(user && months < 24){
      if(route.user_id != user.id){
        //get opacity
        const color_item = tinycolor(color);
        color = "rgba("+color_item._r+","+color_item._g+","+color_item._b+", 0.7)";
      }
    }
    return color;
  }

  export const determineHighlightArray = (properties, property_map_options, user) =>{
    let new_array = [];
    if(!user){
      return [];
    }
    /*
    if(!properties || user.team_clearance_level == 0){
      return [];
    }
    */

    for(let i = 0; i<properties.length; i++){
      if(properties[i].highlighted == 1){
        new_array.push(properties[i])
      }
    }

    return new_array;

  }

/*
export const determineHighlightArray = (properties, property_map_options, user) =>{

    let new_array = [];
    if(!user || !property_map_options){
      return [];
    }
    if(!properties || !property_map_options || user.team_clearance_level == 0 || !property_map_options.show_property_highlight){
      return [];
    }

    if(property_map_options.highlight_option_owner_status == "none" &&
    property_map_options.highlight_option_sale_date == "none" &&
    property_map_options.highlight_option_home_value == "none" &&
    property_map_options.highlight_option_home_equity == "none"
    ){
      return [];
    }


    for(let i = 0; i<properties.length; i++){

      let property = properties[i];

      let is_highlighted = true;
      let halt_check = false;

      if(property_map_options.highlight_option_owner_status != "none" && property_map_options.highlight_option_owner_status != null){
        if(property_map_options.highlight_option_owner_status == property.owner_status_info.slug){
          is_highlighted = true;

        }else{
          is_highlighted = false;
          halt_check = true;
        }
      }

      if(property_map_options.highlight_option_sale_date != "none" && property_map_options.highlight_option_sale_date != null && !halt_check){

          if(property.saledate){
            let saledate = moment(property.saledate);
            switch(property_map_options.highlight_option_sale_date){

              case "over_2_years":

                if(saledate < moment().subtract(2, 'year')){
                  is_highlighted = true;
                }else{
                  is_highlighted = false;
                  halt_check = true;
                }

              break;

              case "over_5_years":
                if(saledate < moment().subtract(5, 'year')){
                  is_highlighted = true;
                }else{
                  is_highlighted = false;
                  halt_check = true;
                }
              break;

              case "over_10_years":
                if(saledate < moment().subtract(10, 'year')){
                  is_highlighted = true;
                }else{
                  is_highlighted = false;
                  halt_check = true;
                }
              break;

            }

          }else{
            is_highlighted = false;
            halt_check = true;
          }
      }


      if(property_map_options.highlight_option_home_value != "none" && property_map_options.highlight_option_home_value != null && !halt_check){

        if(property.calculated_total_value){

          switch(property_map_options.highlight_option_home_value){

            case "under_50k":

              if(property.calculated_total_value < 50000){
                is_highlighted = true;
              }else{
                is_highlighted = false;
                halt_check = true;
              }

            break;


            case "between_50k_199k":

              if(property.calculated_total_value > 50000 && property.calculated_total_value < 200000){
                is_highlighted = true;
              }else{
                is_highlighted = false;
                halt_check = true;
              }

            break;

            case "between_200k_499k":

              if(property.calculated_total_value > 200000 && property.calculated_total_value < 500000){
                is_highlighted = true;
              }else{
                is_highlighted = false;
                halt_check = true;
              }

            break;

            case "over_500k":

              if(property.calculated_total_value > 500000){
                is_highlighted = true;
              }else{
                is_highlighted = false;
                halt_check = true;
              }

            break;


          }

        }else{
          is_highlighted = false;
          halt_check = true;
        }


      }


      if(property_map_options.highlight_option_home_equity != "none" && property_map_options.highlight_option_home_equity != null && !halt_check){

        if(property.calculated_equity_percent){

          let equity_percent = property.calculated_equity_percent*100;


          switch(property_map_options.highlight_option_home_equity){

            case "over_10_percent":

              if(equity_percent > 10){
                is_highlighted = true;
              }else{
                is_highlighted = false;
                halt_check = true;
              }

            break;

            case "over_25_percent":

              if(equity_percent > 25){
                is_highlighted = true;
              }else{
                is_highlighted = false;
                halt_check = true;
              }

            break;

            case "over_50_percent":

              if(equity_percent > 50){
                is_highlighted = true;
              }else{
                is_highlighted = false;
                halt_check = true;
              }

            break;



          }
        }else{
          is_highlighted = false;
          halt_check = true;
        }


      }




        if(is_highlighted){
          new_array.push(property);
        }

    }

    return new_array;
  }
 */


  export const getShownProperties = (properties, region) => {
    let show_property_count = 0;
    properties.map((property)=>{
      if(checkIfPropertyInBounds(property, region)){
        show_property_count++;
      }
    });
    return show_property_count;
  }

  export const checkIfShowMarker = (property, highlighted_properties) => {
    for(var i = 0; i < highlighted_properties.length; i++) {
        if(highlighted_properties[i].property_id == property.property_id){
            return true;
            break;
        }
    }

    return false;
  }

  export const combineRouteSections = (map_routes) => {

    let combined_routes = [];

    if(map_routes){
      if(map_routes.length > 0){
        for(let i = 0; i<map_routes.length; i++){
          if(combined_routes.length == 0){

            combined_routes.push(map_routes[i]);
          }else{
            if(map_routes[i].route_type == "route_section"){

              if(combined_routes[combined_routes.length - 1]){

                const last_route = combined_routes[combined_routes.length - 1];
                if(last_route.route_id == map_routes[i].route_id){

                  if(last_route.coordinates && map_routes[i].coordinates){

                    if(last_route.coordinates.length > 0 && map_routes[i].coordinates.length > 0){

                      const last_latlng = last_route.coordinates[0];
                      const next_latlng = map_routes[i].coordinates[map_routes[i].coordinates.length - 1];

                      if(getDistance(last_latlng, next_latlng) <= 75){
                        combined_routes[combined_routes.length - 1].coordinates = map_routes[i].coordinates.concat(combined_routes[combined_routes.length - 1].coordinates);
                      }else{
                        combined_routes.push(map_routes[i]);
                      }

                    }
                  }

                }else{
                  combined_routes.push(map_routes[i]);
                }

              }else{
                combined_routes.push(map_routes[i]);
              }
            }else{
              combined_routes.push(map_routes[i]);
            }
          }
        }
      }
    }

    return combined_routes;

  }

  export const getCurrentRouteSections = (current_route_section, current_route) =>{

    let current_route_coordinates = [];

    if(current_route){
      if(current_route_section){
        if(current_route_section.coordinates){
          current_route_coordinates.push(current_route_section.coordinates);
        }
      }
      if(current_route.route_sections){
        if(current_route.route_sections.length > 0){
          for(let i = 0; i<current_route.route_sections.length; i++){
            if(current_route_coordinates.length == 0){

              current_route_coordinates.push(current_route.route_sections[i]);

            }else if(current_route_coordinates[current_route_coordinates.length - 1]){
              const last_coordinates = current_route_coordinates[current_route_coordinates.length - 1];
              const next_coordinates = current_route.route_sections[i].coordinates;

              if(last_coordinates.length > 0 && next_coordinates.length > 0){

                const last_latlng = last_coordinates[0];
                const next_latlng = next_coordinates[next_coordinates.length - 1];

                if(getDistance(last_latlng, next_latlng) <= 75){
                  current_route_coordinates[current_route_coordinates.length - 1] = current_route.route_sections[i].coordinates.concat(current_route_coordinates[current_route_coordinates.length - 1]);
                }else{
                  current_route_coordinates.push(current_route.route_sections[i].coordinates);
                }

              }else if(next_coordinates.length > 0){
                current_route_coordinates.push(current_route.route_sections[i].coordinates);
              }
            }

          }

        }
      }
    }

    return current_route_coordinates;

  }
