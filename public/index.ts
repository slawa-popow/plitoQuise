import { TelegramWebApps } from "telegram-webapps-types";


declare const window: {
    Telegram: TelegramWebApps.SDK;
} & Window;

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();


const btnStart = document.getElementById('btn_start_calc');
btnStart?.addEventListener('click', async() => { 
    // const url = 'https://plitochka-quiz.vercel.app/startquize';  
   
    window.location.href = '/startquize';
    
});