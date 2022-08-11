export default function decorate(block) {
  const hr = document.createElement('hr');
  const parent = block.parentNode;

  hr.classList.add('separator');
  parent.textContent = '';
  parent.append(hr);
}
