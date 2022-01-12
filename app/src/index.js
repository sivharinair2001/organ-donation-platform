// Import Web3 JS library
const Web3 = require('web3');

// Import the ABI definition of the DemoContract
const artifact = require('../../build/contracts/DonorContract.json');

const contractAddress = '0x4087239468dB429a6a7e61c6fEc1FE5Fbbe8b484';

const MIN_GAS = 1000000;

const App = {
    web3: null,
    contractInstance: null,
    accounts: null,

    start: async function() {
        const { web3 } = this;
        // Get the accounts
        this.accounts = await web3.eth.getAccounts();

        console.log(this.accounts);

        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress
        );
    },

    setDonors: async function() {
        const firstname = document.getElementById('donorFirstName').value;
        const lastname = document.getElementById('donorLastName').value;
        const age = document.getElementById('donorAge').value;
        const gender = document.getElementById('donorGender').value;
        const medical_id = document.getElementById('donorMedicalID').value;
        const blood_type = document.getElementById('donorBloodType').value;
        const organ = document.getElementById('donorOrgan').value;
        const location = document.getElementById('donorLocation').value;

        console.log(firstname, lastname, age, gender, medical_id, blood_type, organ, location);
        const gas = await this.contractInstance.methods.setDonors(firstname, lastname, age, gender, medical_id, blood_type, organ, location).estimateGas({
            from: this.accounts[0]
        });
        await this.contractInstance.methods.setDonors(firstname, lastname, age, gender, medical_id, blood_type, organ, location).send({
            from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
        });
    },
    getDonor: async function() {
        const medical_id = document.getElementById('inputDonorMedicalID').value;
        await this.contractInstance.methods.getDonor(medical_id).call().then(function(result){
            console.log(result);
            document.getElementById("getDonorFirstName").innerHTML = "First Name: " + result[0];
            document.getElementById("getDonorLastName").innerHTML = "Last Name: " + result[1];
            document.getElementById("getDonorAge").innerHTML = "Age : " + result[2];
            document.getElementById("getDonorGender").innerHTML = "Gender : " + result[3];
            document.getElementById("getDonorBloodType").innerHTML = "Blood Type : " + result[4];
            document.getElementById("getDonorOrgan").innerHTML = "Organ : " + result[5];
            document.getElementById("getDonorLocation").innerHTML = "Location : " + result[6];
        });
    },
    setPatients: async function() {
        const firstname = document.getElementById('patientFirstName').value;
        const lastname = document.getElementById('patientLastName').value;
        const age = document.getElementById('patientAge').value;
        const gender = document.getElementById('patientGender').value;
        const medical_id = document.getElementById('patientMedicalID').value;
        const blood_type = document.getElementById('patientBloodType').value;
        const organ = document.getElementById('patientOrgan').value;
        const location = document.getElementById('patientLocation').value;        

        console.log(firstname, lastname, age, gender, medical_id, blood_type, organ, location);
        const gas = await this.contractInstance.methods.setPatients(firstname, lastname, age, gender, medical_id, blood_type, organ, location).estimateGas({
            from: this.accounts[0]
        });
        await this.contractInstance.methods.setPatients(firstname, lastname, age, gender, medical_id, blood_type, organ, location).send({
            from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
        });
    },
    getPatient: async function() {
        const medical_id = document.getElementById('inputPatientMedicalID').value;
        await this.contractInstance.methods.getPatient(medical_id).call().then(function(result){
            console.log(result);
            document.getElementById("getPatientFirstName").innerHTML = "First Name: " + result[0];
            document.getElementById("getPatientLastName").innerHTML = "Last Name: " + result[1];
            document.getElementById("getPatientAge").innerHTML = "Age : " + result[2];
            document.getElementById("getPatientGender").innerHTML = "Gender : " + result[3];
            document.getElementById("getPatientBloodType").innerHTML = "Blood Type : " + result[4];
            document.getElementById("getPatientOrgan").innerHTML = "Organ : " + result[5];
            document.getElementById("getPatientLocation").innerHTML = "Location : " + result[6];
        });
    },
    getCountOfDonors: async function() {
        const data = await this.contractInstance.methods.getCountOfDonors().call();
        alert('Data is ' + data);
    },
    getCountOfPatients: async function() {
        const data = await this.contractInstance.methods.getCountOfPatients().call();
        alert('Data is ' + data);
    },
    getAllDonorIDs: async function() {
        const data = await this.contractInstance.methods.getAllDonorIDs().call();
        alert('Data is ' + data);
    },
    getAllPatientIDs: async function() {
        const data = await this.contractInstance.methods.getAllPatientIDs().call();
        alert('Data is ' + data);
    }
}

window.App = App;

window.addEventListener("load", function() {
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );

  App.start();
});