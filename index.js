const config = require('dotenv').config();

const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

var commandBody;
var args;
var command;

client.once('ready', () => {
	console.log('Ready!');
});

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const currency_prefix= process.env.CURRENCY_PREFIX;

client.on("message", function(message) {
  if (message.author.bot) return;
  if(message.content.startsWith(prefix) || message.content.startsWith(currency_prefix)){
    commandBody = message.content.slice(prefix.length);
    args = commandBody.split(' ');
    command = args.shift().toLowerCase();
  }

  if(esUnComando(message)){
    comando(command, message);
  }else if(esUnPedidoDePrecio(message)){
    obtenerPrecio(command, message);
  }else{
    return;
  }

});

function esUnComando(message){
  return message.content.startsWith(prefix);
}

function esUnPedidoDePrecio(message){
  return message.content.startsWith(currency_prefix);
}

function comando(command, message){
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Este mensaje tuvo una latencia de ${timeTaken}ms.`);
  }else if (command === "experto"){
    message.channel.send(`No lo se ${message.author}, parece falso`);
  }
}

async function obtenerPrecio(command, message){
  //message.channel.send(`Usted pidio el precio de ${command}`);

  let data= await CoinGeckoClient.coins.list();
  
  let coins= data.data;

  for (var i = 0; i < coins.length; i++) {
    if(coins[i].symbol === command ){
      let id= coins[i].id;
      
      let fullInfo = await CoinGeckoClient.coins.fetch(id, {tickers: false, community_data: false, developer_data : false, localization: false, sparkline: false});
      let tokenName = fullInfo.data.name;
      let price = fullInfo.data.market_data.current_price.usd;
      let logo= fullInfo.data.image.small;
      let ath= fullInfo.data.market_data.ath.usd;
      let percentageChange24H= fullInfo.data.market_data.price_change_percentage_24h;
      let percentageChange7D= fullInfo.data.market_data.price_change_percentage_7D;
      let minPrice24H= fullInfo.data.market_data.high_24h.usd;
      let maxPrice24H= fullInfo.data.market_data.low_24h.usd;
      
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(tokenName)
        .setAuthor('El pelado de las cripto', 'https://resizer.glanacion.com/resizer/xwksLfKOLbhzqo-olQpo9NmropA=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/UP3PWPDXJNBBFIE5EHC5WJG4AY.jpg')
        .setDescription(`Por cada ${command} podria darte U$D ${price} y me estoy arriesgando`)
        .setThumbnail(logo)
        /*.addFields(
          { name: 'Regular field title', value: 'Some value here' },
          { name: 'Regular field title', value: 'Some value here' },
          { name: '\u200B', value: '\u200B' },
          { name: 'Inline field title', value: 'Some value here', inline: true },
          { name: 'Inline field title', value: 'Some value here', inline: true },
        )
          */
      message.channel.send(embed);
      return;
    }
  }

  message.reply("No existe esa criptomenda, ¿necesitas que llame a un experto?");

}


client.login(token);
