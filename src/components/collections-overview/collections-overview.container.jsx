import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectisCollectionFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
  isLoading: selectisCollectionFetching,
});

// this is equivalent to connect(mapStateToProps)(WithSpinner(collectionsOverview))
// it just uses funciton currying to make it cleaner
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
