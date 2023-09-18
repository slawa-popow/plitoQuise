import { StepsSelectData } from "../types/stepsT";


export function disableButton(btn: HTMLButtonElement | null, isDisable: boolean = true) {
    if (btn) {
        if (isDisable) {
            btn.classList.remove('button-nav-disable-false', 'button-nav-disable-false:focus');
            btn.classList.add('button-nav-disable-true');
            
        } else {
            btn.classList.remove('button-nav-disable-true')
            btn.classList.add('button-nav-disable-false', 'button-nav-disable-false:focus') ;
            
        }
                       
        
        btn.disabled = isDisable;
    }
}


export function setTitleStep(title: string = '') {
    const ptitle = document.getElementById('titleStep');
    ptitle!.textContent = title;
}



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