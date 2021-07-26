const toastList = document.createElement('ul');
const defaultProps = {
	title: '',
	body: '',
	status: 'success',
	duration: 5000
};

// Setup the container in whitch the toasts will be put into
toastList.classList.add('toast-list');
document.querySelector('body').appendChild(toastList);

const toast = (props = defaultProps) => {
	const toastItem = document.createElement('li');
	const toast = document.createElement('div');
	const toastTitle = document.createElement('span');
	const toastContent = document.createElement('p');
	const toastCloseBtn = document.createElement('i');
	const clearToast = () => {
		setTimeout(() => {
			if (toastList.isHovering) return clearToast();
			toastItem.classList.add('fade');
			setTimeout(() => toastList.removeChild(toastItem), 150);
		}, props.duration || 5000);
	};

	toast.classList.add('toast');
	toast.classList.add(props.status === 'error' ? 'toast--error' : 'toast--success');
	toastTitle.classList.add('toast__title');
	toastContent.classList.add('toast__description');
	toastContent.classList.add(!props.body ? 'hide' : 'show');
	toastCloseBtn.classList.add('toast__close-btn');
	toastCloseBtn.classList.add('material-icons');
	toastTitle.innerHTML = props.title || defaultProps.title;
	toastContent.innerHTML = props.body || defaultProps.body;
	toastCloseBtn.innerHTML = 'close';

	toast.appendChild(toastTitle);
	toast.appendChild(toastContent);
	toast.appendChild(toastCloseBtn);
	toastItem.appendChild(toast);
	toastList.appendChild(toastItem);

	toastList.onmouseenter = () => toastList.isHovering = true;
	toastList.onmouseleave = () => toastList.isHovering = false;
	toastCloseBtn.onclick = () => {
		toastItem.classList.add('fade');
		setTimeout(() => toastList.removeChild(toastItem), 150);
	};

	clearToast();
};