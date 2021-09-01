const validation = document.getElementById('valid');
const number = document.getElementById('number');
const container = document.getElementById('book-container');
const textField = document.getElementById('input');

const loadData = () => {
	const textField = document.getElementById('input');
	const input = textField.value;
	//const input = document.getElementById('input').value;
	//console.log(input);
	if (input === '') {
		validation.innerHTML = '<h6 class="text-center text-danger">Please Enter Book Name</h6>';
		container.textContent = '';
		number.innerText = '';
	} else {
		fetch(`http://openlibrary.org/search.json?q=${input}`).then((res) => res.json()).then((data) => {
			if (data.numFound === 0) {
				validation.innerHTML = '<h6 class="text-center text-danger">No Data Found</h6>';
				container.textContent = '';
				number.innerText = '';
				textField.value = '';
			} else {
				validation.innerText = '';
				display(data);
			}
		});
	}
};

const display = (books) => {
	const datas = books.docs;
	container.textContent = '';
	number.innerHTML = `
      <h6>Result Found: ${books.numFound}</h6>
      `;

	//loop using ForEach

	datas.forEach((book) => {
		const div = document.createElement('div');
		div.classList.add('col');
		div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid card-img-top" alt="...">
                <div class="card-body">
                  <h2 class="card-title">${book.title}</h2>
                  <h6 class="text-danger">Author : ${book.author_name}</h6>
                  <h6 class="text-warning">Publisher : ${book.publisher}</h6>
                  <h6 class="text-primary">First Publication Year : ${book.first_publish_year}</h6>
                </div>
              </div>
            `;
		container.appendChild(div);
		textField.value = '';
	});
};
