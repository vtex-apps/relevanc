# RelevanC Search API Middleware Resolver

## What is RelevanC

RelevanC is an ad-tech SaaS provider based in Paris, France. It markets a customised retail media solution under a white label to retailers and advertisers worldwide. With Sponsored Products for marketplaces, it combines truly relevant ads and maximum reach using advanced AI for the best of both worlds.

## RelevanC integration

### Search results page

Using VTEX Intelligent Search Middleware feature, this integration connects to RelevanC AdServer to get Sponsored Products to promote them in the search results page when a user makes a query.

## Integration Setup

_Note: You must already have a RelevanC account set up and ready_

After the app is installed on your VTEX account you can set up the behaviour for the integration using the following settings:

| Property name                                      | Description                                                                                                                                         |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| RelevanC AdServer name <br /> (`adServerName`)     | This is the name of RelevanC's AdServer (without `ads.peps.relevanc.io`)                                                                            |
| Product property <br /> (`boostType`)              | Product property to use to add/promote the products returned from the AdServer                                                                      |
| Max number of offers <br /> (`maxOffersToDisplay`) | Maximum number of products to be added to the search results                                                                                        |
| Add all products <br />(`addAllProducts`)          | By default, only products that are part of the search results are promoted. Check to add all products returned by the AdServer to the search result |
| Production <br /> (`production`)                   | Toggle between development and production environment                                                                                               |
