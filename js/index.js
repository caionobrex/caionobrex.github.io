const mobileNav = document.querySelector('.mobile-nav');
const body = document.querySelector('body');
const form = document.querySelector('form');

// Open the mobileNav
document.querySelector('#mobile-menu-btn').onclick = () => {
	body.style.overflow = 'hidden';
	mobileNav.style.left = '0%';
};

// Close the mobileNav
document.querySelector('.mobile-nav__close-btn').onclick = () => {
	body.style.overflow = 'auto';
	mobileNav.style.left = '-86%';
};

form.onsubmit = (event) => { // Handle the submit event.
	event.preventDefault();

	return toast({
		title: 'This email system is not not working yet.',
		body: 'Please feel free to contact me on my social medias',
		status: 'error',
		duration: 3000
	})

	const nameInput = document.querySelector('#input_name');
	const emailInput = document.querySelector('#input_email');
	const messageInput = document.querySelector('#input_message');
	const submitButton = document.querySelector('#submit-btn');
	const submitSpinner = document.querySelector('#submit-spinner');
	const errorList = document.querySelector('#error-list');
	const formData = new FormData();

	try {
		validateInputs(nameInput, emailInput, messageInput);
	} catch (errors) {
		return displayErrors(errorList, errors);
	}

	errorList.classList.add('hide');
	submitButton.classList.add('hide');
	submitSpinner.classList.remove('hide');
	formData.append('name', nameInput.value);
	formData.append('email', emailInput.value);
	formData.append('message', messageInput.value);

	fetch('/', { method: 'POST', body: formData })
	.then(res => {
		if (res.status === 200) {
			submitButton.classList.remove('hide');
			submitSpinner.classList.add('hide');
			nameInput.value = '';
			emailInput.value = '';
			messageInput.value = '';
			toast({
				title: 'Email enviado com sucesso.',
				body: 'Muito obrigado por enviar esse email. Entrarei em contato com você o mais rápido possivel.',
				duration: 3000
			});
		}
	});
};

function validateInputs(nameInput, emailInput, messageInput) { 
	const errors = [];
	if (!nameInput.value || nameInput.length === 0) errors.push('Campo nome obrigatorio.');
	if (!emailInput.value || emailInput.length === 0) errors.push('Campo email obrigatorio.');
	if (!messageInput.value || messageInput.length === 0) errors.push('Campo mensagem obrigatorio.');
	if (errors.length > 0) throw errors;
}

function displayErrors(errorList, errors) {
	while (errorList.children.length > 0) { // Clear the errors
		const childIndex = errorList.children.length -1;
		errorList.removeChild(errorList.children[childIndex]);
	}

	errorList.classList.remove('hide');
	errors.forEach((err) => { // Show the errors
		const li = document.createElement('li');
		li.innerHTML = err;
		errorList.appendChild(li);
	});
	toast({
		title: 'Campos Inválidos',
		body: 'Os campos estão inválidos.',
		status: 'error',
		duration: 2000
	});
}