const Djs = require('discord.js');
const prefix = ("rens!");
const translate = require('google-translate-api');
const Langs = ['afrikaans','albanian','amharic','arabic','armenian','azerbaijani','bangla','basque','belarusian','bengali','bosnian','bulgarian','burmese','catalan','cebuano','chichewa','chinese simplified','chinese traditional','corsican','croatian','czech','danish','dutch','english','esperanto','estonian','filipino','finnish','french','frisian','galician','georgian','german','greek','gujarati','haitian creole','hausa','hawaiian','hebrew','hindi','hmong','hungarian','icelandic','igbo','indonesian','irish','italian','japanese','javanese','kannada','kazakh','khmer','korean','kurdish (kurmanji)','kyrgyz','lao','latin','latvian','lithuanian','luxembourgish','macedonian','malagasy','malay','malayalam','maltese','maori','marathi','mongolian','myanmar (burmese)','nepali','norwegian','nyanja','pashto','persian','polish','portugese','punjabi','romanian','russian','samoan','scottish gaelic','serbian','sesotho','shona','sindhi','sinhala','slovak','slovenian','somali','spanish','sundanese','swahili','swedish','tajik','tamil','telugu','thai','turkish','ukrainian','urdu','uzbek','vietnamese','welsh','xhosa','yiddish','yoruba','zulu'];

module.exports = {
    name: "translate",
    aliases: [],
    category: "Information",
    description: "Translate with order langgue",
    usage: "[tanslate]",
    run: async (client, message, args) => {

  if (args[0] === undefined) {

    const embed = new Djs.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("Usage: `h!translate <language> <text>`");

    return message.channel.send(embed);

  } else {

    if (args[1] === undefined) {

      return message.channel.send('**Please give me something to translate.** `* <language> <text>`');

    } else {

      let transArg = args[0].toLowerCase();

      args = args.join(' ').slice(prefix.length);
      let translation;

      if (!Langs.includes(transArg)) return message.channel.send(`**Language not found.**`);
      args = args.slice(transArg.length);

      translate(args, {to: transArg}).then(res => {

        const embed = new Djs.MessageEmbed()
        .setDescription(res.text)
        .setFooter(`english -> ${transArg}`)
        .setColor(`RANDOM`);
        return message.channel.send(embed);

      });

    }

  }

}
}