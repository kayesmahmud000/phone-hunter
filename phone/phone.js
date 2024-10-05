

const loadPhoneData= async(isShowAll,brandName)=>{
    document.getElementById('spinner').classList.add('hidden')
    
    const url =`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:"iphone"}`
    const res = await fetch(url);
    const data =await res.json();
  if(data.data.length===0){
    document.getElementById('phone-container').innerHTML=`<p class="  text-3xl text-cyan-300 ">No Data found</p>`
    return
  }
    if(isShowAll){
        displayPhoneData(data.data)
    }else{
        displayPhoneData(data.data.slice(0,6))

    }
    
}

const displayPhoneData=(phones)=>{
    document.getElementById('phone-container').innerHTML=""
       const phoneContainer=document.getElementById('phone-container')

       phones.forEach(phone=> {
        const {image,phone_name,brand,slug}=phone
        const div=document.createElement("div");
        div.innerHTML=`
        <div class="card bg-base-100  shadow-xl">
            <figure class="px-10 pt-10">
                <img
                src="${image}"
                 alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone_name}</h2>
                <p>${brand}</p>
                <p>${slug}</p>
                 <div class="card-actions">
                 
                <button onclick="phoneDetails('${slug}')" class="btn btn-primary"> Details</button>
                 </div>
             </div>
        </div>
        `
        phoneContainer.append(div)
        
       });
}
const handelShowAll=()=>{
    const searchText =document.getElementById('search-text').value

    loadPhoneData(true,searchText)
}

const handleSearch=()=>{
    document.getElementById('spinner').classList.remove('hidden')
const searchText =document.getElementById('search-text').value

    setTimeout(function(){
        loadPhoneData(false,searchText)
    },3000)
}
// const obj={
//     "status": true,
//     "data": {
//       "mainFeatures": {
//         "storage": "128GB/256GB/1TB storage, no card slot",
//         "displaySize": "6.7 inches, 109.8 cm2 (~87.4% screen-to-body ratio)",
//         "chipSet": "Apple A15 Bionic (5 nm)",
//         "memory": "128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM, 1TB 6GB RAM",
//         "sensors": [
//           "Face ID",
//           "accelerometer",
//           "gyro",
//           "proximity",
//           "compass",
//           "barometer"
//         ]
//       },
//       "slug": "apple_iphone_13_pro_max-11089",
//       "name": "iPhone 13 Pro Max",
//       "releaseDate": "Released 2021, September 24",
//       "brand": "Apple",
//       "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
//       "others": {
//         "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot",
//         "Bluetooth": "5.0, A2DP, LE",
//         "GPS": "Yes, with A-GPS, GLONASS, GALILEO, BDS, QZSS",
//         "NFC": "Yes",
//         "Radio": "No",
//         "USB": "Lightning, USB 2.0"
//       }
//     }
//   }

const phoneDetails= async(slug)=>{
    
    const url=`https://openapi.programming-hero.com/api/phone/${slug}`
    const res =await fetch(url);
    const data =await res.json()
   
    const {brand, image, name,releaseDate} =data.data
    const {storage, displaySize,chipSet,memory}=data.data.mainFeatures
    const[first,second,third,fourth,fifth,sixth ]=data.data.mainFeatures.sensors
    const modalContainer=document.getElementById('show-modal')
    modalContainer.innerHTML=`
     <dialog id="my_modal_1" class="modal">
             <div class="modal-box">

                    <h3 class="text-lg font-bold">${name}</h3>
                    <img class="py-4" src="${image}"/>
                    <p class="py-4">${brand}</p>
                    <p>${storage}</p>
                    <p>${displaySize}</p>
                    <p>${chipSet}</p>
                    <p>${memory}</p>
                    <p> sensors: ${first}, ${second}, ${third}, ${fourth}, ${fifth}, ${sixth}</p>
                    <p>${releaseDate}</p>
                    
                    <div class="modal-action">
            <form method="dialog">
             <button class="btn">Close</button>
            </form>
            </div>
            </div>
        </dialog>
    `
    my_modal_1.showModal()
}
loadPhoneData(false, "iphone")