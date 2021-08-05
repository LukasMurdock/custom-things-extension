document.addEventListener('DOMContentLoaded', init);

const colors = ['#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#47B275', '#FFC043', '#F25138', '#99644C', '#FF7D49', '#7356BF', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000'];
let data = null;

function init() {

    getThings((things) => {
        data = things;
        setThing();
        setupEvents();
    });
}

function setupEvents() {
    
    document.addEventListener('click', (e) => {

        if (e.target.id == 'refreshBtn') {
            document.querySelector('#container').style.opacity = 0;
            setThing();
        }
    });
}

function setThing() {

    var random = new Random.Random();
    var length = data.length;
    var randNumber = random.integer(1, length);
    // random.integer(1, length);

    // let match = data.find((thing) => {
    //     return thing.id == randNumber;
    // })

    let match = data[randNumber-1]
    let thingId = data.indexOf(match) + 1

    // let sizeClass = match.title.length > 40 ? 'small' : 'big';
    let titleLength = match.title.length
    if (titleLength > 60) {
        sizeClass = 'long'
    } else if (titleLength > 40) {
        sizeClass = 'small'
    } else {
        sizeClass = 'short'
    };


    //set title
    document.querySelector('.thing-index').innerHTML = pad(match.id);
    document.querySelector('.thing-title').innerHTML = match.title;
    document.querySelector('.thing-title').classList.remove('small');
    document.querySelector('.thing-title').classList.add(sizeClass);
    // document.querySelector('.thing-descr').innerHTML = match.description;

    document.querySelector('.thing-index').innerHTML = randNumber
    // length
    // randNumber
    // match.title.length

    

    // //calculate size
    // let titleSelect = document.querySelector('.thing-title');
    // let divHeight = titleSelect.offsetHeight;
    // let lineHeight = parseFloat(window.getComputedStyle(titleSelect, null).getPropertyValue('font-size'));
    // // let lineHeight = parseInt(titleSelect.style.lineHeight);
    // let lines = Math.floor(divHeight / lineHeight);
    // document.querySelector('.thing-index').innerHTML = lines


    //set colors    
    number = random.integer(1, 77);
    let color = colors[random.integer(0, colors.length - 1)];
    let textColor = '#ffffff';

    //reverse black & white if needed
    if (color == '#ffffff' || color == '#FFC043')
        textColor = '#000000';

    document.querySelector('#container').style.backgroundColor = color;
    document.querySelector('.thing-container').style.color = textColor;
    document.querySelector('#arrow-svg').setAttribute('fill', textColor);
    document.querySelector('#container').style.opacity = 1;


}

function getThings(callback) {

    fetch('./data/data.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    return callback(data.content.things);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}