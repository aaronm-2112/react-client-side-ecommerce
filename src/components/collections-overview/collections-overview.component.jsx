import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import selectShopCollection, {
  selectCollectionsForPreview,
} from "../../redux/shop/shop.selector";
import CollectionPreview from "../collection-preview/collection-preview.component";
import "./collections-overview.styles.scss";

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => {
        return (
          <CollectionPreview
            key={id}
            {...otherCollectionProps}
          ></CollectionPreview>
        );
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps, null)(CollectionsOverview);
