const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
  const res = await fetch('../data/my.json')
  const datas = await res.json()
  
  // get matches with current text input
  let matches = datas.filter( data => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return data.admin.match(regex) || data.city.match(regex);
  });

  if(searchText.length === 0){
    matches = [];
    matchList.innerHTML = '';
  }
  
  outputHtml(matches)

}

// render to html
const outputHtml = matches => {
  if(matches.length > 0){
    const html = matches.map(match => `
      <div class="card card-body mb-1">
        <h4>(${match.admin}) <span class="text-primary">${match.city}</span></h4>
        <small>Population: ${match.population} Lat: ${match.lat} / Long: ${match.long}</small>
      </div>
    `)
    .join('')
    

    matchList.innerHTML = html;
  }
}


search.addEventListener('input', () => searchStates(search.value));






