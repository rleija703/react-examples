const initialState = {
  cats: [],
};

const actions = {
  'ADD_CAT': addCat,
};

function addCat(state, action) {
  return {
    cats: state.cats.push(action.payload),
  }
}

export default {
  initialState,
  actions
}