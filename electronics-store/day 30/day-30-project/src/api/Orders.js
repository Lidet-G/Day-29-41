export async function placeOrder(form) {
  await new Promise(resolve =>
    setTimeout(resolve, 1000)
  );

  if (form.phone === "0911111111") {
    const error = new Error("Could not place the order");

    error.status = 422;

    error.fieldErrors = {
      phone: "That number is not registered with TeleBirr"
    };

    throw error;
  }

  return {
    id: Date.now()
  };
}