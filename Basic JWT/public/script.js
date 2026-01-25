
x = "hello world";
console.log(x);
const getNumberButton = document.getElementById("number-getter");
const loginForm = document.getElementById("login-form");
const tokenText = document.getElementById("token-text");
const welcomeText = document.getElementById("welcome-text");
const secretCode = document.getElementById("secret-code");
let token = null;

getNumberButton.addEventListener("click", async () => {
	const auth = "Bearer " + token;
	try {
		const response = await fetch('/api/v1/dashboard', {
			method: 'GET',
			headers: { "Authorization": auth }
		})
		const result = await response.json();
		if (!response.ok) {
			console.log(result.msg);
			return;
		}

		welcomeText.innerText = result.msg;
		secretCode.innerText = result.secret;
	} catch (error) {
		console.log(error)

	}
}
)

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const payload = {
		username: loginForm.username.value,
		password: loginForm.password.value,
	}
	if (payload.username === "" && payload.password === "") {
		token = "";
		tokenText.innerText = token;
	}
	const result = await postJson('/api/v1/login', token, payload);

	if (!result.ok) {
		console.error("Login failed", result.error);
		if (result.status === 401) {
			alert("Invalid username or password");
		} else (
			alert("Something went wrong. Try again.")
		)
		return;
	}
	console.log(result);
	token = result.data.token;
	tokenText.innerText = token;
})



async function postJson(url, token, payload) {

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Authorization": token,
				"Content-Type": "application/json",
				"accept": "application/json"
			},
			body: JSON.stringify(payload)
		})
		let data = null;
		const contentType = response.headers.get("Content-Type");

		if (contentType && contentType.includes("application/json")) {
			data = await response.json();
		}
		else {
			data = await response.text();
		}

		if (!response.ok) {
			return {
				ok: false,
				status: response.status,
				error: data?.msg || data || "Request failed"
			}
		}
		return {
			ok: true,
			status: response.status,
			data
		}

	} catch (error) {

		return {
			ok: false,
			status: null,
			error: "Network error or unreachable server"
		}
	}
}
