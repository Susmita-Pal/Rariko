const url="https://ethgasstation.info/api/ethgasAPI.json?";
const lowGasId=document.getElementById("lowestGas");

async function gas(){
    setInterval(function () {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                //console.log(data['safeLow']);
                lowGasId.innerHTML=data['safeLow'];
            }),1000});
}

async function login(){
console.log("Login");
window.solana.connect;
window.solana.request({method:"connect"});
}

async function logout() {
    window.solana.disconnect();
    window.solana.on('disconnect',()=>{
        console.log("Disconnected");
});
}

gas();