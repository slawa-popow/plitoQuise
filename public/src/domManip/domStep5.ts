import { StepsSelectData5 } from "../types/stepsT";
 


export function domStep5(domData: StepsSelectData5): HTMLFormElement {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);

    for (let vars of domData.variants) {
        const block = createDiv5(vars.imgSrc, vars.titleRadioGroup, vars.nameRadioGroup, vars.radios, domData.idForm);
        form.appendChild(block);
    }

    return form;
}



function createDiv5(imgsrc: string, titleRadio: string, nameRadioG: string, radios: string[], id: string): HTMLElement {
    const div = document.createElement('div');
    div.classList.add('div-main-rgroup');

    const divImg = document.createElement('div');
    divImg.classList.add('div-img');
    const img = document.createElement('img');
    img.setAttribute('src', imgsrc);
    divImg.appendChild(img);
    
    const divRadioGroup = document.createElement('div');
    divRadioGroup.classList.add('div-rgroup');

    const titleRadioGroup = document.createElement('div');
    const ptitle = document.createElement('p');
    ptitle.textContent = titleRadio;
    titleRadioGroup.appendChild(ptitle);

    const divGroup = document.createElement('div');

    radios.forEach((r, i) => {
        const rinput = document.createElement('input');
        const rlabel = document.createElement('label');
        rinput.setAttribute('type', 'radio');
        rinput.setAttribute('id', `${id}-rg-${i}`);
        rinput.setAttribute('name', nameRadioG);
        rinput.setAttribute('value', r);
        rlabel.setAttribute('for', `${id}-rg-${i}`);
        rlabel.textContent = r;
        if (i === 0) rinput.checked = true;
        rlabel.appendChild(rinput);
        divGroup.appendChild(rlabel);
    });

    divRadioGroup.appendChild(titleRadioGroup);
    divRadioGroup.appendChild(divGroup);

    div.appendChild(divImg);
    div.appendChild(divRadioGroup);

    return div;
}


export function domStepN6 (domData: StepsSelectData5): HTMLFormElement {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);

    const cdiv = document.createElement('div');
    cdiv.classList.add('container');
    const div = document.createElement('div');
    div.classList.add('form-group', 'step-2-area-div')
    domData.variants.forEach((v, i) => {
        const rinput = document.createElement('input');
        const rlabel = document.createElement('label');
        rinput.setAttribute('type', 'text');
        rinput.setAttribute('style', 'max-width: 200px;');
        rinput.setAttribute('id', `${domData.idForm}-N-${i}`);
        rinput.setAttribute('name', v.nameRadioGroup);
        rinput.setAttribute('placeholder', v.titleRadioGroup);
        rlabel.setAttribute('for', `${domData.idForm}-N-${i}`);
        rlabel.textContent = v.titleRadioGroup;
        div.appendChild(rlabel);
        div.appendChild(rinput);
    });
    cdiv.appendChild(div);
    form.appendChild(cdiv);

    return form;
}


// <input type="radio" id="contactChoice1" name="contact" value="email" />
// <label for="contactChoice1">Email</label>

export function domStep6(domData: StepsSelectData5): HTMLFormElement {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);

    domData.variants.forEach((v) => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.classList.add('step-6-style')
        img.setAttribute('src', v.imgSrc);
        div.appendChild(img);

        const divGroup = document.createElement('div');
        divGroup.classList.add('step-6-radgroup');

        v.radios.forEach((r, i) => {
            const rinput = document.createElement('input');
            const rlabel = document.createElement('label');
            rinput.setAttribute('type', 'radio');
            rinput.setAttribute('id', `${domData.idForm}-rg-${i}`);
            rinput.setAttribute('name', v.nameRadioGroup);
            rinput.setAttribute('value', r);
            rlabel.setAttribute('for', `${domData.idForm}-rg-${i}`);
            rlabel.textContent = r;
            if (i === 0) rinput.checked = true;
            rlabel.appendChild(rinput);
            divGroup.appendChild(rlabel);
        });
        form.appendChild(divGroup);
        form.appendChild(div);
    });


    return form;
}