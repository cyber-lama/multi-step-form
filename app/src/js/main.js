$(document).ready(function(){
    var form = {
        init: function() { // Объявляем функции которые должны сработать сразу с вызовом form.init();
            this.cacheDom();
            this.bindEventsNext();
            this.giveFirstTabActive();
            this.createDivAfterInput();
            this.buttonsNavActive();
        },
        cacheDom: function () { // Находим все элементы с которыми будем взаимодействовать
            this.$el = $('#form');
            this.$buttonSend = this.$el.find('#send');
            this.$buttonNext = this.$el.find('#next');
            this.$buttonPrev = this.$el.find('#prev');
            this.$tab = this.$el.find('fieldset.tab');
        },
        bindEventsNext: function() { // Привязываем к событию onclick вызов методов
            this.$buttonNext.on('click', this.validateInput.bind(this));
            this.$buttonPrev.on('click', this.changeClassElement.bind(this));
        },
        numberActiveTab: function () {// Метод определяющий ключ активного таба
            for (let i = 0; i <= this.$tab.length - 1; i++){
                if (this.$tab[i].classList.contains('active')){
                    return i;
                }
            }
        },
        changeClassElement: function(button){


            let countAllTabs = this.$tab.length - 1; // Длинна массива с табами

            let clickButton = button; // Клик по какой кнопке

            let resultNumberActiveTab = this.numberActiveTab();// Какой ключ активного таба в момент клика по кнопке


            if(clickButton.target.getAttribute('id') === "next" && resultNumberActiveTab < countAllTabs){// Если нажата кнопка след. и ключ активного таба не больше чем длинна массива с табами переключаемся на след таб
                var nextTab = resultNumberActiveTab + 1;
            }
            else if(clickButton.target.getAttribute('id') === "prev" && resultNumberActiveTab >= 1){
                var nextTab = resultNumberActiveTab - 1;
            }
            else{
                return false;
            }
            this.$tab[resultNumberActiveTab].classList.remove("active");// Удаляем у всех табов класс active
            this.$tab[nextTab].classList.add("active");// Переходим на след таб
            let lastDataAtiveTab = this.numberActiveTab();

            this.buttonSendActive();
            this.buttonsNavActive(lastDataAtiveTab);
        },
        validateInput: function(button){

            let resultNumberActiveTab = this.numberActiveTab();
            let tabChild = this.$tab[resultNumberActiveTab].querySelectorAll('input[data-validate]');

            let input = this.$el.find('input[data-validate]');

            let errors = [];
            let clickButton = button;
            for(let q = 0; q < tabChild.length; q++){
                    let item = tabChild[q];
                    let value = $(item).val();
                    function checkAttributeName(item){
                        if (value.length < 2){
                            let message = 'Длинна введенных данных меньше допустимого значения';
                            printErrorMessage(item, message);
                            return false;
                        }else if(value.length > 2 && !isNaN(value)){
                            let message = 'Введите буквенные символы';
                            printErrorMessage(item, message);
                            return false;
                        }else {return true;}
                    }
                    function checkAttributePhone(item){
                        if (value.length < 1){
                            let message = 'Введите цифры длинной не менее 10 символов';
                            printErrorMessage(item, message);
                            return false;
                        }else {return true;}
                    }
                    function checkAttributeEmail(item){
                        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        if(reg.test(value) == false) {
                            let message = 'Введите корректный e-mail';
                            printErrorMessage(item, message);
                            return false;
                        }else {return true;}
                    }
                    function printErrorMessage(item, message) {
                        let parent = item.closest('div');
                        let infoDiv = parent.lastChild;
                        infoDiv.classList.add("active");
                        infoDiv.innerHTML = message;
                        setTimeout (function() {
                            infoDiv.classList.remove('active');
                        }, 4000);
                    }
                    //функции валидации
                    if(item.getAttribute('name') === "name"){
                        if (!checkAttributeName(item)){
                            errors.push('Ошибка в блоке:', item);
                        }
                    }
                    else if(item.getAttribute('name') === "number") {
                        if (!checkAttributePhone(item)){
                            errors.push('Ошибка в блоке:', item);
                        }
                    }
                    else if(item.getAttribute('name') === "email") {
                        if (!checkAttributeEmail(item)){
                            errors.push('Ошибка в блоке:', item);
                        }
                    }
                    else if( !value ) {
                            let message = 'Заполните поле';
                            printErrorMessage(item, message);
                            errors.push('Ошибка в блоке:', this);
                        }
                    //в зависимости от атрибута вызываем функцию валидации

            }
//errors.length
            if(0 < 1){
                this.changeClassElement(clickButton);
            }
        },
        createDivAfterInput: function(){
            let input = this.$el.find('input[data-validate]');
            if(input){
                let parent = input.closest('div');
                for (let i = 0; i < parent.length; i++){
                    let div = document.createElement('div');
                    div.innerHTML="";
                    parent[i].appendChild(div);
                }

            }
        },
        giveFirstTabActive: function(){
            this.$tab[0].classList.add("active");
        },
        buttonSendActive: function(){
            let resultNumberActiveTab = this.numberActiveTab();
            let countAllTabs = this.$tab.length - 1;

            if(resultNumberActiveTab === countAllTabs){
                this.$buttonSend[0].style.display = "inline-block";
            }else {
                this.$buttonSend[0].style.display = "none";
            }
        },
        buttonsNavActive:function(lastDataAtiveTab){
            console.log(lastDataAtiveTab)
            let countAllTabs = this.$tab.length - 1;
            let zero = 0;


            if(lastDataAtiveTab < countAllTabs){
                this.$buttonNext[0].classList.add('js-ripple');

            }else{
                this.$buttonNext[0].classList.toggle('js-ripple');
            }
            if(lastDataAtiveTab > zero){
                console.log('Наша переменная больше нуля:' + lastDataAtiveTab);
                this.$buttonPrev[0].classList.add('js-ripple');
            }else if(lastDataAtiveTab > zero){
                this.$buttonPrev[0].classList.toggle('js-ripple');
            }
        },
        consoleClick: function (element) {
            console.log(element)
        }
    };
    form.init();
});