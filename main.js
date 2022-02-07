const  url="https://ethgasstation.info/api/ethgasAPI.json?";
const lowGasId=document.getElementById("lowestGas");
const NFTaddr="0x5vRGErJbhNEKbuiaZfiZg52t7wFjqpnZfpikpm7JScK8";
const nftCollectionName="girlies-nft";
const nftItemName="Prime Kong Planet #4105";
const urlNFTDetails="https://api.opensea.io/api/v1/collection/"+nftCollectionName;
const urlFetchAppNFTs="https://api.opensea.io/api/v1/collections?&limit=300";
const serverUrl ="https://gwcryno2hsds.usemoralis.com:2053/server";
const appId = "lmEdCuiTpOke6eeQHHB3VXlacngBDxcdaMQ3wVSH";

Moralis.start({ serverUrl, appId });

async function gas(){
    setInterval(await function () {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                //console.log(data['safeLow']);
                lowGasId.innerHTML ="Gas-Safe Low: "+ data['safeLow']+"Gas-Fast"+data['fast']+"Gas-Fastest: "+data['fastest'];
            }), 1000
    });
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
async function nftMarketplace(){
    fetch(urlFetchAppNFTs)
        .then(response=>response.json())
        .then(data=>{
            let nftCollectionArr=data["collections"];
            //console.log(nftCollectionArr.length);
            nftCollectionArr.forEach(function (item,index) {

                let slug=item["slug"];
                let vol=item["stats"]["total_volume"];
                console.log(vol+slug);
                //displayNFTMarketplace(slug);
                //item["featured_image_url"]
                //document.getElementById("nft-marketplace").innerHTML+=slug+"<br>";
                /* Display images on the screen
                if(item["featured_image_url"]!=null)
                    document.getElementById('nft-marketplace-img').src+=item["featured_image_url"];*/
            });
        })

}

async function getTokenMeta() {
    //it gives the metadata information of NFT-- Prime Kong Planet #4105
    const options = { q: nftItemName, chain: "eth", filter: "name" };
    const NFTs = await Moralis.Web3API.token.searchNFTs(options);
    console.log("NFT Meta",NFTs);
    let metaNFTString=NFTs["result"][0]["metadata"]
 /*   let splitMetaNFTString="https://"+metaNFTString.split('//')[1].split(',')[0].split("\"")[0];
    let imgUrl="\""+splitMetaNFTString.replace(/^"(.*)"$/, '$1')+"\"";
    console.log("Img: ",imgUrl);

    document.getElementById('imgNFT').src=imgUrl;*/
    let tokenUriNFT=NFTs["result"][0]["token_uri"]
    console.log(tokenUriNFT);
    fetch(tokenUriNFT)
        .then(response=> response.json())
        .then(data=>{
             console.log("IMage NFT URL",data['image']);
             arr=data['image'].split(':');
             if(arr[0]=="ipfs"){
                 console.log("https://ipfs.io/ipfs/"+arr[1].substring(2));
                 document.getElementById('imgNFT').src="https://ipfs.io/ipfs/"+arr[1].substring(2);
             }
             else
                document.getElementById('imgNFT').src=data['image'];
        });
}

async function getNFTCollectionDetails() {/*
    const options = { address: NFTaddr, days: "3" };
    const NFTLowestPrice = await Moralis.Web3API.token.getNFTLowestPrice(options);
    console.log(NFTLowestPrice);
    document.getElementById("NFTFloor").innerHTML=NFTLowestPrice["price"];*/
    fetch(urlNFTDetails)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const collection=data["collection"];
            const stats=collection["stats"];
            const marketCap = stats["market_cap"];
            const totalSupply = stats["total_supply"];
            const floorPrice = stats["floor_price"];
            const vol1d = stats["one_day_volume"];
            const vol7d = stats["seven_day_volume"];
            document.getElementById("NFTFloor").innerHTML="Floor Value: "+floorPrice;
            document.getElementById("NFT-total-supply").innerHTML="Total Supply: "+totalSupply;
            document.getElementById("NFT-market-cap").innerHTML="Market Cap: "+marketCap;
            document.getElementById("NFT-1d-vol").innerHTML="Volume-1d: "+vol1d;
            document.getElementById("NFT-7d-vol").innerHTML="Volume-7d: "+vol7d;
            document.getElementById('banner-NFT').src=collection["banner_image_url"];
            document.getElementById('collection-img-NFT').src=collection['image_url'];
            document.getElementById('NFT-name').innerHTML="Name: "+collection['name'];
            document.getElementById('NFT-desc').innerHTML="Description: "+collection['description'];
        });
}

async function displayNFTMarketplace(slug){
    let urlNFTMarketplace="https://api.opensea.io/api/v1/collection/"+slug;

    fetch(urlNFTMarketplace)
        .then(response => response.json())
        .then(data => {
            let collection=data["collection"];
            let stats=collection["stats"];
            let marketCap = stats["market_cap"];
            let totalSupply = stats["total_supply"];
            let floorPrice = stats["floor_price"];
            let vol1d = stats["one_day_volume"];
            let vol7d = stats["seven_day_volume"];
            let bannerUrl=collection["banner_image_url"];
            let imageUrl=collection['image_url'];
            let name=collection["name"];
            let desc=collection["description"];
            console.log(name);
        });
}
/*    async function getFloorPrice(slug) {
        try {
            const url = `https://api.opensea.io/collection/${slug}/stats`;
            const response = await axios.get(url);
            console.log(response.data.stats.floor_price);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    getFloorPrice("lostpoets");
     getFloorPrice("treeverse");
     getFloorPrice("cool-cats-nft");*/


gas();
