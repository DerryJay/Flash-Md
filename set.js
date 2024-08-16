const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0hybVYxajRJSWloM2xnZWxvcjRwQ1pwelR0dWdydzgrYmkxdkFPdHMwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHhoYU5BSW1XbFAvaWcwUFdyQ0tJeGVNZmhWNWZ1VUNpZWw1R2VCVTZWWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSTVvaU5nOEpMZ2Npa05xZ0U0cG5RN3NIYVdRUk92QnNZT2xVSnhTNlZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSnQvcm0yYXF2c1FwUWhkREQzTUVEVVhjRzdXM2pZb3JyclBKVFF2VER3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFPa1l4MDdRZ200L1gxQUtvQmZtaXFIRGlzVWYrWnpYNW4rZFozeDZHR3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlkZWF4WFptaUY4dDhtMHY4Q3dkb3VrcnFSd3d3RFlVVXA4VkFrRFphSDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0pYZnAyMkZzV1JZSGdlRHZFV1N5ZlhVKzJnenpoTk51NzRjcnlnNVhGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFVuR05zb1RxMVUyUmh6Tkp2cnpZNDl4bGF4SG51RnhsdkJuSU8rLzkwUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Incwcit4bGw2ZU8wd1VUakkwOCtPSkxuMHlhbDN2TGxtYjBZd1B4eGkrbGMzdjIyZkNONFB4UzNlM2EyT2xPNHlwenNabEZCMHJ6S2RCbFdPZ0g0SmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ1LCJhZHZTZWNyZXRLZXkiOiJIWVJ4ZDFMUDRGQWlEMG5OV0s2RGZ6Y2VYb1VPbzFJVDlpSHE5M2xnaWtVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2VHJtdlJoc1FmMlFUQV9ob2E0Mjh3IiwicGhvbmVJZCI6ImNmNGNjM2U5LThjZmYtNDg4ZC1hZmU2LTNhOGRjZGQ0ZmJkZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYSHV4TXJ4TnVYenhVVzczRG05eWJvKy9tM3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVF0OGFHcC9JWGJaYmgzR0pXM2pSMzlPMXJ3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjgxVjJKOUJMIiwibWUiOnsiaWQiOiIyMzQ5MDE5NDA2MTAyOjI3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKQ25pUVlReHNINnRRWVlEaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIwMWlGaGNYRnB4K2lvdWVUSnVFOHJQaVZ5bVRReWFWcitKc3Z0MFRrUmdvPSIsImFjY291bnRTaWduYXR1cmUiOiJWQmpibHJFd0x2YjVZMlZJc28zcEFlS0V3K2IwTCtkTjYrVnozeWxOMjcyQ2JkSVNPYkhCWUdJR2x5UXBYT3lKck0rbktLdUJ1em8vQnZBOWpwYWhDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSjZnOUQ4Rk5JdWF6ZkZiRjNESGNhbS8vZVlWcnBjcW9lUXJkVDRzRnBlWE45V2E3SEhCc296K3UvZU1wNUpGS1U4RkpuSFI0QkNWZlpnSEh0dHQzZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDE5NDA2MTAyOjI3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmROWWhZWEZ4YWNmb3FMbmt5YmhQS3o0bGNwazBNbWxhL2liTDdkRTVFWUsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjM3NjkwNDMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ0ZwIn0=',
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
