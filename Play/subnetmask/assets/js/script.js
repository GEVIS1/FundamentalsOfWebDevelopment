// Fetch the inputs
let address = document.getElementById(`addr`);
let network = document.getElementById(`netw`);
let netMask = document.getElementById(`mask`);

// Variables
let layout = `???.???.???.???/???`
let output = [  0,  0,  0,  0,  0];
let ipAddress;
let ipNetwork;
let ipMask;

// Functions
const parseInput = (input) => {
    let charIndex = 0;
    let octet = 0;
    let prefixFound = false;

    input.forEach(char => {
        switch (char) {
            // Add number to array
            case Number:
            
                break;

            // Increment 
            case `.`:
            
                break;

            case `/`:
                prefixFound = true;
                break;

            default:
                break;
        }
        
        }
    );
};

address.addEventListener(`change`, () => {
    ipAddress = address.value;
    console.log(ipAddress);
});

