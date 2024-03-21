const axios = require('axios').default;
const fs = require('fs');
const readline = require('readline');
const colors = require('colors');

const text = `
                            /$$$$$$ /$$   /$$/$$$$$$$ /$$$$$$$ /$$     /$$
                            /$$__  $| $$  | $| $$__  $| $$__  $|  $$   /$$/
                            | $$  \__| $$  | $| $$  \ $| $$  \ $$\  $$ /$$/ 
                            |  $$$$$$| $$  | $| $$  | $| $$$$$$$/ \  $$$$/  
                            \____  $| $$  | $| $$  | $| $$__  $$  \  $$/   
                            /$$  \ $| $$  | $| $$  | $| $$  \ $$   | $$    
                           |  $$$$$$|  $$$$$$| $$$$$$$| $$  | $$   | $$    
                            \______/ \______/|_______/|__/  |__/   |__/    
                                               
`;

console.log(colors.yellow(text));
console.log(colors.yellow("                                           FIVEM SCRAPER\n"));
console.log(colors.yellow("                                   https://github.com/SudryDevv"));
console.log("\n");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Entrez l\'ID CFX du serveur : ', (name) => {
    const fivem_api = `https://servers-frontend.fivem.net/api/servers/single/${name}`
    axios.get(fivem_api, {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        }
    })
    .then((response) => {
        fs.writeFileSync(`${response.data.Data.vars.sv_projectDesc}.txt`, JSON.stringify(response.data.Data.players))
        console.log(colors.yellow(`Le contenu du serveur à bien été enregistré : ${response.data.Data.vars.sv_projectDesc}.txt`))
    })
    .catch((error) => {
        console.log("Le serveur n'a pas été trouvé.")
    })
    .finally(() => {
        rl.close();
    });
});