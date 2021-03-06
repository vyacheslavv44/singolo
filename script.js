/************************************************ Let's Roll ***********************/

const NAVIGATION = document.getElementById('navigation');


NAVIGATION.addEventListener('click', (event) => {
    NAVIGATION.querySelectorAll('a').forEach(el => el.classList.remove('focused'));
    event.target.classList.add('focused');
});


/***************************************** Let's make slider ***********************/

var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

function slide(slider, items, prev, next) {
    var posX1 = 0;
    var posX2 = 0;
    var posInitial;
    var posFinal;
    var threshold = 100;
    var slides = items.getElementsByClassName('slide');
    var slidesLength = slides.length;
    var slideSize = items.getElementsByClassName('slide')[0].offsetWidth;
    var firstSlide = slides[0];
    var lastSlide = slides[slidesLength - 1];
    var cloneFirst = firstSlide.cloneNode(true);
    var cloneLast = lastSlide.cloneNode(true);
    var index = 0;
    var allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        };

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}

slide(slider, sliderItems, prev, next);


/****************************** Let's add turn on/off phone screen feature *********/

/* Vertical Phone on Slide 1 */
const Vertical_phone_Square = document.getElementById('VerticalPhoneSquare');
const Vertical_Phone_Button = document.getElementById('VerticalPhoneButton');


Vertical_phone_Square.addEventListener('click', () => {
    /* This method working too */
    /*if (Vertical_phone_Square.classList.contains('hidden_v_image')) {
        Vertical_phone_Square.classList.remove('hidden_v_image');
    } else {
        Vertical_phone_Square.classList.add('hidden_v_image');
    }*/
    Vertical_phone_Square.classList.toggle('hidden_v_image');
});

Vertical_Phone_Button.addEventListener('click', () => {
    Vertical_phone_Square.classList.toggle('hidden_v_image');
});

Vertical_phone_Square.addEventListener('touchstart', () => {
    Vertical_phone_Square.classList.toggle('hidden_v_image');
});

Vertical_Phone_Button.addEventListener('touchstart', () => {
    Vertical_phone_Square.classList.toggle('hidden_v_image');
});

/* Horizontal Phone on Slide 1 */
const Horizontal_Phone_Square = document.getElementById('HorizontalPhoneSquare');
const Horizontal_Phone_Button = document.getElementById('HorizontalPhoneButton');


Horizontal_Phone_Square.addEventListener('click', () => {
    Horizontal_Phone_Square.classList.toggle('hidden_h_image');
});

Horizontal_Phone_Button.addEventListener('click', () => {
    Horizontal_Phone_Square.classList.toggle('hidden_h_image');
});

Horizontal_Phone_Square.addEventListener('touchstart', () => {
    Horizontal_Phone_Square.classList.toggle('hidden_h_image');
});

Horizontal_Phone_Button.addEventListener('touchstart', () => {
    Horizontal_Phone_Square.classList.toggle('hidden_h_image');
});


/****************************** Highlighting tags from Portfolio feature ***********/

const HIGHLIGHTED_TAG = document.getElementById('tagWrapper');


HIGHLIGHTED_TAG.addEventListener('click', (event) => {
    HIGHLIGHTED_TAG.querySelectorAll('#tagWrapper>button').forEach(el => el.classList.remove('highlighted__tag'));
    event.target.classList.add('highlighted__tag');
});


/***************************** add borders to Portfolio images on click ***********/

const OUTLINED_PORTFOLIO_IMAGE = document.getElementById('portfolioImageContainer');
const portfolioItem = document.getElementById('portfolioItem');


OUTLINED_PORTFOLIO_IMAGE.addEventListener('click', (event) => {
    OUTLINED_PORTFOLIO_IMAGE.querySelectorAll('#portfolioItem').forEach(el => el.classList.remove('on__mouse__down__image__border'));
    event.target.classList.add('on__mouse__down__image__border');
});


/***************************** add shuffling to Portfolio images *******************/

const Portfolio_Button_Tag = document.getElementById('tagWrapper');


Portfolio_Button_Tag.addEventListener('click', () => {

    for (var i = OUTLINED_PORTFOLIO_IMAGE.children.length; i >= 0; i--) {
        OUTLINED_PORTFOLIO_IMAGE.appendChild(OUTLINED_PORTFOLIO_IMAGE.children[Math.random() * i | 0]);
    }
});


/********************************* Highlight menu item on scroll *******************/

function onScroll(event) {
    var sections = document.querySelectorAll('#navigation a');
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
        var currLink = sections[i];
        var val = currLink.getAttribute('href');
        var refElement = document.querySelector(val);
        if (refElement.offsetTop - 200 <= scrollPos && (refElement.offsetTop - 200 + refElement.offsetHeight > scrollPos)) {
            document.querySelector('#navigation a').classList.remove('focused');
            currLink.classList.add('focused');
        } else {
            currLink.classList.remove('focused');
        }
    }
};

window.document.addEventListener('scroll', onScroll);


/********************************** Let's make modal message from form *************/

const BUTTON = document.getElementById('sendButton');
const CLOSE_BUTTON = document.getElementById('closeButton');
const subjectFieldVariable = document.getElementById('subjectField');
const textareaFieldVariable = document.getElementById('textareaField');


BUTTON.addEventListener('click', () => {
    const subject = document.getElementById('subject').value.toString();
    const personComment = document.getElementById('personComment').value.toString();

    /*document.getElementById('subjectField').innerText = subject;*/
    if (subject.length == 0) {
        subjectFieldVariable.innerText = 'Без темы';
    } else {
        subjectFieldVariable.innerText = subject;
        document.getElementById('temaP').classList.remove('collaps__p__tema');
    }
    /*document.getElementById('textareaField').innerText = personComment;*/
    if (personComment.length == 0) {
        textareaFieldVariable.innerText = 'Без описания ';
    } else {
        textareaFieldVariable.innerText = personComment;
        document.getElementById('opisanieP').classList.remove('collaps__p__opisanie');
    }
    document.getElementById('confirmationMessageBlock').classList.remove('hidden');
});

CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('subjectField').innerText = '';
    document.getElementById('textareaField').innerText = '';
    document.getElementById('nearFooterForm').reset();
    document.getElementById('confirmationMessageBlock').classList.add('hidden');
    document.getElementById('temaP').classList.add('collaps__p__tema');
    document.getElementById('opisanieP').classList.add('collaps__p__opisanie');
});


/********************************** Let's disable message from form ****************/

const DISABLE_FORM = document.getElementById('nearFooterForm');


DISABLE_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
});


/***************************************************** Mobile menu *****************/

const HAMBURGER = document.getElementById('hamburgerBox');
const BODY = document.getElementById('body');
const CLOSE_MOBILE_MENU = document.getElementById('navigationSection');


HAMBURGER.addEventListener('click', () => {
    BODY.classList.toggle('active_menu');
});

CLOSE_MOBILE_MENU.addEventListener('click', () => {
    BODY.classList.toggle('active_menu');
});

CLOSE_MOBILE_MENU.addEventListener('touchmove', () => {
    BODY.classList.toggle('active_menu');
});


/***************************************** Animation for hamburger *****************/

const EL = document.getElementById('hamburgerBox');

EL.addEventListener('click', () => {
    EL.classList.toggle('activeForHumburger');
});

