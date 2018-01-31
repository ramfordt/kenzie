/* 1. Complete the function below to calculate product line 
      Input: price of the product (double)
      Input: quantity selected (integer)
      Output: product line totals (double)
*/
function calculateProdTotal (price, quantity) {
    return 0;   // replace this!
}

/* 2. Complete the function below to calculate gross cart totals
      use the array of product line total argument
      Input: prodTotals is an array of product line totals (array of double)
      Output: gross cart totals (double)
  
      NOTE: since we haven't covered loops yet, please assume the array will
            always have 3 elements (i.e., bananas, oranges, apples)
*/
function calculateSubtotal (prodTotals) {
    return 0;   // replace this!
}

/* 3. Complete the function below to calculate added taxes
      Input: gross cart totals (double) before tax and shipping
      Input: tax rate (i.e., 0.10 for 10%)
      Output: added taxes for the cart (double)
*/
function calculateTaxes(grossTotal, taxRate) {
    return 0;   // replace this!
}

/* 4. Complete the function below to calculate total
      Input: gross cart totals (double) before tax and shipping
      Input: shipping fee (always $4.00)
      Input: added tax
      Output: total cart amount inclusive of shipping and taxes (double)
*/
function calculateTotal (grossTotal, addedShipping, addedTax) {
    return 0;   // replace this!
}

/* 5. We want to inform the users when certain items run out of stock
      Complete the function below to update the label for product availability
      as users add items to their shopping cart.
      Input: product is either "banana", "apple", or "orange"
      Input: selected is the amount selected on the shopping cart
      Input: availability is the total amount in stock available
      Output: none

      This assignment is a little flexible. Given the combination of number
      of items selected and the product availability, you can choose what 
      message you would like to tell the users and under what conditions. 
      We suggest you tell the users when there is limited supply and when
      the item is out of stock.
      
      NOTE: To update the label you need to call the following function:
                updateProdAvailabilityLabel(product, label, availability)
            Input: product - pass along the same product argument
            Input: label - any string you would like as a message
            Input: availability - one of the following options: 
                    OUT_OF_STOCK, LIMITED_SUPPLY, AVAILABLE
            the label will change font color based on selection (green, yellow, red)

*/
function updateProdAvailability(product, selected, availability) {
    return; // replace this!
}