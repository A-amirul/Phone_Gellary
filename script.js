const loadPhones = async (searchText, dataLimit) => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
	const res = await fetch(url);
	const data = await res.json();
	displayPhones(data.data, dataLimit); //14 no step e ese 1,6,19 no line e datalimit add kore dibo
}

const displayPhones = (phones, dataLimit) => {

	//1. create container to store data
	const phoneContainer = document.getElementById('phone-container');
	// console.log(phones);
	//6. ager search result clear korte hbe
	phoneContainer.textContent = '';

	//7. display 10 phones only
	const showAll = document.getElementById('show-all');

	if (dataLimit && phones.length > 9) {
		phones = phones.slice(0, 9);

		// 12. show all data
		showAll.classList.remove('d-none');
	}
	else {
		showAll.classList.add('d-none');
	}

	//8. jodi kono phone search diye khuje na powa jai
	const noPhone = document.getElementById('no-phone-found');
	if (phones.length === 0) {
		noPhone.classList.remove('d-none');
	}
	else {
		noPhone.classList.add('d-none');
	}

	//2. protita phone k alada korbo
	phones.forEach(phone => {
		// console.log(phone.image);

		//3. container er modhe col name ekta div create korbo and col div e dynamic data rakhbo
		const phoneDiv = document.createElement('div');
		phoneDiv.classList.add('col');
		phoneDiv.innerHTML = `

		<div class="card h-100 p-5">
					<img src="${phone.image}" class="card-img-top" alt="...">
						<div class="card-body">
							<h5 class="card-title">${phone.phone_name}</h5>
							<p class="card-text">This is a longer card with supporting text below as a natural lead-in
								to additional
								content. This content is a little bit longer.</p>

				              <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal ">Show Details</button>

						</div>
					</div>
		
		`
		// 4. child gulo k append korbo
		phoneContainer.appendChild(phoneDiv);
	});

	// 11. stop loader/spinner
	toggleSpinner(false);

}

const processSearch = (dataLimit) => {
	toggleSpinner(true);
	const searchField = document.getElementById('search-field');
	const searchText = searchField.value;
	loadPhones(searchText, dataLimit);
}

// 5. search korar jonno uporer link ta dynamic kore nite hbe.tarpor btn e event listener add korte hbe
document.getElementById('btn-search').addEventListener('click', function () {
	processSearch(9);
	//10. start loader/spinner
	// toggleSpinner(true);
	// // baki ta 5no step
	// const searchField = document.getElementById('search-field');
	// const searchText = searchField.value;
	// loadPhones(searchText);
});

//search input field enter key handeler
document.getElementById('search-field').addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		processSearch(9);
	}
});

// 9. spinnere/loader toggle
const toggleSpinner = isLoading => {
	const loaderSection = document.getElementById('loader');
	if (isLoading) {
		loaderSection.classList.remove('d-none');
	}
	else {
		loaderSection.classList.add('d-none');
	}

}

// 13. not the best way to sow all
document.getElementById('btn-show-all').addEventListener('click', function () {
	processSearch();
})

// 15. show phone details on the modal
const loadPhoneDetails = async id => {
	const url = `https://openapi.programming-hero.com/api/phone/${id}`;
	const res = await fetch(url);
	const data = await res.json(url);
	displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
	console.log(phone);

	const modalTitle = document.getElementById('phoneDetailModalLabel');
	modalTitle.innerText = phone.name;

	const phoneDetails = document.getElementById('phone-details');
	phoneDetails.innerHTML = `
	   <img class="m-5" src="${phone.image}">
	  <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No realease date found' }</p>
	  <p>Main Features: Display: ${phone.mainFeatures.displaySize} </p>
	  <p>Storage: ${phone.mainFeatures.storage} </p>
	  <p>Memory: ${phone.mainFeatures.memory} </p>
	  <h5>Brand: ${phone.brand}</h5>
	`
}
// loadPhones('apple');