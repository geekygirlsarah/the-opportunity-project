const [paginateProducts, paginator] = require('./filter-cards.js')

const searchField = document.getElementById('search-field')

const dchCheckboxes = document.querySelectorAll('.dch-checkbox input')
const resultsCountDisplay = document.getElementById('results-count')
const resetButton = document.getElementById('dch-reset--geo')

const advancedFilters = {}
let filterCategory = 'all'

document.querySelectorAll('.dch__checkbox-group')
  .forEach(fieldset => {
    advancedFilters[fieldset.name] = []
  })

dchCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      advancedFilters[this.name].push(this.value)
    } else {
      advancedFilters[this.name].splice(
        advancedFilters[this.name].indexOf(this.value), 1)
    }
    filterDatasets()
  })
})

const categoryButtons = document.getElementsByClassName('dch__data-topic')
for (const container of categoryButtons) {
  container.addEventListener('click', e => {
    const selected = document.querySelector('.dch__data-topic.selected')
    if (selected) {
      selected.classList.remove('selected')
    }
    container.classList.add('selected')

    // toggle the description of the challenge below the filters
    const dataCardId = container.id
    filterCategory = dataCardId
    filterDatasets()
  })
}

if (document.getElementById('data-search-form')) {
  document.getElementById('data-search-form').addEventListener('submit', e => {
    e.preventDefault()
    filterDatasets()
  })

  if (searchField) {
    searchField.addEventListener('search', e => {
      if (searchField.value === '') {
        filterDatasets()
      }
    })
  }
}

function filterDatasets () {
  const searchTerm = searchField.value.toLowerCase()
  const datasets = document.getElementsByName('data-set-card')
  const activeAdvanced = Object.values(advancedFilters).filter(filter => filter.length > 0)

  const filteredProducts = []
  for (const card of datasets) {
    if (card.getElementsByTagName('h2')[0]) {
      const dataName = card.getElementsByTagName('h2')[0].innerText
      const dataPS = card.getElementsByClassName('dataset__ps')[0].innerText
      const dataDescription = card.getElementsByTagName('p')[0].innerText
      const searchMatch = dataName.toLowerCase().includes(searchTerm) || dataPS.toLowerCase().includes(searchTerm) || dataDescription.toLowerCase().includes(searchTerm)
      const categoryMatch = dataPS.includes(filterCategory) || filterCategory === 'all'
      if (searchMatch && categoryMatch) {
        // apply advanced filtering
        let passesAdvanced = true
        Object.values(activeAdvanced).forEach(advancedFilter => {
          let hasCategory = false
          for (const filter of advancedFilter) {
            if (dataPS.includes(filter)) {
              hasCategory = true
              break
            }
          }
          if (!hasCategory) {
            passesAdvanced = false
          }
        })
        if (passesAdvanced) {
          card.classList.remove('pc-inactive')
          card.setAttribute('dch-passes-filter', true)
          filteredProducts.push(card)
        } else {
          card.classList.add('pc-inactive')
          card.setAttribute('dch-passes-filter', false)
        }
      } else {
        card.classList.add('pc-inactive')
        card.setAttribute('dch-passes-filter', false)
      }
    }
  }
  const numSetsFound = filteredProducts.length
  const suffix = numSetsFound === 1 ? '' : 's'
  resultsCountDisplay.innerText = `Found ${numSetsFound} dataset${suffix}.`

  paginator.setTotalItems(document.querySelectorAll('.data-set-card:not(.pc-inactive)').length)
  paginator.setCurrPage(0)
  paginateProducts(0, false, filteredProducts)
}

if (document.querySelector('body.page-datakit')) {
  console.log(paginator)
  filterDatasets()
}

/**
 * Add event listener to reset all filters
 * - set category to ALL
 * - uncheck all checkbox filters (if present)
 * - display new filtered data
 */
if (resetButton) {
  resetButton.addEventListener('click', e => {
    console.log('reset clicked')
    filterCategory = 'all'
    Object.keys(advancedFilters).forEach(key => { advancedFilters[key] = [] })
    console.log(advancedFilters)

    // clear category ui
    const categoryInputs = document.getElementsByClassName('dch__data-topic')
    for (const catInput of categoryInputs) {
      catInput.checked = catInput.value === 'all'
    }

    // clear advanced filter ui
    const checkboxes = document.querySelectorAll('.dch-checkbox input')
    for (const box of checkboxes) {
      box.checked = false
    }

    // clear searchbar
    searchField.value = ''

    filterDatasets()
  })
}
