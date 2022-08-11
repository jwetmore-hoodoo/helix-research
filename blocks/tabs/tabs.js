export default function decorate(block) {
  /* change to ul, li */
  const list = document.createElement('ul');
  const content = document.createElement('div');

  [...block.children].forEach((row, key) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    const [title, body] = row.children;

    button.innerText = title.innerText;
    button.classList.add('tabs-title');
    button.setAttribute('aria-controls', `tab-${key}-pane`);
    button.setAttribute('aria-selected', key === 0);
    button.setAttribute('id', `tab-${key}`);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', (event) => {
      const tab = event.target;
      const id = tab.getAttribute('aria-controls');
      const pane = block.querySelector(`#${id}`);

      block?.querySelector('[aria-selected="true"]')?.setAttribute('aria-selected', false);
      tab.setAttribute('aria-selected', 'true');

      block?.querySelector('.shown')?.classList.remove('shown');
      pane?.classList.add('shown');
    });
    item.append(button);

    item.setAttribute('role', 'presentation');
    list.append(item);

    body.classList.add('tabs-pane');

    if (key === 0) {
      body.classList.add('shown');
    }

    body.setAttribute('aria-labeledby', `tab-${key}`);
    body.setAttribute('id', `tab-${key}-pane`);
    body.setAttribute('role', 'tabpanel');
    body.setAttribute('tabindex', '0');
    content.append(body);
  });

  block.textContent = '';

  list.classList.add('tabs-list');
  list.setAttribute('role', 'tablist');
  block.append(list);

  content.classList.add('tabs-content');
  block.append(content);
}
