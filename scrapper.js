const puppeteer = require("puppeteer");
const fs = require("fs");

const urls = [
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/fresh_and_chilled",
    category: "fresh and chilled",
  },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/frozen",
    category: "frozen",
  },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/bakery",
    category: "bakery",
  },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/food_cupboard",
    category: "food cupboard",
  },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/tea_coffee_and_soft_drinks",
    category: "tea, coffee and soft drinks",
  },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits",
    category: "beer, wine, and spirits",
  },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/dietary_and_lifestyle",
    category: "dietary and lifestyle",
  },
  // {
  //   url: "https://www.waitrose.com/ecom/shop/browse/groceries/toiletries_health_and_beauty",
  //   category: "toiletries, health, and beauty",
  // },
  // {
  //   url: "https://www.waitrose.com/ecom/shop/browse/groceries/household",
  //   category: "household",
  // },
  // {
  //   url: "https://www.waitrose.com/ecom/shop/browse/groceries/baby_child_and_parent",
  //   category: "baby, child, and parent",
  // },
  // {
  //   url: "https://www.waitrose.com/ecom/shop/browse/groceries/kitchen_dining_and_home",
  //   category: "kitchen, dining, and home",
  // },
  // {
  //   url: "https://www.waitrose.com/ecom/shop/browse/groceries/pet",
  //   category: "pet",
  // },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/organic_shop",
    category: "organic shop",
  },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/taste_of_japan",
    category: "taste of Japan",
  },
  {
    url: "https://www.waitrose.com/ecom/shop/browse/groceries/halloween",
    category: "halloween",
  },
];

(async () => {
  // launch the browser
  const browser = await puppeteer.launch({ headless: false });

  // create an array of products
  let allProducts = [];

  for (const { url, category } of urls) {
    console.log(`Starting scraping for category: ${category} at URL: ${url}`);

    const page = await browser.newPage();

    try {
      console.log(`Navigating to URL: ${url}`);
      await page.goto(url);
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`Error navigating to URL: ${url}`, err);
      continue;
    }

    // Accept cookies button
    if (page) {
      const allowCookiesButton = await page.$(
        'button[data-testid="accept-all"]'
      );

      if (allowCookiesButton) {
        await allowCookiesButton.click();
        await new Promise((r) => setTimeout(r, 2000));
      }

      let sameCountClicks = 0;
      let prevProductCount = 0;

      while (true) {
        // Infinite loop which we break to then do the scraping
        const loadMoreButton = await page.$('button[aria-label="Load more"]');

        if (loadMoreButton) {
          const isButtonVisible = await page.evaluate((button) => {
            const computedStyle = window.getComputedStyle(button);
            return computedStyle.display !== "none" && !button.disabled;
          }, loadMoreButton);

          if (isButtonVisible) {
            await loadMoreButton.click();
            await new Promise((r) => setTimeout(r, 2000));

            // Check if new content has loaded
            const productsCount = await page.$$eval(
              "article[data-product-name]",
              (products) => products.length
            );
            console.log(`After click: ${productsCount} products found`);

            // Temp click to check for over 100 products:
            if (productsCount >= 10000) {
              console.log("Reached 10,000 products, stopping further clicks.");
              break;
            }

            // Check if products count is the same as previous click
            if (productsCount === prevProductCount) {
              sameCountClicks++;
            } else {
              sameCountClicks = 0; // Reset if found more products
            }

            // Move to the next category if no new products after 3 clicks
            if (sameCountClicks >= 3) {
              console.log(
                "No new products after 3 clicks. Moving to the next category."
              );
              break;
            }
            prevProductCount = productsCount;

            //Scrape baby scrape
            const products = await page.evaluate((category) => {
              let articles = document.querySelectorAll(
                "article[data-product-name]"
              );
              let tempProducts = [];

              articles.forEach((article) => {
                let name = article.getAttribute("data-product-name");
                let price =
                  article.querySelector('[data-test="product-pod-price"] span')
                    .textContent || "unknown";
                let weight =
                  article.querySelector('[data-testid="product-size"]')
                    .textContent || "unknown";

                let image = article.querySelector(
                  "div [data-testid='product-pod-image'] img"
                ).src;
                tempProducts.push({ name, price, weight, image, category });
              });
              return tempProducts;
            }, category);

            // Add to all products array
            allProducts.push({ category, products });
            console.log(`Scraped ${products.length} products from ${category}`);
          } else {
            console.log(
              "'Load more' button is not visible/enabled. Stopping further clicks."
            );
            break;
          }
        } else {
          console.log("'Load more' button not found. Stopping further clicks.");
          break;
        }
      }
    }
  }

  fs.writeFileSync("products.json", JSON.stringify(allProducts, null, 4));
  await browser.close();
})();
