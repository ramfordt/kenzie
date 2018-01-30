var BANANA_PRICE = 1.00;
var APPLE_PRICE = 2.00;
var ORANGE_PRICE = 3.00;
var SHIPPING_COST = 4.00;
var TAX_RATE = .05;

var AVAILABLE = "available";
var OUT_OF_STOCK = "outofstock";
var LIMITED_SUPPLY = "limitedsupply";

var availableBananas = 20;
var availableApples = 20;
var availableOranges = 3;

var selectedBananas = 1;
var selectedApples = 1;
var selectedOranges = 1;

var subtotalBananas = calculateProdTotal(BANANA_PRICE, selectedBananas);
var subtotalApples = calculateProdTotal(APPLE_PRICE, selectedApples);
var subtotalOranges = calculateProdTotal(ORANGE_PRICE, selectedOranges);

var subtotal = 0;
var shipping = 0;
var taxes = 0;
var total = 0;

$(document).ready(function () {

    // initialize product pricing on page
    $('#bananas .prodPrice').text("$" + BANANA_PRICE.toFixed(2));
    $('#apples .prodPrice').text("$" + APPLE_PRICE.toFixed(2));
    $('#oranges .prodPrice').text("$" + ORANGE_PRICE.toFixed(2));

    // initialize shopping cart with one of each
    $('#bananas .qty').val(selectedBananas);
    $('#apples .qty').val(selectedApples);
    $('#oranges .qty').val(selectedOranges);

    // dont let user select more than is available
    $('#bananas .qty').prop("max", availableBananas);
    $('#apples .qty').prop("max", availableApples);
    $('#oranges .qty').prop("max", availableOranges);

    // calculate initial totals
    updateProdTotal("#bananas", BANANA_PRICE);
    updateProdTotal("#apples", APPLE_PRICE);
    updateProdTotal("#oranges", ORANGE_PRICE);
    updateTotals();

    // calculate at each update
    $('#bananas .qty').on('change', function() {
        selectedBananas =  $('#bananas .qty').val();
        subtotalBananas = calculateProdTotal(BANANA_PRICE, selectedBananas);
        updateProdTotal("#bananas", subtotalBananas);
        updateProdAvailability("#bananas", selectedBananas, availableBananas);
        updateTotals();
    })
    $('#apples .qty').on('change', function() {
        selectedApples =  $('#apples .qty').val();
        subtotalApples = calculateProdTotal(APPLE_PRICE, selectedApples);
        updateProdTotal("#apples", subtotalApples);
        updateProdAvailability("#apples", selectedApples, availableApples);
        updateTotals();
    })
    $('#oranges .qty').on('change', function() {
        selectedOranges =  $('#oranges .qty').val();
        subtotalOranges = calculateProdTotal(ORANGE_PRICE, selectedOranges);
        updateProdTotal("#oranges", subtotalOranges);
        updateProdAvailability("#oranges", selectedOranges, availableOranges);
        updateTotals();
    })
});

function updateProdTotal(id, prodTotal) {
    $(id+' > .prodTotal').text("$" + prodTotal.toFixed(2));
}

function updateProdAvailabilityLabel(id, label, availability) {
    $(id+' > .info > .stockStatus').text(label);
    if (availability == LIMITED_SUPPLY) {
        $(id+' > .info > .stockStatus').removeClass(AVAILABLE);
        $(id+' > .info > .stockStatus').addClass(LIMITED_SUPPLY);
        $(id+' > .info > .stockStatus').removeClass(OUT_OF_STOCK);
    } else if (availability == OUT_OF_STOCK) {
        $(id+' > .info > .stockStatus').removeClass(AVAILABLE);
        $(id+' > .info > .stockStatus').removeClass(LIMITED_SUPPLY);
        $(id+' > .info > .stockStatus').addClass(OUT_OF_STOCK);
    } else if (availability == AVAILABLE) {
        $(id+' > .info > .stockStatus').addClass(AVAILABLE);
        $(id+' > .info > .stockStatus').removeClass(LIMITED_SUPPLY);
        $(id+' > .info > .stockStatus').removeClass(OUT_OF_STOCK);
    }

}

function updateTotals() {
    var prodTotals = [subtotalBananas, subtotalApples, subtotalOranges];
    subtotal = calculateSubtotal(prodTotals);
    shipping = calculateShipping();
    taxes = calculateTaxes(subtotal, TAX_RATE);
    total = calculateTotal(subtotal, shipping, taxes);
    $('.subtotal').text("$" + subtotal.toFixed(2));
    $('.shipping').text("$" + shipping.toFixed(2));
    $('.taxes').text("$" + taxes.toFixed(2));
    $('.total').text("$" + total.toFixed(2));
}

function calculateShipping () {
    return SHIPPING_COST;
}

// BEGIN CODING HERE

/* 1. Complete the function below to calculate product line 
      Input: price of the product (double)
      Input: quantity selected (integer)
      Output: product line totals (double)
*/
function calculateProdTotal (price, quantity) {
    return price * quantity;
}

/* 2. Complete the function below to calculate gross cart totals
      use the array of product line total argument
      Input: prodTotals is an array of product line totals (array of double)
      Output: gross cart totals (double)
  
      NOTE: since we haven't covered loops yet, please assume the array will
            always have 3 elements (i.e., bananas, oranges, apples)
*/
function calculateSubtotal (prodTotals) {
    return prodTotals[0] + prodTotals[1] + prodTotals[2];
}

/* 3. Complete the function below to calculate added taxes
      Input: gross cart totals (double) before tax and shipping
      Input: tax rate (i.e., 0.10 for 10%)
      Output: added taxes for the cart (double)
*/
function calculateTaxes(grossTotal, taxRate) {
    return grossTotal * taxRate;
}

/* 4. Complete the function below to calculate total
      Input: gross cart totals (double) before tax and shipping
      Input: shipping fee (always $4.00)
      Input: added tax
      Output: total cart amount inclusive of shipping and taxes (double)
*/
function calculateTotal (grossTotal, addedShipping, addedTax) {
    return grossTotal + addedShipping + addedTax;
}

/* 5. We want to inform the users when certain items run out of stock
      Complete the function below to update the label for product availability
      as users add items to their shopping cart.
      Input: product is either "banana", "apple", or "orange"
      Input: selected is the amount selected on the shopping cart
      Input: availability is the total amount in stock available

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
    var available = availability - selected;
    if (available == 0) {
        updateProdAvailabilityLabel(product, "OUT OF STOCK", OUT_OF_STOCK);
    } else if (available <= 3) {
        updateProdAvailabilityLabel(product, "LIMITED SUPPLY", LIMITED_SUPPLY);
    } else {
        updateProdAvailabilityLabel(product, "IN STOCK", AVAILABLE);
    }
}