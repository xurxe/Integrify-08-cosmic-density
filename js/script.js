// style text fields
const inputTextFields = document.querySelectorAll('input[type="text"]');
for (let i = 0; i < inputTextFields.length; i++) {
    inputTextFields[i].style.fontSize = '1rem';
    inputTextFields[i].style.margin = '0.2rem 0 1.5rem';
    inputTextFields[i].style.padding = '0.4rem 0.6rem';
    inputTextFields[i].style.width = '100%';
}

// style submit button
const submitButton = document.querySelector('button[type="submit"]');
submitButton.style.fontSize = '1rem';
submitButton.style.height = '4.5rem';
submitButton.style.margin = '0.5rem 0';
submitButton.style.padding = '0 1rem';
submitButton.style.width = '100%';

// style clear button
const clearButton = document.querySelector('button[type="reset"]');
clearButton.style.background = 'none';
clearButton.style.fontSize = '1rem';
clearButton.style.height = '2.5rem';
clearButton.style.margin = '1rem 0';
clearButton.style.padding = '0 1rem';
clearButton.style.width = '100%';

// select result paragraphs and planet image
const result = document.querySelectorAll('.result');
const planetImage = document.querySelector('#planetImage');



// when clicking the clear-button, remove content from input boxes and result paragraphs, and reset planet image
clearButton.addEventListener('click', function() {
    for (let i = 0; i < inputTextFields.length; i++) {
        inputTextFields[i].value = "";
    }

    for (let i = 0; i < result.length; i++) {
        result[i].innerHTML = "";
    }

    planetImage.setAttribute('src', 'https://xurxe.github.io/Integrify-5b-cosmic-density/assets/solar-system.jpg');

    planetImage.setAttribute('alt', 'An illustration of our solar system.')
});



// define an array (planets). Each element is an object (planet).
// each object corresponds to a planet in the solar system; properties are the name and density of the planet.
// planets are ordered from lowest to highest density
const planets = [
    {
        name: 'Saturn',
        density: 0.69,
    },

    {
        name: 'Uranus',
        density: 1.27,
    },

    {
        name: 'Jupiter',
        density: 1.33,
    },

    {
        name: 'Neptune',
        density: 1.64,
    },

    {
        name: 'Mars',
        density: 3.93,
    },

    {
        name: 'Venus',
        density: 5.24,
    },

    {
        name: 'Mercury',
        density: 5.42,
    },

    {
        name: 'Earth',
        density: 5.51,
    },
]



// define function to generate density ranges
function addDensityRanges(array) {

    // for the planet with the lowest density, the density range is
    // from: 0
    // to: the middle point between its density and the density of the next planet
    array[0].densityRange = [
        0, 
        array[0].density + 0.5 * (array[1].density - array[0].density)
    ];

    // for most other planets, the density range is
    // from: the middle point between its density and the density of the previous planet
    // to: the middle point between its density and the density of the next planet

    for (let i = 1; i < array.length - 1; i++){
        array[i].densityRange = [
            array[i].density - 0.5 * (array[i].density - array[i - 1].density),
            array[i].density + 0.5 * (array[i + 1].density - array[i].density)
        ];
    }

    // for the planet with the highest density, the density range is 
    // from: the middle point between its density and the density of the previous planet
    // to: infinity
    let n = array.length - 1;

    array[n].densityRange = [
        array[n].density - 0.5 * (array[n].density - array[n - 1].density),
        Infinity
    ];

    // return array
    return array;

};

// execute the function on the planets-array
addDensityRanges(planets);



// select the calculation button
const calculateDensityButton = document.querySelector('#calculateDensityButton');

// when the button is clicked, execute the code below
calculateDensityButton.addEventListener('click', function() {
    // select the textboxes where the user enters the mass and volume
    const inputMass = document.querySelector('#inputMass');
    const inputVolume = document.querySelector('#inputVolume');

    // reset results, reset image, display warning, and terminate function if those fields are empty
    if (inputMass.value == "" || inputVolume.value == "") {
        for (let i = 0; i < result.length; i++) {
            result[i].innerHTML = "";
        }
    
        planetImage.setAttribute('src', 'https://xurxe.github.io/Integrify-5b-cosmic-density/assets/solar-system.jpg');
    
        planetImage.setAttribute('alt', 'An illustration of our solar system.')

        warning.innerHTML = 'Please fill out all fields.';

        return false;
    }

    // reset results, reset image, display warning, and terminate function if those fields contain anything other than positive numbers
    else if (!(inputMass.value > 0) || !(inputVolume.value > 0)) {
        for (let i = 0; i < result.length; i++) {
            result[i].innerHTML = "";
        }
    
        planetImage.setAttribute('src', 'https://xurxe.github.io/Integrify-5b-cosmic-density/assets/solar-system.jpg');
    
        planetImage.setAttribute('alt', 'An illustration of our solar system.')

        warning.innerHTML = 'Please enter only positive numbers.';

        return false;
    }

    // select the mass unit of the radio button chosen by the user
    const unitMass = document.querySelector('input[name=unitMass]:checked');

    // the mass is the value entered by the user
    const mass = inputMass.value;

    // the standard mass is the value entered in the textbox multiplied by the unit multiplier
    // (the default unit is g, so the multiplier is in terms of g. For example: 1 kg = 1000 g)
    const massStandard = inputMass.value * unitMass.value;



    // do the same as above for the volume
    const unitVolume = document.querySelector('input[name=unitVolume]:checked');
    const volume = inputVolume.value;
    const volumeStandard = inputVolume.value * unitVolume.value;



    // calculate the density (in the units selected by user)
    let density = mass / volume;

    // if it's a round number, keep as-is
    if (density === Math.round(density)) {
        density = density;
    }

    // if it's a decimal number more than 1, give two decimal figures
    else if (density > 1) {
        density = density.toFixed(2);
    }

    // if it's a decimal number less than 1, give two significant figures
    else {
        density = density.toPrecision(2);
    }



    // calculate the standar density (in g / cm^3)
    let densityStandard = massStandard / volumeStandard;

    // modify as above
    if (densityStandard === Math.round(densityStandard)) {
        densityStandard = densityStandard;
    }

    else if (densityStandard > 1) {
        densityStandard = densityStandard.toFixed(2);
    }

    else {
        densityStandard = densityStandard.toPrecision(2);
    }



    // loop through planets to find the planet closest in density
    for (i = 0; i < planets.length; i++) {
        if (planets[i].densityRange[0] <= densityStandard && densityStandard < planets[i].densityRange[1]) {
            planetName = planets[i].name;
            planetDensity = planets[i].density;
            break;
        }
    }

    // set planetImage to display that planet and adjust alt text accordingly
    planetImage.setAttribute('src', 'https://xurxe.github.io/Integrify-5b-cosmic-density/assets/' + planetName + '.jpg');

    planetImage.setAttribute('alt', 'A photo of' + planetName);


        
    // get the ID of the mass unit selected by the user
    const unitMassId = unitMass.getAttribute('id');

    // get the label associated with that ID
    const unitMassLabel = document.querySelector(`label[for=${unitMassId}]`).innerHTML;

    // do the same for the volume unit
    const unitVolumeId = unitVolume.getAttribute('id');
    const unitVolumeLabel = document.querySelector(`label[for=${unitVolumeId}]`).innerHTML;



    // write a sentence with the density of the object
    // if the user chose standard units, give result in g/cm^3
    if (unitMass.value == 1 && unitVolume.value == 1) {
        calculateDensityResult.innerHTML = `The density of your object is ${density}&nbsp;g&nbsp;/&nbsp;cm<sup>3</sup>.`;
    }

    // if the user chose other units, give result in selected units as well as standard units
    else {
        calculateDensityResult.innerHTML = `The density of your object is ${density}&nbsp;${unitMassLabel}&nbsp;/&nbsp;${unitVolumeLabel} (${densityStandard}&nbsp;g&nbsp;/&nbsp;cm<sup>3</sup>).`;
    }



    // define the density of the least and most dense planets
    const densitySaturn = 0.69;
    const densityEarth = 5.51;

    // write a sentence comparing the density of the object to the density of the closest planet
    // if the density is less than half the least dense planet (Saturn), display this:
    if (densityStandard < densitySaturn / 2){
        let x = Math.round(densitySaturn / densityStandard);
        compareToPlanet.innerHTML = `This is about ${x} times less dense than the least dense planet in our solar system - Saturn!`;
    }
    
    // if the density is more than half the least dense planet (Saturn), but less than twice the densest planet (Earth) display this:

    else if (densityStandard < densityEarth * 2){
        compareToPlanet.innerHTML = `This is closest to the density of ${planetName}, which is ${planetDensity} g&nbsp;/&nbsp;cm<sup>3</sup>.`;
    }
    
    // if the density is more than twice the densest planet (Earth), display this:
    else {
        let y = Math.round(densityStandard / densityEarth);
        compareToPlanet.innerHTML = `This is about ${y} times denser than the densest planet in our solar system - Earth!`;
    }


    
    // scroll to show the planet and result text
    calculateDensityResult.scrollIntoView();
});