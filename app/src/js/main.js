$(document).ready(function(){
    var form = {
        init: function() { // Объявляем функции которые должны сработать сразу с вызовом form.init();
            this.cacheDom();
            this.bindEventsNext();
            this.giveFirstTabActive();
            this.createDivAfterInput();
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
            console.log(button);
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
                        let parent = item.closest('div');
                        let infoDiv = parent.lastChild;
                        if (value.length < 2){
                            infoDiv.classList.add("active");
                            infoDiv.innerHTML = 'Длинна введенных данных меньше допустимого значения';
                            return false;
                        }else if(value.length > 2 && !isNaN(value)){
                            infoDiv.innerHTML = 'Введите буквенные символы';
                            return false;
                        }else {return true;}
                    }
                    function checkAttributePhone(item){
                        let parent = item.closest('div');
                        let infoDiv = parent.lastChild;
                        if (value.length < 1){
                            infoDiv.classList.add("active");
                            infoDiv.innerHTML = 'Введите цифры длинной не менее 10 символов';
                            return false;
                        }else {return true;}
                    };
                    function checkAttributeEmail(item){
                        let parent = item.closest('div');
                        let infoDiv = parent.lastChild;
                        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        if(reg.test(value) == false) {
                            infoDiv.classList.add("active");
                            infoDiv.innerHTML = 'Введите корректный e-mail';
                            return false;
                        }else {return true;}
                    };
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
                            console.log("Заполните поле");
                            errors.push('Ошибка в блоке:', this);
                        }
                    //в зависимости от атрибута вызываем функцию валидации
            }
            console.log(errors);
            if(errors.length < 1){
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
        consoleClick: function (element) {
            console.log(element)
        }
    };
    form.init();
});