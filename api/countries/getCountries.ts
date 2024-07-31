import axios from 'axios'
import type { iCountries } from '~/types/countries/countries'

export const getCountriesFlag = async () => {
  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all')

    const countries: iCountries[] = data.map(item => {
      return {
        countryFullName: item.name.common,
        countryShortName: item.cca2,
        countryFlag: {
          url: item.flags.png,
          alt: item.flags.alt,
        },
      }
    })

    return countries
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
