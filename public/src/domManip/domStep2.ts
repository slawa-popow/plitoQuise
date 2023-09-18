import { StepsFormSity } from "../types/stepsT";


export function domStep2(domData: StepsFormSity): HTMLFormElement {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);

    const cntdiv = document.createElement('div');
    cntdiv.classList.add('container');
    const divg = document.createElement('div');
    divg.classList.add('form-group', 'step-2-area-div');

    const label = document.createElement('label');
    label.setAttribute('for', domData.idInput);
    label.textContent = "Напишите Ваше примерное местоположение:"
    const inputarea = document.createElement('textarea');
    inputarea.setAttribute('rows', '5');
    inputarea.setAttribute('placeholder', domData.titleInput);
    inputarea.setAttribute('id', domData.idInput);
    inputarea.setAttribute('name', 'address');
    divg.appendChild(label);
    divg.appendChild(inputarea);
    cntdiv.appendChild(divg);
    form.appendChild(cntdiv);

    return form;
}

export function blockedNextStep(message: string) {
    const div = document.createElement('div');
    div.classList.add('error-next');
    const p = document.createElement('p');
    p.textContent = message;
    div.appendChild(p);
    return div;
}


export function deleteErrorBlock(cnt: HTMLElement | null, err: HTMLElement, delayDel: number) {
    if (cnt)
        window.setTimeout(() => {
            cnt.removeChild(err);
        }, delayDel)
}

// <textarea class="form-control" rows="5" id="comment"></textarea>
// <div class="form-group">
//     <label for="email">Email:</label>
//     <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
// </div>