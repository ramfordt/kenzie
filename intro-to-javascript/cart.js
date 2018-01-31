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
