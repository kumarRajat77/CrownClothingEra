import SHOP_DATA from "../../pages/shop/Shop.data";
const INITIAL_STATE = {
  collections: SHOP_DATA
};

const shopReducers = (state=INITIAL_STATE, action) =>{
  switch(action.type){
    default:
      return state;
  }
}
export default shopReducers;