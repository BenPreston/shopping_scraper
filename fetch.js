// Import the necessary modules
const fetch = require("node-fetch");
const fs = require("fs");

// Define the URL and options for the fetch call
const url = "https://www.waitrose.com/api/graphql-prod/graph/live";
const totalRecordsToFetch = 2;
const recordsPerFetch = 1;

// Basic fetch
const fetchData = async (start, size) => {
  const options = {
    headers: {
      "accept": "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "authorization": "Bearer unauthenticated",
      "breadcrumb": "browse-fe",
      "content-type": "application/json",
      "experience": "grocery-landing-page",
      "features": "enAppleWallet",
      "graphflags": "{}",
      "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "traceparent": "00-e6075b0057c51b3386a3ae0379c0b888-f4aa1615dd7412ba-01"
    },
    referrer: "https://www.waitrose.com/ecom/shop/browse/groceries",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"query\":\"fragment ProductFragment on Product {\\n  availableDays\\n  barCodes\\n  conflicts {\\n    lineNumber\\n    messages\\n    nextSlotDate\\n    outOfStock\\n    priority\\n    productId\\n    prohibitedActions\\n    resolutionActions\\n    slotOptionDates {\\n      type\\n      date\\n    }\\n  }\\n  containsAlcohol\\n  lineNumber\\n  images {\\n    extraLarge\\n    large\\n    medium\\n    small\\n  }\\n  id\\n  productType\\n  size\\n  brand\\n  thumbnail\\n  name\\n  leadTime\\n  reviews {\\n    averageRating\\n    total\\n  }\\n  customerProductDetails {\\n    customerFavourite\\n    customerPyo\\n  }\\n  currentSaleUnitPrice {\\n    quantity {\\n      amount\\n      uom\\n    }\\n    price {\\n      amount\\n      currencyCode\\n    }\\n  }\\n  defaultQuantity {\\n    amount\\n    uom\\n  }\\n  depositCharge {\\n    amount\\n    currencyCode\\n  }\\n  pricing {\\n    displayPrice\\n    displayUOMPrice\\n    displayPriceQualifier\\n    displayPriceEstimated\\n    formattedPriceRange\\n    currentSaleUnitRetailPrice {\\n      price {\\n        amount\\n        currencyCode\\n      }\\n      quantity {\\n        amount\\n        uom\\n      }\\n    }\\n    promotions {\\n      groups {\\n        threshold\\n        name\\n        lineNumbers\\n      }\\n      promotionDescription\\n      promotionExpiryDate\\n      promotionId\\n      pyoPromotion\\n      myWaitrosePromotion\\n      wasDisplayPrice\\n      promotionType\\n    }\\n  }\\n  persistDefault\\n  markedForDelete\\n  substitutionsProhibited\\n  displayPrice\\n  displayPriceEstimated\\n  displayPriceQualifier\\n  leadTime\\n  productShelfLife\\n  maxPersonalisedMessageLength\\n  summary\\n  supplierOrder\\n  restriction {\\n    availableDates {\\n      restrictionId\\n      startDate\\n      endDate\\n      cutOffDate\\n    }\\n  }\\n  weights {\\n    pricePerUomQualifier\\n    defaultQuantity {\\n      amount\\n      uom\\n    }\\n    servings {\\n      min\\n      max\\n    }\\n    sizeDescription\\n    uoms\\n    formattedWeightRange\\n  }\\n  categories {\\n    id\\n    name\\n    urlName\\n  }\\n  productTags {\\n    name\\n  }\\n  marketingBadges {\\n    name\\n  }\\n}\\nfragment ProductPod on Product {\\n              adTechSponsoredPosition,\\n              brand,\\n              categories {\\n                  name,\\n                  urlName,\\n                  id\\n              },\\n              cqResponsive {\\n                deviceBreakpoints {\\n                  name\\n                  visible\\n                  width\\n                }\\n              },\\n              currentSaleUnitPrice {\\n                price {\\n                  amount\\n                  currencyCode\\n                }\\n                quantity {\\n                  amount\\n                  uom\\n                }\\n              },\\n              customerProductDetails {\\n                customerInTrolleyQuantity {\\n                  amount\\n                  uom\\n                }\\n                customerPyo\\n              },\\n              defaultQuantity {\\n                  uom\\n              },\\n              depositCharge {\\n                amount,\\n                currencyCode\\n              },\\n              displayPrice,\\n              displayPriceEstimated,\\n              displayPriceQualifier,\\n              formattedWeightRange,\\n              formattedPriceRange,\\n              id,\\n              leadTime,\\n              lineNumber\\n              maxPersonalisedMessageLength,\\n              name,\\n              markedForDelete,\\n              persistDefault,\\n              productImageUrls {\\n                  extraLarge,\\n                  large,\\n                  medium,\\n                  small\\n              }\\n              productType,\\n              promotion {\\n                groups {\\n                  threshold\\n                  name\\n                  lineNumbers\\n                }\\n                myWaitrosePromotion\\n                promotionDescription\\n                promotionId\\n                promotionTypeCode\\n                wasDisplayPrice\\n              },\\n              promotions {\\n                groups {\\n                  threshold\\n                  name\\n                  lineNumbers\\n                }\\n                myWaitrosePromotion\\n                promotionDescription\\n                promotionId\\n                promotionTypeCode\\n                wasDisplayPrice\\n              },\\n              restriction {\\n                  availableDates {\\n                      restrictionId,\\n                      startDate,\\n                      endDate,\\n                      cutOffDate\\n                  },\\n              },\\n              resultType,\\n              reviews {\\n                averageRating\\n                reviewCount\\n              },\\n              size,\\n              sponsored,\\n              sponsorshipId,\\n              substitutionsProhibited,\\n              thumbnail\\n              typicalWeight {\\n                amount\\n                uom\\n              }\\n              servings {\\n                min\\n                max\\n              }\\n              weights {\\n                  uoms ,\\n                  pricePerUomQualifier,\\n                  perUomQualifier,\\n                  defaultQuantity {\\n                      amount,\\n                      uom\\n                  },\\n                  servings {\\n                      max,\\n                      min\\n                  },\\n                  sizeDescription\\n              },\\n              productTags {\\n                name\\n              },\\n              marketingBadges {\\n                name\\n              },\\n            }query(\\n  $customerId: String!\\n  $withRecommendations: Boolean!\\n  $size: Int\\n  $start: Int\\n  $category: String\\n  $filterTags: [filterTag]\\n  $recommendationsSize: Int\\n  $recommendationsStart: Int\\n  $sortBy: String\\n  $trolleyId: String\\n  $withFallback: Boolean\\n) {\\n  getProductListPage(\\n    category: $category\\n    customerId: $customerId\\n    filterTags: $filterTags\\n    recommendationsSize: $recommendationsSize\\n    recommendationsStart: $recommendationsStart\\n    size: $size\\n    start: $start\\n    sortBy: $sortBy\\n    trolleyId: $trolleyId\\n    withFallback: $withFallback\\n  ) {\\n  productGridData {\\n      failures{\\n          field\\n          message\\n          type\\n      }\\n      componentsAndProducts {\\n        __typename\\n        ... on GridProduct {\\n          searchProduct {\\n            ...ProductPod\\n          }\\n        }\\n        ... on GridCmsComponent {\\n          aemComponent\\n        }\\n        ... on GridSponsoredBannerComponent {\\n          sponsoredBanner\\n        }\\n      }\\n      conflicts {\\n        messages\\n        outOfStock\\n        priority\\n        productId\\n        prohibitedActions\\n        resolutionActions\\n        nextSlotDate\\n    }\\n      criteria {\\n        alternative\\n        sortBy\\n        filters {\\n          group\\n          filters {\\n            applied\\n            filterTag {\\n              count\\n              group\\n              id\\n              text\\n              value\\n            }\\n          }\\n        }\\n        searchTags {\\n          group\\n          text\\n          value\\n        }\\n        suggestedSearchTags {\\n          group\\n          text\\n          value\\n        }\\n      }\\n      locations {\\n        header\\n        masthead\\n        seoContent\\n      }\\n      metaData {\\n        description\\n        title\\n        keywords\\n        turnOffIndexing\\n        pageTitle\\n        canonicalTag\\n      }\\n      productsInResultset\\n      relevancyWeightings\\n      searchTime\\n      showPageTitle\\n      subCategories {\\n        name\\n        categoryId\\n        expectedResults\\n      }\\n      totalMatches\\n      totalTime\\n    }\\n    recommendedProducts @include(if: $withRecommendations) {\\n      failures{\\n        field\\n        message\\n        type\\n      }\\n      fallbackRecommendations\\n      products {\\n        ...ProductFragment\\n        metadata {\\n          recToken\\n          monetateId\\n        }\\n      }\\n      totalResults\\n    }\\n  }\\n}\\n\",\"variables\":{\"start\":${start},\"size\":${size},\"sortBy\":\"MOST_POPULAR\",\"trolleyId\":\"0\",\"recommendationsSize\":0,\"withRecommendations\":false,\"withFallback\":true,\"category\":\"10051\",\"customerId\":\"-1\",\"filterTags\":[]}}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Network response was not ok" + res.statusText);
  }

  return res.json();
};

// Transform and save the file
const saveToFile = (data) => {
  const finalProducts = []
  try {

    data.map(product => {

      console.log('product name: ', product?.searchProduct?.name)
      // const filters = product.productGridData.criteria.filters
 
      // const getFilterAppliedValue = (filters, filterId) => {
      //   const suitableFilter = filters.find(
      //     filter => filter.filters[0].filterTag.id === filterId
      //   );
      //   return suitableFilter ? suitableFilter.filters[0].applied : false;
      // };
      
      
      // const isSuitableForNuts = getFilterAppliedValue(filters, "suitableforthoseavoidingnutsfilter");
      // const isSuitableForVegans = getFilterAppliedValue(filters, "suitableforveganfilter");
      // const isSuitableForVegetarians = getFilterAppliedValue(filters, "suitableforvegitarianfilter");
      
      const refinedProduct = {
          "brand": product.searchProduct?.brand || 'unknown',
          "price_amount": product.searchProduct?.currentSaleUnitPrice?.price?.amount || 'unknown',
          "currencyCode": product.searchProduct?.currentSaleUnitPrice?.price?.currencyCode || 'unknown',
          "quantity_amount": product.searchProduct?.currentSaleUnitPrice?.quantity?.amount || 'unknown',
          "quantity_uom": product.searchProduct?.currentSaleUnitPrice?.quantity?.uom || 'unknown',
          "displayPrice": product.searchProduct?.displayPrice || 'unknown',
          "displayPriceQualifier": product.searchProduct?.displayPriceQualifier || 'unknown',
          "id": product.searchProduct?.id || 'unknown',
          "name": product.searchProduct?.name || 'unknown',
          "productImageUrls_extraLarge": product.searchProduct?.productImageUrls?.extraLarge || 'unknown',
          "productImageUrls_large": product.searchProduct?.productImageUrls?.large || 'unknown',
          "productImageUrls_medium": product.searchProduct?.productImageUrls?.medium || 'unknown',
          "productImageUrls_small": product.searchProduct?.productImageUrls?.small || 'unknown',
          "promotions": product.searchProduct?.promotions || 'unknown', 
          "reviews_averageRating": product.searchProduct?.reviews?.averageRating || 'unknown',
          "reviews_reviewCount": product.searchProduct?.reviews?.reviewCount || 'unknown',
          "size": product.searchProduct?.size || 'unknown',
          "typicalWeight": product.searchProduct?.typicalWeight || 'unknown',
          "servings": product.searchProduct?.servings || 'unknown',
          // "allergies_nuts": isSuitableForNuts || 'unknown',
          // "allergies_peanut": isSuitableForNuts || 'unknown',
          "allergies_soya": false || 'unknown',
          "allergies_wheat": false || 'unknown',
          "lifestyleGoals_highFibre": false || 'unknown',
          "lifestyleGoals_highProtein": false || 'unknown',
          "lifestyleGoals_lowFat": false || 'unknown',
          "lifestyleGoals_lowSalt": false || 'unknown',
          "lifestyleGoals_lowSugar": false || 'unknown',
          "lifestyleGoals_organic": false || 'unknown',
          // "lifestyleGoals_vegan": isSuitableForVegans || 'unknown', 
          // "lifestyleGoals_vegetarian": isSuitableForVegetarians || 'unknown',
          "sustainabilityGoals_sustainablySourced": false || 'unknown',
          "sustainabilityGoals_madeInTheUK": false || 'unknown',
          "sustainabilityGoals_reducedPackaging": false || 'unknown',
          // "searchTags": product.productGridData.criteria.searchTags || 'unknown',
          // "suggestedSearchTags": product.productGridData.criteria.suggestedSearchTags || 'unknown',
          "metaData": product.metaData || 'unknown',
      }

      finalProducts.push(refinedProduct)
    })

  const filename = "output.json";
  let existingData = [];

  // Check if the file exists
  if (fs.existsSync(filename)) {
    // Read existing data
    const fileContent = fs.readFileSync(filename, 'utf8');
    existingData = JSON.parse(fileContent);
  }

  // Add new data to existing data
  existingData.push(finalProducts);

  // Convert the data array to a JSON string with indentation
  const dataString = JSON.stringify(existingData, null, 2);

  // Write the data back to the file
  fs.writeFileSync(filename, dataString);

  console.log(`Data saved to ${filename}`);
} catch (err) {
  console.error(`Error writing to file: ${err}`);
}
};


const fetchAndSaveData = async () => {
  for (let i = 0; i < totalRecordsToFetch; i+=recordsPerFetch) {
        const data = await fetchData(i, recordsPerFetch);
        const dataToEdit = data.data.getProductListPage.productGridData.componentsAndProducts
        console.log(`fetch ${i}`)
        saveToFile(dataToEdit);
  }
};

fetchAndSaveData();
