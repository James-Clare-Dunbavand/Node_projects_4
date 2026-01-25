
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
let token = "";

try {

	registerForm.addEventListener("submit", async (e) => {

		e.preventDefault();

		try {

			const response = await fetch('/api/v1/auth/register', {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: registerForm.username.value,
					email: registerForm.email.value,
					password: registerForm.password.value
				})
			})
			const json = await response.json();
			if (!response.ok) {
				console.log(json);
			}
			else {

				alert("User created")
				console.log("User created");
			}
		} catch (error) {

			console.log(error);
		}

	})

} catch (error) {
	console.log(error);

}


loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	try {

		const response = await fetch('/api/v1/auth/login', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: loginForm.email.value,
				password: loginForm.password.value
			})
		})
		const json = await response.json();
		console.log("json");
		if (!response.ok) {
			console.log(json);
		}
		else {


			console.log("redirect");
			window.location.href = "/dashboard.html";
		}
	} catch (error) {

		console.log(error);
	}

})
