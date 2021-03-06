const Djs = require('discord.js');
const { load } = require('cheerio');
const number = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣'];

module.exports = {
    name: "lyrics",
    aliases: ["ly"],
    category: "Music",
    description: "Search Lyrics",
    usage: "[lirics <title>]",
    run: async (client, message, args) => {
	if(!args.length) return args.missing(message, 'No query provided', this.help);
	try{
		const embed = new Djs.MessageEmbed()
		embed.setColor('#00D2FF');
		const { body } = await client.snek.get('https://api.genius.com/search')
		.query({ q: args.join('+') })
		.set('Authorization', `Bearer ${process.env.GENIUS_API}`);
		if(!body.response.hits.length) return message.channel.send('🚫 No result found');
		const result = body.response.hits.splice(0, 5);
		const thisMess = await message.channel.send(embed.setDescription(result.map((x, i) => `${number[i]}[${x.result.full_title}](${x.result.url})`).join('\n')));
		for(let i = 0; i < result.length; i++){
			await thisMess.react(number[i]);
		}
		const filter = (rect, usr) => number.includes(rect.emoji.name) && usr.id === message.author.id
		const response = await thisMess.awaitReactions(filter, {
			max: 1,
			time: 15000
		});
		if(!response.size){
			return thisMess.edit('you took to long to reply!', {});
		}
		const choice = number.indexOf(response.first().emoji.name);
		const { text } = await client.snek.get(result[choice].result.url);
		embed.setTitle(result[choice].result.full_title);
		embed.setURL(result[choice].result.url);
		embed.setThumbnail(result[choice].result.header_image_thumbnail_url);
		embed.setDescription(load(text)('.lyrics').text().trim())
		return message.channel.send(embed);
	}catch(e){
		return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}
}