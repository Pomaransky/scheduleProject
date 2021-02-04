let $days;
let $pluses;
let $container;

let $popup;
let $popupInfo;
let $popupInputFrom;
let $popupInputTo;
let $popupInput;
let $accept;
let $cancel;
let $subjectId = 0;
let $whileEditingSub = 0;

let $settings;
let $settingsdiv;
let $settingsdivbody;

let $setSubBckImage;
let $subBckImageFlag = false;
let $subButBcks;
let $subjects = [];

let $setSubBorder;
let $subBorderFlag = true;

let $html;
let $brightShameButton;
let $darkShameButton;
let $darkShameFlag = true;

const main = () =>{
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements = () => {
    $days = document.querySelectorAll('.day');
    $pluses = document.querySelectorAll('.plus');
    $container = document.querySelector('.container');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInputFrom = document.querySelector('.popupInputFrom');
    $popupInputTo = document.querySelector('.popupInputTo');
    $popupInput = document.querySelector('.popupInput');
    $accept = document.querySelector('.accept');
    $cancel = document.querySelector('.cancel');
    $settings = document.querySelector('.settings');
    $settingsdiv = document.querySelector('.settings--div');
    $settingsdivbody = document.querySelector('.settings--div--body');
    $setSubBckImage = document.getElementById('sub--bck--image');
    $subButBcks = document.querySelectorAll('.button--bck');
    $setSubBorder = document.getElementById('border--on--off');
    $html = document.querySelector('html');
    $brightShameButton = document.getElementById('bright--color--shame');
    $darkShameButton = document.getElementById('dark--color--shame');
};
const prepareDOMEvents = () => {
    addListeners();
    $cancel.addEventListener('click',closePopup);
    $accept.addEventListener('click',accBtn);
    $settings.addEventListener('click',openSettings);
    $setSubBckImage.addEventListener('click',subBckImageOnOff);
    $setSubBorder.addEventListener('click',subBorderOnOff);
    $brightShameButton.addEventListener('click',brightShame);
    $darkShameButton.addEventListener('click',darkShame);
};
const addListeners = () =>{
    for (let i=0; i < $days.length; i++){
        $pluses[i].addEventListener('click', () => { createSubjectElements($days[i]); });
    };
};
const createSubjectElements = (day) =>{
        const subject = document.createElement('div');
        subject.classList.add('subject');
        const txtFrom = document.createElement('span');
        txtFrom.classList.add('txtFrom');
        txtFrom.textContent = 'Start:';
        const from = document.createElement('span');
        from.classList.add('from');
        const txtTo = document.createElement('span');
        txtTo.classList.add('txtTo');
        txtTo.textContent = 'End:';
        const to = document.createElement('span');
        to.classList.add('to');
        const name = document.createElement('span');
        name.classList.add('name');
        name.textContent = "Subject name...";
        const buttons = document.createElement('span');
        buttons.classList.add('buttons'); 
        const edit = document.createElement('button');
        edit.classList.add('edit');
        edit.textContent = 'Edit';
        const del = document.createElement('button');
        del.classList.add('del');

        $subjectId++;
        subject.setAttribute('id',`subNr${$subjectId}`);

        day.appendChild(subject);

        subject.appendChild(txtFrom);
        subject.appendChild(from);
        subject.appendChild(txtTo);
        subject.appendChild(to);
        subject.appendChild(name);
        subject.appendChild(buttons);
        buttons.appendChild(edit);
        buttons.appendChild(del);

        edit.addEventListener('click',openPopup);
        del.addEventListener('click',()=>{
            subject.classList.add('removing');
            del.classList.add('but--removing');
            edit.removeEventListener('click',openPopup);
            setTimeout(() => subject.remove(), 480);
        });
        if($subBckImageFlag){
            subject.style.backgroundImage = 'url(subjectbck.png)';
        }else{
            subject.style.backgroundImage = 'none';
        }
        if(!$subBorderFlag){
            subject.style.setProperty("--main-border", "none");
        }
        $subjects.push(subject);
};
const openPopup = (e) =>{
    const oldSub = e.target.closest('div').id;
    $whileEditingSub = document.getElementById(oldSub);
    $popup.style.display = 'flex';
    $popupInfo.textContent = '';
    checkEnterClick();
};
const accBtn = () =>{
    if($popupInputFrom.value === '' || $popupInputTo.value === '' || $popupInput.value === ''){
        $popupInfo.textContent = 'Fill in all fields !!!';
    }else{
        $whileEditingSub.children[1].textContent = $popupInputFrom.value;
        $whileEditingSub.children[3].textContent = $popupInputTo.value;
        $whileEditingSub.children[4].textContent = $popupInput.value;
        closePopup();
        $popupInputFrom.value = '';
        $popupInputTo.value = '';
        $popupInput.value = '';
    }
};
const checkEnterClick = () =>{
    document.addEventListener("keyup", e => {
        if(e.key === "Enter"){
            accBtn();
        }else if(e.key === "Escape"){
            closePopup();
        }
    });
};
const closePopup = () =>{
    $popup.style.display = 'none';
}
const openSettings = () =>{
    $settingsdiv.classList.toggle('settings--divactive');
    if($settingsdivbody.classList.contains('settings--div--body--show')){
        showSettings();
    }else{
        setTimeout(showSettings,300);
    }
}
const showSettings = () =>{
    $settingsdivbody.classList.toggle('settings--div--body--show');
}
const buttonSwitchOff = (button, which) =>{
    button.style.transform = 'translateY(-32.5px) translateX(-13px)';
    $subButBcks[which].style.backgroundColor = 'red';
}
const buttonSwitchOn = (button, which) =>{
    button.style.transform = 'translateY(-32.5px) translateX(13px)';
    $subButBcks[which].style.backgroundColor = 'green';
}
const subBckImageOnOff = () =>{
    if($subBckImageFlag){
        buttonSwitchOff($setSubBckImage,0);
        for(let i = 0; i < $subjects.length; i++){
            $subjects[i].style.backgroundImage = 'none';
        }
        $subBckImageFlag = false;
    }else{
        $setSubBckImage.style.transform = 'translateY(-32.5px) translateX(13px)';
        $subButBcks[0].style.backgroundColor = 'green';
        buttonSwitchOn($setSubBckImage,0);
        for(let i = 0; i < $subjects.length; i++){
            $subjects[i].style.backgroundImage = 'url(subjectbck.png)';
        }
        $subBckImageFlag = true;
    }  
}
const borderToDarkOrBright = () => {
    for(let i = 0; i < $subjects.length; i++){
        if($darkShameFlag){
            $subjects[i].style.setProperty("--main-border", "2px solid rgb(168, 168, 168)");
        }else{
            $subjects[i].style.setProperty("--main-border", "2px solid #1c1e21");
        }
    }
}
const subBorderOnOff = () =>{
    if($subBorderFlag){
        buttonSwitchOff($setSubBorder,1);
        for(let i = 0; i < $subjects.length; i++){
            $subjects[i].style.setProperty("--main-border", "none");
        }
        $subBorderFlag = false;
    }else{
        buttonSwitchOn($setSubBorder,1);
        borderToDarkOrBright();
        $subBorderFlag = true;
    }  
}
const brightShame = () => {
    $html.style.setProperty("--bck-main-color","rgb(168, 168, 168)");
    $html.style.setProperty("--main-font-color","#1c1e21");
    $html.style.setProperty("--main-border","2px solid #1c1e21");
    $darkShameFlag = false;
    borderToDarkOrBright();
}
const darkShame = () => {
    $html.style.setProperty("--bck-main-color","#1c1e21");
    $html.style.setProperty("--main-font-color","rgb(168, 168, 168)");
    $html.style.setProperty("--main-border","2px solid rgb(168, 168, 168)");
    $darkShameFlag = true;
    borderToDarkOrBright();
}
document.addEventListener('DOMContentLoaded', main);