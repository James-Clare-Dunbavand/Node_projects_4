
const productsSection = document.getElementById("products");
const productForm = document.querySelector("form");
const fileUpload = document.querySelector("#file-upload");
const getAllProductsButton = document.getElementById("getAllProducts");
console.log(productForm);
let path = "my path";


productForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const payload = { name: productForm.name.value, price: Number(productForm.price.value), image: path }
	// const payload = { name: "a name", price: 100, image: "my image" }

	try {
		const response = await fetch("/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)

		})
		const data = await response.json();
		console.log(data);
		getAllProducts();
	} catch (err) {
		console.log(err);
	}

})

fileUpload.addEventListener("change", async () => {

	const file = fileUpload.files[0];
	const formData = new FormData;
	formData.append("image", file);

	try {
		const response = await fetch("/upload", {
			method: "POST",
			body: formData
		})
		const data = await response.json();
		path = data.image.src;
	} catch (error) {
		console.log(error)
	}
})


const getAllProducts = async () => {
	try {

		const response = await fetch("/products", {
			method: "GET"
		});
		console.log(response);

		const data = await response.json();
		console.log(data);

		productsSection.innerHTML = "";
		data.products.forEach(element => {
			const prod = document.createElement("article");
			prod.innerHTML = `
		<p class="item-name">${element.name} </p>
		<p class="price">${element.price} </p>
		<img src=${element.image} alt="item-image">
	`;
			prod.classList.add("product");
			productsSection.append(prod);
		});
	} catch (error) {
		console.log(error)

	}

}
getAllProducts();

