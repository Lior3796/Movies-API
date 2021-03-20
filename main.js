let baseApi = 'https://api.tvmaze.com/search/shows?q=';

function getShow(show) {
  return fetch(`${baseApi}${show}`, {})
    .then((response) => {
      return response.json();
    })

}

async function showSearch() {
  let favoriteShow;
  try {

    let containter = document.getElementById("container");
    containter.innerText = '';
    let movieChoice = document.getElementById("floatingInputValue").value;

    favoriteShow = await getShow(movieChoice);
    favoriteShow.forEach(element => {
      let showObject = element.show;

      for (let key in showObject) {
        switch (key) {
          case "url":
            containter.innerHTML += `<div><a href="${showObject[key]}">link</></div>`;
            break;
          case "genres":
            
            if(showObject[key].length === 0) {
            containter.innerHTML += "no genre";
             }
            else{
              
            containter.innerHTML += `<div><h1>${showObject[key][0]}</h1></div>`;

            }
            break;
           
          case "name":

            containter.innerHTML += `<div><h1>${showObject[key]}</h1></div>`;

            break;
          case "image":
            if(showObject[key].medium === null){
              console.log("no image movie");  
            }
            containter.innerHTML += `<img src="${showObject[key].medium}"></img>`

        }

      }
      console.log(element.show);

    });
  }
  catch (res) {
    console.log(res);
  }
  finally {
    if(favoriteShow.length === 0){
      document.write("no movie in the list")
    }
    console.log("success");
  }
}