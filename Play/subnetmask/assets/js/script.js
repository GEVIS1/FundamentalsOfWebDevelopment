// Fetch the inputs
let address = document.getElementById(`addr`);
let network = document.getElementById(`netw`);
let netMask = document.getElementById(`mask`);
let dottedMask = document.getElementById(`dotted`);

// Variables
// 192.168.1.34/24
let layout = `???.???.???.???/???`
const one = `1`;
const zero = `0`;
const IPV4_BIT_LENGTH = 32;
const PREFIX_INDEX = 4;
const LAST_OCTET = 3;
const OCTET = 8;
const BINARY = 2;
let output = [  0,  0,  0,  0,  0];
let ipAddress;
let ipNetwork;
let ipMask;

// Functions
const calculateSubnet = () => {
    console.log(address.value);

    let inputArr = splitOctets(address.value);
    
    let prefix = splitPrefix(inputArr);

    // Pop the last element out of the array
    inputArr.pop();
    console.log(`Missing last octet and prefix: `, inputArr);
    
    inputArr = insertSplitPrefix(inputArr, prefix);

    const prefixNum = inputArr[PREFIX_INDEX];

    try{
        (prefixNum > 0) && (prefixNum <= IPV4_BIT_LENGTH)
    }
    catch (e) {
        console.log(e);
    };

    // Finished array
    console.log(`Extracted data: `, inputArr);

    ipMask = createIpMask(inputArr);

    console.log(`The network mask is: `, ipMask);

    netMask.value = ipMask;
    let netMaskArray = [];

    for (let index = 0; index < IPV4_BIT_LENGTH; index += OCTET) {
        netMaskArray.push(ipMask.substring(index, index + OCTET));
        console.log(netMaskArray);
    }

    let dotted = ``;
    let count = 0;
    netMaskArray.forEach((octet) => {
        dotted += parseInt(octet, BINARY);
        if (count < LAST_OCTET){
            dotted += `.`;
        }
        count++;
    });

    dottedMask.value = dotted;

};

const splitOctets = (value) => {
    // Split the octets
    let octetArray = value.split(`.`);
    console.log(`splitOctets: `, octetArray);
    return octetArray;
};

const splitPrefix = (value) => {
    // Split the prefix from the last octet
    let splitPrefixArray = value[value.length - 1].split(`/`);
    console.log(`splitPrefix: `, splitPrefixArray);
    return splitPrefixArray;
}

const insertSplitPrefix = (inputArray, prefix) => {
    // Push each entry from the prefix into the array
    prefix.forEach(element => {
        console.log(`insertSplitPrefix: Inserting: `, element);
        inputArray.push(element);
    });
    return inputArray;
}

const createIpMask = (input) => {
    let prefix = input[PREFIX_INDEX]; 
    let networkPortion;
    console.log(`createIpMask: Number of network bits is: `, prefix)

    try{    
        networkPortion = one.repeat(prefix);
    }
    catch (e) {
        if  (e instanceof RangeError){
            // Tell user the prefix is wrong
            console.log(`Prefix is not within range!`)
        }
        return `Erroneous prefix.`;
    }
    console.log(`createIpMask: Network portion of mask is: `, networkPortion);
    let padding = IPV4_BIT_LENGTH - networkPortion.length;
    console.log(`createIpMask: Number of host bits is: `, padding)
    let hostPortion = zero.repeat(padding);
    console.log(`createIpMask: Host portion of mask is: `, hostPortion);
    return networkPortion + hostPortion;
};

let binary = 34;
binary = binary.toString(2);
console.log(binary);
address.addEventListener(`change`, calculateSubnet);

