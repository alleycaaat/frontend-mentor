export const getCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,subregion,capital,flags,cca3,continents,tld,currencies,languages,borders');
        const data = await response.json();
        let arr = [];

        data.map(country => {
            arr.push({
                name: country.name.common,
                native: country.name,
                flag: country.flags.svg,
                alt: country.flags.alt,
                capital: country.capital?.toString(),
                region: country.region,
                population: country.population,
                borders: country.borders,
                abrv: country.cca3,
                subregion: country.subregion,
                domain: country.tld?.toString(),
                currency: country.currencies,
                languages: country.languages,
            });
            return arr;
        });
        return arr;
    }
    catch (error) {
        console.log('country error:', error);
        //if there's an error, use the data.json file as a backup and put an alert on screen to let user know information may not be up to date
    }
};