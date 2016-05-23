# DesafioBee

Projeto de chat online utilizando "P"EAN stack!

## Instalar

```
git clone https://github.com/diego3g/desafiobee
cd desafiobee
```

Acesse o arquivo /config/config.json e altere no ambiente de desenvolvimento, os dados para acesso ao seu banco. Após isso execute os seguintes comandos:

```
npm install && bower install
node_modules/.bin/sequelize db:migrate
```

A partir disso pode rodar o servidor node e se divertir :D

```
node server.js
```
