const axios = require('axios'); 
const cheerio = require('cheerio');

axios.get('https://resultados.as.com/resultados/futbol/primera/equipos/')
.then(({ data }) => { const $ = cheerio.load(data);

const escudoEquipo = $('.escudo').map((_, equipo) => { 
				const $equipo = $(equipo); 
				return $equipo.text() 
			}).toArray(); 
		console.log(escudoEquipo) 
	});