const updateCost = function (ele) {
  let quantity = $(ele).find(".quantity input").val();
  let itemPrice = parseFloat($(ele).children(".itemPrice").text().slice(1));
  let totalCost = quantity * itemPrice;

  $(ele).children(".totalCost").html(totalCost);

  return totalCost;
};

const updateCartCost = function (ele, itemCost) {
  let totalItemPrice = [];

  $("tbody tr").each(function (i, ele) {
    let cost = updateCost(ele);
    totalItemPrice.push(cost);
  });
  let filteredPrice = totalItemPrice.filter((item) => !isNaN(item));
  let cartPrice = filteredPrice.reduce((acc, c) => acc + c, 0).toFixed(2);
  console.log(cartPrice);
  $("#cartTotal").html(cartPrice);
  return cartPrice;
};

$(document).ready(function () {
  let timeout;

  $("body").on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateCartCost();
    }, 500);
  });

  $(document).on("click", ".btn.remove", function (event) {
    $(this).closest("tr").remove();
    updateCartCost();
  });

  $("#addItem").on("submit", function (event) {
    event.preventDefault();
    let item = $(this).children("[name=item]").val();
    let quantity = $(this).children("[name=quantity]").val();
    let price = $(this).children("[name=price]").val();
    let itemCost = quantity * price;
    $("tbody").append(`<tr>
      <td class='item'>${item}</td>
      <td class='itemPrice'>$${price}</td>
      <td class='quantity'><input type='number' value=${quantity}></td>
      <td class="text- center totalCost">${itemCost}</td>
      <td><button class='btn btn-light btn-sm remove'>Remove</td>

    
    </tr>`);
    updateCartCost();
    $(this).children("[name=item]").val("");
    $(this).children("[name=itemPrice]").val("");
    $(this).children("[name=quantity]").text("");
  });
});
