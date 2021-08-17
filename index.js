const config = require('dotenv').config();
const http = require('http');

const Discord = require('discord.js');
const client = new Discord.Client();
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

var commandBody;
var args;
var command;

client.once('ready', () => {
	console.log('Ready!');
});

const prefix = process.env.prefix;
const token = process.env.TOKEN;
const currency_prefix= process.env.CURRENCY_PREFIX;

http.createServer((req, res) => {
  res.writeHead(200, {
      'Content-type': 'text/plain'
  });
      res.write('Hey');
      res.end();
  }).listen(4000);

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
      let price = await CoinGeckoClient.simple.price({ids:coins[i].id});
      message.reply(`Por cada ${command} podria darte U$D ${price.data[id].usd} y me estoy arriesgando`);
      console.log(price);
      return;
    }
  }

  message.reply("No existe esa criptomenda, ¿necesitas que llame a un experto?");

}


client.login(token);
