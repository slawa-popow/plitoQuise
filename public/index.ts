import { TelegramWebApps } from "telegram-webapps-types";
import { settings } from "./src/settings";


const host = settings.HOST; 

declare const window: {
    Telegram: TelegramWebApps.SDK;
} & Window;

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();


const btnStart = document.getElementById('btn_start_calc');
btnStart?.addEventListener('click', () => {     
    window.location.href = host + `startQuize`
});