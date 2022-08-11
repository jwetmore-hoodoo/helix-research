export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row, rowKey) => {
    const cells = [...row.children];

    row.classList.add('accordion-row');

    cells.forEach((cell, key) => {
      const button = document.createElement('button');

      if (key === 0) {
        button.addEventListener('click', (event) => {
          block?.querySelector('[aria-expanded="true"]')?.setAttribute('aria-expanded', false);
          event.target.setAttribute('aria-expanded', true);
          row.classList.toggle('shown');
        });
        button.classList.add('accordion-title');
        button.innerText = cell.innerText;
        button.setAttribute('aria-controls', `accordion-${rowKey}-body`);
        button.setAttribute('aria-expanded', false);
        button.setAttribute('type', 'button');

        cell.setAttribute('id', `accordion-${rowKey}-title`);
        cell.textContent = '';
        cell.append(button);
      } else {
        cell.setAttribute('aria-labelledby', `accordion-${rowKey}-title`);
        cell.setAttribute('id', `accordion-${rowKey}-body`);
        cell.classList.add('accordion-body');
      }
    });
  });
}
