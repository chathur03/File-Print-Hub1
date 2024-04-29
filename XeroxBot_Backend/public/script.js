$(document).ready(async () => {
  console.log("ready..");
  let res = await fetch("http://127.0.0.1:5000/pending-orders");
  let orders = await res.json();
  $("#count-h").html(`Order Count: ${orders.count}`)
  $(".box-container").remove();
  console.log(orders.orders);
  orders.orders.map((order) => create_div(order));

  setInterval(async () => {
    let no_of_orders = 0;
    let res = await fetch("http://127.0.0.1:5000/pending-orders");
    let orders = await res.json();

    if (orders.length != no_of_orders) {
      $(".box-container").remove();
      console.log(orders.orders);
      orders.orders.map((order) => create_div(order));
      $("#count-h").html(`Order Count: ${orders.count}`)
    }
  }, 1000);
});

function create_div(sampleOrder) {
  const boxContainer = document.createElement("div");
  boxContainer.className = "box-container";

  const boxContent = document.createElement("div");
  boxContent.className = "box-content";

  const orderNumber = document.createElement("h2");
  orderNumber.textContent = `Order No: ${sampleOrder.id}`;
  boxContent.appendChild(orderNumber);

  const orderDetails = document.createElement("div");
  orderDetails.className = "order-details";

  const userDetails = document.createElement("div");
  userDetails.className = "user-details";
  userDetails.innerHTML = `
    <p>Name: ${sampleOrder.name}</p>
    <p>USN: ${sampleOrder.user}</p>
    <p>Description: ${sampleOrder.desc}</p>`;

  orderDetails.appendChild(userDetails);

  const fileContainer = document.createElement("div");
  fileContainer.className = "file-container";
  fileContainer.innerHTML = `
    <p><a href="http://127.0.0.1:5000/download/${sampleOrder.file}" target="__blank" id="fileLink"><img src="../public/file-img.png" alt="File Image" class="file-image"></a></p>`;

  orderDetails.appendChild(fileContainer);

  boxContent.appendChild(orderDetails);

  const confirmationContainer = document.createElement("div");
  confirmationContainer.className = "action-images";
  confirmationContainer.innerHTML = `
    <img src="../public/accept.png" alt="Accept Image" class=action-image accept-order" id="accept-${sampleOrder.id}"> 
    <img src="../public/reject.png" alt="Reject Image" class="action-image reject-order" id="reject-${sampleOrder.id}">`;

  boxContent.appendChild(confirmationContainer);

  boxContainer.appendChild(boxContent);

  document.getElementById("cardContainer").appendChild(boxContainer);

  const acceptMessage = document.querySelector(`#accept-${sampleOrder.id}`);
  const rejectMessage = document.querySelector(`#reject-${sampleOrder.id}`);

  acceptMessage.addEventListener("click", async function() {
    console.log("Accepted");
    await fetch("http://127.0.0.1:5000//update-order-status", {
      method: "POST",
      body: JSON.stringify({
        order_id: sampleOrder.id,
        order_status: "COMPLETED",
      }),
    });
    location.reload();
  });

  rejectMessage.addEventListener("click", async function() {
    console.log("Rejected");
    await fetch("http://127.0.0.1:5000//update-order-status", {
      method: "POST",
      body: JSON.stringify({
        order_id: sampleOrder.id,
        order_status: "REJECTED",
      }),
    });
    location.reload();
  });
}
