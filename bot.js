const Bot = require('discord-graf').Bot;
const Log = require('./log').Logger;
const ServerConfig = require('./Models/ServerConfig');

const bot_version = 'dev';
const bot_name = 'Oh Please';
const bot_token = process.env.TOKEN;
const bot_prefix = 'oh please ';

const bot = new Bot({
  name: bot_name,
  version: bot_version,
  token: bot_token,
  commandPrefix: bot_prefix,
  owner: '175008284263186437',
  clientOptions: {
    disableEveryone: true
  },
  'bdpw-key': process.env.BDPW_KEY,
  bdpwKey: process.env.BDPW_KEY
});

bot._logger = Log;

let Commands = [
  require('./Commands/Clean'),
  require('./Commands/Ping'),
  require('./Commands/Info'),
  require('./Commands/Stats'),
  require('./Commands/Invite'),
  require('./Commands/SetNick'),

  require('./Commands/Hosting'),
  require('./Commands/Learn'),
  require('./Commands/Troubleshooting'),
  require('./Commands/ScrollUp'),
  require('./Commands/GodNo'),
  require('./Commands/MusicBot'),
  require('./Commands/VoiceExample'),
  require('./Commands/Codeblocks'),
  require('./Commands/CatchOutput'),

  require('./Commands/Conf'),
];

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  // bot.getDMChannel('175008284263186437').then(DMChannel => {
  //   bot.createMessage(DMChannel.id, `\`UNCAUGHT EXCEPTION\`\n\`\`\`sh\n${errorMsg}\n\`\`\``);
  // }).catch(error);

 Log.error(errorMsg);
});

bot.registerModules([
  ['general', 'General'],
  ['info', 'Info'],
  ['util', 'Util'],
  ['blacklist', 'Blacklist'],
  ['modules', 'Modules'],
]).registerDefaultCommands({
  about: false,
  modRoles: false,
  channels: false
}).registerCommands(Commands).createClient();

bot.client.on('error', (err, id) => {
  let client = bot.client;
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  client.bot.users.get('175008284263186437')
    .sendMessage(`\`ERROR IN SHARD ${id}\`\n\`\`\`sh\n${errorMsg}\n\`\`\``)
    .catch(Log.error.bind(Log));

  Log.error(errorMsg);
});

bot.client.on('ready', token => {
  let client = bot.client;
  ServerConfig.init(client);
});

module.exports = bot;
