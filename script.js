// style text fields
const inputTextFields = document.querySelectorAll('input[type="text"]');
for (let i = 0; i < inputTextFields.length; i++) {
    inputTextFields[i].style.outline = 'none';
    inputTextFields[i].style.fontSize = '0.8rem';
    inputTextFields[i].style.width = '100%';
    inputTextFields[i].style.padding = '0.1rem 0.3rem';
}

// style radio buttons
const inputRadioButtons = document.querySelectorAll('input[type="radio"]');
for (let i = 0; i < inputRadioButtons.length; i++) {
    inputRadioButtons[i].style.outline = 'none';
    inputRadioButtons[i].style.margin = '0 0.5rem 0 1rem';
}

// style submit button
const submitButton = document.querySelector('button[type="submit"]');
for (let i = 0; i < inputRadioButtons.length; i++) {
    submitButton.style.fontSize = '1rem';
    submitButton.style.padding = '0 1rem';
    submitButton.style.width = '80%';
    submitButton.style.height = '3rem';
    submitButton.style.margin = '1rem 10%';

}



// define an array (planets). each element is an object (planet).
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

const densityEarth = 5.51;


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

    // terminate function if those fields contain anything other than 0 or positive numbers
    if (inputMass.value == "" || inputVolume.value == "") {
        calculateDensityResult.innerHTML = 'Please fill out all fields.';
        return false;
    }

    else if (!(inputMass.value > 0) || !(inputVolume.value > 0)) {
        calculateDensityResult.innerHTML = 'Please enter only positive numbers.';
        return false;
    }

    // select the mass unit of the radio button chosen by the user
    const unitMass = document.querySelector('input[name=unitMass]:checked');

    // the mass is the value entered in the textbox multiplied by the unit multiplier
    // (the default unit is g, so the multiplier is in terms of g. For example: 1 kg = 1000 g)
    const mass = inputMass.value;
    const massStandard = inputMass.value * unitMass.value;

    // do the same as above for the volume
    const unitVolume = document.querySelector('input[name=unitVolume]:checked');
    const volume = inputVolume.value;
    const volumeStandard = inputVolume.value * unitVolume.value;



    // calculate the density
    const density = mass / volume;
    const densityStandard = massStandard / volumeStandard;



    // get the ID of the mass unit selected by the user
    const unitMassId = unitMass.getAttribute('id');

    // get the label associated with that ID
    const unitMassLabel = document.querySelector(`label[for=${unitMassId}]`).innerHTML;

    // do the same for the volume unit
    const unitVolumeId = unitVolume.getAttribute('id');
    const unitVolumeLabel = document.querySelector(`label[for=${unitVolumeId}]`).innerHTML;



    // write a sentence with the density of the object

    if (unitMass.value == 1 && unitVolume.value == 1) {
        calculateDensityResult.innerHTML = `The density of your object is ${density} ${unitMassLabel} / ${unitVolumeLabel}.`;
    }

    else {
        calculateDensityResult.innerHTML = `The density of your object is ${density} ${unitMassLabel} / ${unitVolumeLabel}, which is the same as ${densityStandard} g / cm<sup>3</sup>.`;
    }



    // loop through planets to find the planet closest in density
    for (i = 0; i < planets.length; i++) {
        if (planets[i].densityRange[0] <= densityStandard && densityStandard < planets[i].densityRange[1]) {
            planetName = planets[i].name;
            planetDensity = planets[i].density;
            break;
        }
    }



    // write a sentence comparing the density of the object to the density of that planet
    if (densityStandard < 10){
        compareToPlanet.innerHTML = `This is closest to the density of ${planetName}, which is ${planetDensity} g / cm<sup>3</sup>.`;
    }
    
    else {
        let x = Math.round(densityStandard / densityEarth);
        compareToPlanet.innerHTML = `This is about ${x} times denser than the densest planet in our solar system - Earth!`;
    }
});