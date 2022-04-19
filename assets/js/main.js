const api = 'https://www.cheapshark.com/api/1.0/games'
const queryID = '?id='
const querySearch = '?title=' + 'batman'
const apiUrl = api + querySearch + '&exact=0' + '&onSale=1'

// FETCH API UTILITY
const getJson = u => fetch(u).then(r => r.json())

// FETCH FUNCTION
const fetchGames = async () => {
  try {
    const data = await getJson(apiUrl)
    const deals = data.map(item => getJson(api + queryID + item.gameID))
    return Promise.all(deals)
  } catch (error) {
    throw new Error(error)
  }
}

// PROVIDER FUNCTION
const provider = async () => {
  const games = await fetchGames().then(data => data)
  let deals = []
  let prices = []
  let retailPrices = []
  let thumbs = []
  let titles = []

  games.map(item => {deals.push(item.deals)})

  for (let i = 0; i < deals.length; i++) {
    prices.push(deals[i][0].price)
    retailPrices.push(deals[i][0].retailPrice)
  }

  for (let i = 0; i < games.length; i++) {
    thumbs.push(games[i].info.thumb)
    titles.push(games[i].info.title)
  }

  return [
    prices,
    retailPrices,
    thumbs,
    titles
  ]
}

// SALE RATIO CALCULATION FUNCTION
const percentage = (retailPrice,salePrice) => {
  if(retailPrice,salePrice != 0 && retailPrice,salePrice !== undefined) {
    let result = (retailPrice - salePrice) / retailPrice * 100
    return result.toFixed(0)
  } else {
    throw new Error('Check The Given Parameters')
  }
}

// RENDER FUNCTION
const renderer = async () => {
  const data = await provider().then(resp => resp)
  let wrapper = document.querySelector('.cards-wrapper')
  
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      wrapper.innerHTML += template(data[2][j],data[3][j],data[0][j],data[1][j])
    }
  }
}

// TEMPLATE FUNCTION
const template = (thumb,title,price,retailPrice) => {
   return `
     <div class="card">
       <figure>
           <img src="${thumb}" alt="${title}">
       </figure>
       <div class="card-content">
         <h3>
           ${title}
         </h3>
         <p>
            %${percentage(retailPrice,price)}
         </p>
         <div class="card-action">
             <div class="price">
                 <span>
                   $${price}
                 </span>
                 <span>
                   <del>
                     ${retailPrice}
                   </del>
                 </span>
             </div>
             <div class="action-btn">
                 <button>ORDER</button>
             </div>
         </div>
       </div>
     </div>
   `
}

renderer()