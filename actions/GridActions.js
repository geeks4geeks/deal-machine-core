
import {
  TOGGLE_GRID_COLUMNS,
  TOGGLE_GRID_FILTERS,
  TOGGLE_GRID_OPTIONS,
  HANDLE_PAGE_DATA
} from 'app/DealMachineCore/types';

export const toggleGridColumns = ({prop, value}) => {

  return {
    type: TOGGLE_GRID_COLUMNS,
    payload: {prop, value}
  };
};

export const toggleGridFilters = (toggle) => {
  return {
    type: TOGGLE_GRID_FILTERS,
    payload: toggle
  }
};

export const toggleGridOptions = (toggle) => {
  return {
    type: TOGGLE_GRID_OPTIONS,
    payload: toggle
  }
};

export const handlePageData = ({page, slice_position}) => {

  return {
    type: HANDLE_PAGE_DATA,
    payload: {page, slice_position}
  }
};
