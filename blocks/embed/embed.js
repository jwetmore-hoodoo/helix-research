export default function decorate(block) {
  const url = block.textContent.trim();

  fetch('../../node_modules/oembed-providers/providers.json')
    .then((response) => response.json())
    .then((providers) => {
      let foundScheme;
      providers.forEach((provider) => {
        const matchingEndpoints = provider?.endpoints?.find((endpoint) => {
          return endpoint?.schemes?.find((scheme) => {
            const regex = new RegExp(`${scheme.replaceAll('*', '.*')}`, 'g');

            return regex.test(url);
          });
        });

        if (matchingEndpoints) foundScheme = matchingEndpoints;
      });

      if (!foundScheme?.url) return;

      const schemeEndpoint = new URL(foundScheme.url.replace('{format}', 'json')).toString();
      const params = new URLSearchParams({ url }).toString();

      fetch(`${schemeEndpoint}?${params}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.html) {
            if (data.type === 'video' && data.height && data.width) {
              block.style.height = '0';
              block.style.paddingTop = `${(data.height / data.width) * 100}%`;
            }

            block.textContent = '';
            block.innerHTML = data.html;
          }
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}
