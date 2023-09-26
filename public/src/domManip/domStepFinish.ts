import { StepFinishtData } from "../types/stepsT";


export function domStepFinish(domData: StepFinishtData, callback: (e: Event) => void): HTMLFormElement {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);

    const div = document.createElement('div');
    div.classList.add('formdiv');

    const ddiv = document.createElement('div');
    
    const fdata = `
        <div class="form-group form-div-send">
            <span id="spanerr" style="display: block; color: red; font-size: 0.8em;"></span>
            <label for="${domData.inputNameName}">Ваше имя:</label>
            <input type="text" class="form-control" id="${domData.inputNameName}" required placeholder="Ваше имя">
        
            <label for="${domData.inputTelName}">Ваш № телефона:</label>
            <input type="tel" class="form-control" id="${domData.inputTelName}" required placeholder="+375 (_ _) _ _ _ - _ _ - _ _">
        </div>
    `;
    ddiv.innerHTML = fdata;
    
    const button = document.createElement('button');
    button.setAttribute('id', 'button-submit-steps');
    button.setAttribute('type', 'button');
    button.textContent = 'Отправить';
    button.addEventListener('click', callback);
    
    ddiv.appendChild(button);
    div.appendChild(ddiv);

    const idiv = document.createElement('div');
    const ico = document.createElement('img');
    ico.setAttribute('src', domData.imgSrc || '');
    idiv.appendChild(ico);

    div.appendChild(idiv);

    form.appendChild(div);

    return form;
}