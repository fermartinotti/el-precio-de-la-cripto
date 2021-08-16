const config = require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

var commandBody;
var args;
var command;

client.once('ready', () => {
	console.log('Ready!');
});

const prefix = process.env.prefix;
const token = process.env.TOKEN;
const currency_prefix= process.env.CURRENCY_PREFIX;

client.on("message", function(message) {
  if (message.author.bot) return;
  if(message.content.startsWith(prefix) || message.content.startsWith(currency_prefix)){
    commandBody = message.content.slice(prefix.length);
    args = commandBody.split(' ');
    command = args.shift().toLowerCase();
  }

  if(message.content.startsWith(prefix)){
    comando(command, message);
  }else if(message.content.startsWith(currency_prefix)){
    precio(command, message);
  }else{
    return;
  }

});

function comando(command, message){
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Este mensaje tuvo una latencia de ${timeTaken}ms.`);
  }else if (command === "experto"){
    message.channel.send(`No lo se ${message.author}, parece falso`);
  }
}

function precio(command, message){
  message.channel.send(`Usted pidio el precio de ${command}`);
}


client.login(token);



