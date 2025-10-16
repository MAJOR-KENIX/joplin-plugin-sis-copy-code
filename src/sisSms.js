function showCopyFeedback(buttonElement, success) {
	if (success) {
		buttonElement.classList.add('onSuccess');
		buttonElement.classList.remove('onError');
	} else {
		buttonElement.classList.add('onError');
		buttonElement.classList.remove('onSuccess');
	}
	setTimeout(() => { buttonElement.classList.remove('onSuccess', 'onError'); }, 64);
}

document.addEventListener('click', async (evt) => {
	const copyBtn = evt.target.closest('.sis-sms');
	if (!copyBtn) { return; };
	evt.preventDefault();

	const pluginId = copyBtn.dataset.pluginId;
	const sms = copyBtn.dataset.sms || copyBtn.closest('.joplin-editable')?.querySelector('.joplin-source')?.textContent || '';

	if (!sms) {
		showCopyFeedback(copyBtn, false);
		return;
	}

	try {
		if (typeof webviewApi !== 'undefined' && webviewApi.postMessage) {
			await webviewApi.postMessage(pluginId, sms);
			showCopyFeedback(copyBtn, true);
		}
		else { throw new Error('webviewApi not available'); }
	} catch (e) {
		try {
			await navigator.clipboard.writeText(sms);
			showCopyFeedback(copyBtn, true);
		}
		catch (err) { showCopyFeedback(copyBtn, false); }
	}
});