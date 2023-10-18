// Import the necessary modules
const fetch = require("node-fetch");
const fs = require("fs");

// Define the URL and options for the fetch call
const url = "https://www.waitrose.com/api/graphql-prod/graph/live";
const totalRecordsToFetch = 20000;
const recordsPerFetch = 100;
const startVal = 0;

let existingData = [];

const generateFilename = (index) => {
  return `waitroseData_${index}.json`;
};

// Moved the filename declaration to the outer scope
const filename = generateFilename(startVal);

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

const newSavedIds = new Set()
const newDuplicateIds = new Set()
const newNames = new Set()

if (fs.existsSync(filename)) {
  // Read existing data
  const fileContent = fs.readFileSync(filename, 'utf8');
  existingData = JSON.parse(fileContent);
}

// Transform and save the file
const saveToFile = (data, index) => {
  const finalProducts = []  
  const filename = generateFilename(index);
  
  try {
    data.map(product => {
      // Create a unique filename based on 'i'
      
      console.log('product name: ', product?.searchProduct?.name)

     // Make a random ID for each product similar to the format: 6ffa5071-1567-485b-a025-378fec3f7cae
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      // Check if the id has already been used and is stored in the set. If it has then don't add it to the finalProducts array
      if (newSavedIds.has(product.searchProduct?.id)) {
        newDuplicateIds.add(product.searchProduct?.id)
        return;
      }

      if (newNames.has(product.searchProduct?.name)) {
        newDuplicateIds.add(product.searchProduct?.name)
        return;
      }
  
      const refinedProduct = {
        "id": id,
        "productType": "WaitroseType",  
        "name.en": product.searchProduct?.name || 'unknown',
        "name.en-GB": product.searchProduct?.name || 'unknown',
        "brand": product.searchProduct?.brand || 'unknown',
        "price_amount": product.searchProduct?.currentSaleUnitPrice?.price?.amount || 'unknown',
        "currency_code": product.searchProduct.currentSaleUnitPrice.price.currencyCode,
        "quantity_amount": product.searchProduct?.currentSaleUnitPrice?.quantity?.amount || 'unknown',
        "quantity_uom": product.searchProduct?.currentSaleUnitPrice?.quantity?.uom || 'unknown',
        "display_price": product.searchProduct?.displayPrice,
        "display_price_qualifier": product.searchProduct?.displayPriceQualifier,
        "product_id": product.searchProduct?.id || 'unknown',
        "product_name": product.searchProduct?.name || 'unknown',
        "product_image_url_xl": product.searchProduct?.productImageUrls?.extraLarge || 'unknown',
        "product_image_url_l": product.searchProduct?.productImageUrls?.large || 'unknown',
        "product_image_url_m": product.searchProduct?.productImageUrls?.medium || 'unknown',
        "product_image_url_s": product.searchProduct?.productImageUrls?.small || 'unknown',
        "reviews_average_rating": product.searchProduct?.reviews?.averageRating || 0,
        "reviews_review_count": product.searchProduct?.reviews?.reviewCount || 0,
        "size": product.searchProduct?.size || 'unknown',
        "typical_weight": product.searchProduct?.typicalWeight || 'unknown',
        "servings": product.searchProduct?.servings || 'unknown',
        "metaData": product.metaData || 'unknown',
      }

      finalProducts.push(refinedProduct)
      newSavedIds.add(product.searchProduct?.id)
      newNames.add(product.searchProduct?.name)
    })

// Filter out duplicates and append new data to the existing data
const existingIds = new Set(existingData.map(entry => entry.id));
const filteredProducts = finalProducts.filter(entry => !existingIds.has(entry.id));
existingData.push(...filteredProducts);

// Write the data back to the file
fs.writeFileSync(filename, JSON.stringify(existingData, null, 2));
console.log(`Data saved to ${filename}`);

} catch (err) {
  console.error(`Error writing to file: ${err}`);
}
};


const fetchAndSaveData = async () => {
  for (let i = startVal; i < totalRecordsToFetch + startVal; i += recordsPerFetch) {
    const data = await fetchData(i, recordsPerFetch);
    const dataToEdit = data.data.getProductListPage.productGridData.componentsAndProducts;
    console.log(`fetch ${i}`);
    saveToFile(dataToEdit, i);
  }
};

fetchAndSaveData();
