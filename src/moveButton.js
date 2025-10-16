const decalSize = 4;

document.addEventListener('mousemove', evt => {
	if (evt.target.dataset.sms) { return; }
	const block = evt.target.closest('.joplin-editable');
	if (!block) { return; };
	const button = block.querySelector('.sisCode-button');

	if (!button) { return; };
	if (['relative', 'absolute'].indexOf(block.style.position) === -1) { block.style.position = 'relative'; }

	const rect = block.getBoundingClientRect();
	const btnHeight = button.offsetHeight || 20;
	const top = Math.max(decalSize, Math.min(evt.clientY - rect.top - btnHeight / 2, rect.height - btnHeight - decalSize));

	button.style.position = 'absolute';
	button.style.left = `${rect.width - button.offsetWidth - decalSize}px`;
	button.style.top = `${top}px`;
});