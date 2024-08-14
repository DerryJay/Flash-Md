const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEM3VUQwYzlTeFR5aGJ6cXh0clRad2VYTmI2NmlnZFQ1VTZ1TjBsdkgxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmtmM2lkS2FPYXV0L3J3Z0ZWYisyVWx5QU5hTkFCcnZuMXdrb2R0c1dXND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnRnZnL3Q2MW1mWHA5NDlyYTVGd3ZyM0VYdVdrNDduaWVjcm9UelZhU1gwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTT0ExVk9nKzNUa25jZzNmNTNoOWF0TEFhaCs1QWxMcmZZNndEdklrYTI0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZFdy91RVlsS2NqeGRETUdTYjBSSjF4V3g1SFdsemI4L09OcWVBK2F2RzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJHZUQ0aUJsT3RxWldLZnZrMG1wZUpNdmN3cFBPK2laMWVUdXpQeVBHMDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0xEeWNpeno3ejhETGpzRWg0MjFlRm5HNzlZMmdFNUhSNkVYNXI0TmdHOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTE1PeWNDa0RYbjBzNStUQ282Rnptc204RVprS2ZORjZIZHVKcHV4ckduND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJKdEloNDB5b2IwN1dsZ2t2WkRIc2lYcTFGNlNnTzJhVWFFb3dvT1ZPT2VNaEpRRjFNUmt1ei9OakRJUjR6Yzg0bWhWMFhQaVB6UVNuQmVXZ2o3dUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTgsImFkdlNlY3JldEtleSI6IllMMWk5dStzWTRHMFBiRzJ6YjgrUUtOdU5DRHQ3K25WaHliS1dFQy93SFE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAxOTQwNjEwMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBM0VDOEM5NTA4ODUxQzZFMDJBRTM3MDYyMTE4RTI1NCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzNjQ5NzQwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIycG5wZzBQc1R6R2prZnlFNEExQ0xnIiwicGhvbmVJZCI6IjQxNTc1NzY4LWIxMzktNDM2Ni1hZGI5LTBlNjU4M2QzNjVjNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvUjFscDlmL0I3S1JmMXp5UWI3OEZTa1ZkdUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZnJONkhjMUtKWDIyWnNMMHlpa1ByR3dSc2NnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhUQVIySlgxIiwibWUiOnsiaWQiOiIyMzQ5MDE5NDA2MTAyOjI0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKQ25pUVlRdDUzenRRWVlDeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIwMWlGaGNYRnB4K2lvdWVUSnVFOHJQaVZ5bVRReWFWcitKc3Z0MFRrUmdvPSIsImFjY291bnRTaWduYXR1cmUiOiJ2L08wbXNKY1p6QVY3dSt6OUw1a21tNGZkdDV0ZDJSSUVNaXZ4UjdJalZYZkFzazZXaDF6NjFrSWJDVVFKTlVkN3FlOC9jQ3hwRU9DWFlPdlBOTlVDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiM1NYSG44ZGJZOW5iK0tIRlpqZGp4NDg0NXZvRUR1RjhRbXpOYVJIYUZPRjRmblBCQkZxU3RFWjRFK0R0QTJTTm1oVnZxTGpwL0ZZTW9aZDZYUDQ3RGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDE5NDA2MTAyOjI0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmROWWhZWEZ4YWNmb3FMbmt5YmhQS3o0bGNwazBNbWxhL2liTDdkRTVFWUsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjM2NDk3MzQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ0ZwIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "King Jay",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2349019406102", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
