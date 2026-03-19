const config = require('../config');

module.exports = {
    getEspnData: async function() {
        const res = await fetch(config.espnApiUrl);

        const body = await res.json();

        var entries = body.entries;

        var formattedEntries = entries.map(x => {
            return {
                name: x.member.displayName,
                bracketName: x.name,
                score: x.score.overallScore,// + Math.ceil((Math.floor(Math.random() * 100)) / 10 ) * 10,
                bracketId: x.id,
                bracketUrl: `${config.espnBaseWebUrl}bracket?id=${x.id}`
            };
        });

        return formattedEntries;
    }
}