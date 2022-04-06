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

// TODO:  COMPARISON FUNCTION
const comparison = async () => {
  let deals = []
  let prices = []
  let games = await fetchGames().then(data => data)
  games.map(item => {
    deals.push(item.deals)
  })
  console.log(deals[3][4].price);
  minValue(deals[3][4])
  
  for (let i = 0; i < deals.length; i++) {
    for (let j = 0; j < deals[i].length; j++) {
      
    }
  }
}

const minValue = (arr) => {
  return Math.min(arr)
}


// SALE RATIO CALCULATION FUNCTION
const percentage = (retailPrice,salePrice) => {
  if(retailPrice,salePrice === Number && retailPrice,salePrice !== 0 && retailPrice,salePrice !== undefined && retailPrice > salePrice) {
    return (retailPrice - salePrice) / retailPrice * 100
  } else {
    throw new Error('Check The Given Parameters')
  }
}


// TODO:  RENDER FUNCTION
const template = (thumb,name,cheapestPrice,retailPrice,saleRatio) => {
    return `
    <div class="card">
      <figure>
          <img src="${thumb}" alt="${name}">
      </figure>
      <div class="card-content">
        <h3>
          ${name}
        </h3>
        <p>
            ${saleRatio}
        </p>
        <div class="card-action">
            <div class="price">
                <span>
                  $${cheapestPrice === undefined ? retailPrice : cheapestPrice}
                </span>
                <span>
                  <del>
                    ${cheapestPrice === undefined ? '' : '$' + retailPrice}
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