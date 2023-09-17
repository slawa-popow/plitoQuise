import { StepsSelectData } from "../types/stepsT";


export function domStep1(domData: StepsSelectData): HTMLFormElement {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);

    const ul = document.createElement('ul');
    ul.classList.add('image-gallery');

    for (let vars of domData.variants) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', vars.imgSrc);

        const div = document.createElement('div');
        div.classList.add('check-in');

        const rinput = document.createElement('input');
        rinput.setAttribute('type', 'radio');
        rinput.setAttribute('id', vars.radioId);
        rinput.setAttribute('name', vars.radioName);
        rinput.setAttribute('value', vars.radioValue);
        rinput.checked = vars.isChecked;
        
        const span = document.createElement('span');
        span.textContent = vars.titleSpan;

        div.appendChild(rinput);
        div.appendChild(span);
        li.appendChild(img);
        li.appendChild(div);
        ul.appendChild(li);
    }
    
    form.appendChild(ul);

    return form;
}