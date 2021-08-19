
# El precio de la cripto

Bot de discord que nos informa el precio actual de cualquier 
criptoactivo listado en Coingecko.

![bot screenshot](https://github.com/fermartinotti/el-precio-de-la-cripto/blob/main/assets/bot.png)
![bot_example](https://github.com/fermartinotti/el-precio-de-la-cripto/blob/main/assets/interaccion.PNG)

  ## ¿Integraciones o dependencias? si, las siguientes:
**discordJS** Modulo para interactuar con discord.

**coingecko-api** Modulo de integracion con coingecko para obtener la informacion de las criptomonedas.
## Comandos

- !experto
Estas debatiendo con un amigo y queres desacreditarlo? 
Llama a un experto para que te de una mano.
- $simbolo ej: $BTC
Podes consultarle al experto en criptomonedas el precio de cualquier cripto. 

  
## Environment Variables

Para correr el proyecto, es necesario agregar estas variables de entorno a tu .env

`TOKEN` - Token del bot de discord.

`PREFIX` - prefijo de los comandos generales.
 
`CURRENCY_PREFIX` - prefijo para obtener el precio de una criptomoneda.

  
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd el-precio-de-la-cripto
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node .
```
  
## Feedback o mejoras

Si tenes algun feedback o mejora que aportar al proyecto podes escribirme a mi email personal: fermartinotti@gmail.com o simplemente solicitar un pull request.

  
