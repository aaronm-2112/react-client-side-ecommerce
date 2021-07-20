import React from "react";
import CollectionPreview from "../../components/preview-collection/collection-preview";
import SHOPDATA from "./shop.data";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOPDATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
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
  }
}

export default ShopPage;
