import { settings } from "./src/settings";


const host = settings.HOST; 



const btnStart = document.getElementById('btn_start_calc');
btnStart?.addEventListener('click', () => {
    console.log(host);     
    window.location.href = host + 'startQuize'
});