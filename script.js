document.addEventListener('DOMContentLoaded', () => {

    (function MESSAGE_OF_ERROR() {

        const errorOfMessage = {
            current_page: null,
            current_htmlElement: null,
            current_itIsAllClassElements: null,
            current_text: null,
            get info() {
                return `Страница на которой была найдена ошибка в тексте: ${this.current_page}
                        HTML элемент в котором содержится данный текст: <${this.current_htmlElement}>
                        CSS классы этого элемента: ${this.current_itIsAllClassElements} 
                        Текст: ${this.current_text}`;
            },
            get page() {
                return `Страница на которой была найдена ошиька в тексте: ${this.current_page}`;
            },
            get html() {
                return `HTML элемент в котором содержится данный текст: <${this.current_htmlElement}>`;
            },
            get itIsAllClassElements() {
                return `CSS классы этого элемента: ${this.current_itIsAllClassElements}`;
            },
            get text() {
                return `Текст: ${this.current_text}`;
            }
        };


        document.addEventListener('keypress', e => {
            const text = getSelection().toString();
            if(e.code === 'Enter' && e.ctrlKey) {
                if(text.length) {
                    errorOfMessage.current_text = text;
                    createElementsForErrorMessage();
                } else {
                    errorOfMessage.current_text = 'Была выделена пустая строка, это системное сообщение...';
                    createElementsForErrorMessage();
                }
            }
        });

        document.addEventListener('selectstart', e => {
            const page = document.location.href;
            const target = e.target;
            const htmlElement = target.tagName || target.parentElement.tagName;
            let itIsAllClassElements = target.parentElement;

            while(itIsAllClassElements !== null
            && itIsAllClassElements.classList.length === 0) {

                itIsAllClassElements = itIsAllClassElements.parentElement;

            }

            if(itIsAllClassElements === null) return;

            itIsAllClassElements = Array.from(itIsAllClassElements.classList)
                .map(el => el);

            errorOfMessage.current_page = page;
            errorOfMessage.current_htmlElement = htmlElement.toLowerCase();
            errorOfMessage.current_itIsAllClassElements = itIsAllClassElements;
        });

        function createElementsForErrorMessage() {
            document.body.style.overflowY = 'hidden';

            const node = createElementsForModal();
            const {modal, error, hr, span, containerButton, success, cansel} = node;
            createStyleForNodeElements(modal, error, span, containerButton, success, cansel);

            modal.append(error);
            containerButton.append(success, cansel);
            error.append(hr, span, containerButton);
            document.body.append(modal);

            setTimeout(() => error.style = 'transform: translate(0, 0);', 500);

            addEvent(modal, error, success, cansel);
        }

        function createElementsForModal() {
            const modal = document.createElement('div');
            const error = document.createElement('div');
            const hr = document.createElement('hr');
            const span = document.createElement('span');
            const containerButton = document.createElement('div');
            const success = document.createElement('button');
            const cansel = document.createElement('button');
            return {modal, error, hr, span, containerButton, success, cansel};
        }

        function createStyleForNodeElements(modal, error, span, containerButton, success, cansel) {
            modal.classList.add('modal-error-of-message');
            error.classList.add('error-of-message');
            span.classList.add('error-text--eom');
            containerButton.classList.add('container-button--eom');
            success.classList.add('button--eom', 'btn-eom-success');
            cansel.classList.add('button--eom', 'btn-eom-cansel');
            error.textContent = 'Вы хотите сообщить об ошибке в следующей строке:'
            span.textContent = errorOfMessage.text;
            success.textContent = 'Отправить';
            cansel.textContent = 'Отменить';
        }

        function addEvent(modal, error, success, cansel) {
            modal.addEventListener('click', e => {
                const target = e.target;
                if(target.classList.contains('modal-error-of-message')
                    || target.classList.contains('btn-eom-cansel')) {
                    error.style.transform = '';
                    setTimeout(() => {
                        modal.remove();
                        document.body.overflowY = '';
                    }, 500);
                } else if(target.classList.contains('btn-eom-success')) {
                    // ajax запрос на сервер
                    console.log(errorOfMessage);
                }
            });
        }

    }());

});
