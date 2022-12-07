
//********************************************
//Видалити цей об'єкт після злиття,
//його замінить об'єкт фільму
let currentMovie = {
    id: 3,
    imgAddress: "Address123"
};
//*******************************************

const storageKeys={
    watched: "watched",
    queue: "queue",
};

const addWatchedBtn = document.querySelector('.watched-btn');
const addQueueBtn = document.querySelector('.queue-btn');

addWatchedBtn.addEventListener("click", onAddWatchedBtn);
addQueueBtn.addEventListener("click", onAddQueueBtn);

/**  Записує об'єкт фільму до localStorage
 * 
 * @param {*} key ключ
 * @param {*} movie об'єкт фільму
 * @returns нічого не повертає
 */
 function addMovieToStorage(key, movie){ 

    let storageMoviesStr;
    let movieStr;

    try {
        storageMoviesStr = localStorage.getItem(key);
        movieStr = JSON.stringify([movie]);          

        if(!storageMoviesStr){

            localStorage.setItem(key, movieStr);
            addWatchedBtn.textContent = "REMOVE WATCHED";
            return;
        }

        let storageMoviesObj = JSON.parse(storageMoviesStr);
        
        for(let i=0; i< storageMoviesObj.length; i++){
            if(storageMoviesObj[i].id === movie.id){
                
                storageMoviesObj.splice(i,1);
                localStorage.setItem(key, JSON.stringify(storageMoviesObj));
                addWatchedBtn.textContent = "ADD TO WATCHED";
                return;
            }
        }         
        
        storageMoviesObj.push(movie);        
        localStorage.setItem(key, JSON.stringify(storageMoviesObj));
        addWatchedBtn.textContent = "REMOVE WATCHED";
             
    }
    catch(error){
        console.log("addMovieToStorage() error: ", error.message);
    }  
}

/** Обробка натискання "ADD TO WATCHED" */
function onAddWatchedBtn(event) {
   // currentMovie.id ++;
    //currentMovie.imgAddress += JSON.stringify(currentMovie.id) ;
    addMovieToStorage(storageKeys.watched, currentMovie);
}

/** Обробка натискання "ADD TO QUEUE" */
function onAddQueueBtn(event) {

    addMovieToStorage(storageKeys.queue, currentMovie);    
}

