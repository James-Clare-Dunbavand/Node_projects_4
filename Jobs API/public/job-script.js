const jobLog = document.getElementById("job-log");
const jobsList = document.getElementById("jobs");
const createJobButton = document.getElementById("create-job");
const openJobForm = document.getElementById("open-job-form");
const jobForm = document.getElementById("new-job-form");
const modifyJobForm = document.getElementById("modify-job-form");
const searchJobForm = document.getElementById("search-job-form");
const openSearchForm = document.getElementById("open-job-search-form");
let modifyId = "";

getAllJobs();

openJobForm.addEventListener("click", () => {

	jobForm.classList.toggle("hidden");

})

openSearchForm.addEventListener("click", () => {
	searchJobForm.classList.toggle("hidden");
})

searchJobForm.addEventListener("submit", (e) => {
	e.preventDefault();
	removeJobsFromDisplay();
	const searchProperties = ["company", "position", "status"];
	const query = searchProperties.map((property) => {
		if (property != "") {
			return `${property}=${searchJobForm[property].value}`;
		}
	}).join("&");

	getAllJobs(query);
	searchJobForm.classList.toggle("hidden");
})

jobForm.addEventListener("submit", (e) => {
	e.preventDefault();

	createJob(jobForm.company.value, jobForm.position.value, jobForm.status.value);
	jobForm.classList.toggle("hidden");
	jobForm.reset();
})

modifyJobForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const form = e.target;

	modifyJob(form.company.value, form.position.value, form.status.value);
	modifyJobForm.classList.toggle("hidden");
	modifyJobForm.reset();

})



async function createJob(company, position, status) {
	try {
		const payload = {}
		if (status != "") {
			payload.status = status;
		}
		payload.company = company;
		payload.position = position;
		const response = await fetch("/api/v1/jobs", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		})
		const data = await response.json();
		if (!response.ok) {
			console.log(data);
		}
		else {
			removeJobsFromDisplay();
			getAllJobs();
		}
	}
	catch (error) {
		console.log(error);
	}

}
function removeJobsFromDisplay() {
	while (jobsList.firstChild) {
		jobsList.removeChild(jobsList.firstChild);
	}
}

async function getAllJobs(query) {
	query = query ? "?" + query : "";
	try {
		const response = await fetch(`/api/v1/jobs${query}`, {
			method: "GET",
			credentials: "include"
		});
		const data = await response.json();
		if (!response.ok) {
			console.log(data);
		}
		else {
			data.jobs.forEach(job => {
				displayJob(job);
			});
			jobLog.innerText = Object.keys(data.jobs);
			console.log(data);
		}
	} catch (error) {

	}
}
function displayJob(job) {

	const newJob = document.createElement("article");
	newJob.classList.add("job");
	newJob.innerHTML =
		`<div class="company job-info">
		${job.company}
		</div>
		<div class="position job-info">
		${job.position}
		</div>
		<div class="status job-info">
		${job.status}
		</div>`;

	const modifyButton = document.createElement("button");
	modifyButton.value = job._id;
	modifyButton.innerText = "|||";
	newJob.appendChild(modifyButton);
	modifyButton.addEventListener("click", (e) => {
		modifyId = e.target.value;
		modifyJobForm.classList.toggle("hidden");
		updateModifyJobForm(e.target.parentElement);
	})
	const deleteButton = document.createElement("button");
	deleteButton.value = job._id;
	newJob.appendChild(deleteButton);
	deleteButton.innerText = "X";
	deleteButton.addEventListener("click", (e) => {
		deleteJob(e.target);
	})
	jobsList.appendChild(newJob);
}
async function modifyJob(company, position, status) {
	try {
		const response = await fetch(`/api/v1/jobs/${modifyId}`, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				company: company,
				position: position,
				status: status
			})
		})
		const data = await response.json();
		if (!response.ok) {
			console.log(data);
		}
		else {
			removeJobsFromDisplay();
			getAllJobs();

		}
	}
	catch (error) {
		console.log(error);
	}
}
function updateModifyJobForm(job) {
	console.log(job);
	modifyJobForm.company.value = job.children[0].innerText;
	modifyJobForm.position.value = job.children[1].innerText;
	modifyJobForm.status.value = job.children[2].innerText;
}

async function deleteJob(button) {
	const response = await fetch(`/api/v1/jobs/${button.value}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	})
	const data = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	else {
		alert(data.message);
		button.parentNode.parentNode.removeChild(button.parentNode);
	}
}

