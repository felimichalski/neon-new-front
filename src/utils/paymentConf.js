export const customization = {
    paymentMethods: {
        ticket: "all",
        creditCard: "all",
        debitCard: "all",
        mercadoPago: "all",
    },
};
export const onSubmit = async (
    { selectedPaymentMethod, formData }
) => {
    // callback called when clicking the submit data button
    // return new Promise((resolve, reject) => {
    //     fetch("/process_payment", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(formData),
    //     })
    //         .then((response) => response.json())
    //         .then(() => {
    //             // receive payment result
    //             resolve();
    //         })
    //         .catch((error) => {
    //             // handle error response when trying to create payment
    //             reject();
    //         });
    // });
};
export const onError = async (error) => {
    // callback called for all Brick error cases
    console.log(error);
};