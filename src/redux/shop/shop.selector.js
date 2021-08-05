import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectShop = (state) => state.shop;

const selectShopCollection = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectShopCollection], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollection],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectisCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections // turns all falsys to false. Any object is true. Since our collections is default null this works
);

export default selectShopCollection;
