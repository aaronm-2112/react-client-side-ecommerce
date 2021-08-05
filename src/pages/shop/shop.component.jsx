import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import CollectionPageContainer from "../collection/collection.container";

// Here we fetch the data from the Redux store as we are the common acnestor between ColletionOverview and CollecitonPage
// Then we use the container pattern because wihout that we have to tell the components how to render instead of just telling them to render
// Why did this happen? Making the data fetch asynchronous (a necessity to get data from firestore) introduced loading times.
// TO accommodate loading times we added HOCs that display a Spinner when data is being fecthed.
// In order to display the spinner we had to tell the Components that the data is still being fetched. In order to display the data
// we had to tell the components that the data has been fetched.
// This means we are telling the components how to render instead of just telling them to render; making this ShopPage
// more complex than a dumb component (which is our goal).
// The Container pattern allowed us to put that logic for deciding how to render each component into a container that wraps each component
// and connects to the Redux store to fetch the information required to instruct the components to load a spinner or load the data.
// Now the components are responsible for how they render, not the SHopPage.
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
