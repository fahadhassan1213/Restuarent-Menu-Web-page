var firebaseConfig = {
    apiKey: "AIzaSyAWOd74-sErfhp7nsfzKKWox3bALTe8XvA",
    authDomain: "restaurant-menu-19e5f.firebaseapp.com",
    projectId: "restaurant-menu-19e5f",
    storageBucket: "restaurant-menu-19e5f.appspot.com",
    messagingSenderId: "165742788679",
    appId: "1:165742788679:web:2f2347d7b8badc122a7162",
    measurementId: "G-Z2SST2YQJN"
  };

//Firebase initialization  
firebase.initializeApp(firebaseConfig);

//FireStore initialization
const db = firebase.firestore();

// General Purpose Varibales


const getTitles = document.querySelectorAll('.foodTitle');
const getPrice = document.querySelectorAll('.foodPrice');
const getDetail = document.querySelectorAll('.food-detail p')
const getfoodDetails = document.querySelectorAll('.food-detail')
const getfoodimages = document.querySelectorAll('.food-image')
const categories =  document.querySelector('.categories')


//Fucntion to display or to get All the details about Food Menu from Firebase & Firestore Database
const All = () =>{
    let count = 0;

    Array.from(getfoodDetails).forEach(item=>{
        item.parentElement.classList.remove('d-none');
    })

    db.collection('Menu').get().then((snapshot =>{
        snapshot.docs.forEach(doc =>{
            getTitles[count].innerHTML = doc.data().Title;
            getPrice[count].innerHTML = doc.data().Price;
            getDetail[count].innerHTML = doc.data().Detail;
            count ++
        })
    })).catch(err=>{
        console.log(err)
    })
    
}
All();


//Function to display the food according to the user selected category
const categoryDetail = (category) =>{
    let count = 0

    //Every time we have to check that if is there any div whose display is none
    //if display is none the we have to remove its d-none property form its classList
    Array.from(getfoodDetails).forEach(item=>{
        item.parentElement.classList.remove('d-none');
    })

    db.collection('Menu').get().then((snapshot =>{
        snapshot.docs.forEach(doc =>{
            if(doc.data().Type !== category){

            //if type of a food will not be equal to our searched category then we will add d-none property to its classList 
            //We are doing this because we just want to show the user required category food.

               getfoodDetails[count].parentElement.classList.add('d-none')
               count++

            }
            else{

                //if food type matches with user required category then it will be displayed to the user 

                getTitles[count].innerHTML = doc.data().Title;
                getPrice[count].innerHTML = doc.data().Price;
                getDetail[count].innerHTML = doc.data().Detail;
                count++
            }
        })
    })).catch(err=>{
        console.log(err)
    })
}



categories.addEventListener('click',e=>{
    console.log(e.target.innerHTML)

    if(e.target.innerHTML === `Breakfast`){
        categoryDetail(e.target.innerHTML);

    }else if(e.target.innerHTML === `Lunch`){
        categoryDetail(e.target.innerHTML);

    }
    else if(e.target.innerHTML === `Shake`){
        categoryDetail(e.target.innerHTML);

    }
    else if(e.target.innerHTML === `Dinner`){
        categoryDetail(e.target.innerHTML);

    }
    else if(e.target.innerHTML === `All`){
        All();

    }
})

