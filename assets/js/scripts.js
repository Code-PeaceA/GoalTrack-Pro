

// Nav - bottom shadow when scrolling
const headerNav = document.querySelector('#headerNav');

// Function to handle scroll event
function handleScroll() {
    if (window.scrollY > 10) {
        headerNav.classList.add('floatingNav');
    } else {
        headerNav.classList.remove('floatingNav');
    }
}

window.addEventListener('scroll', handleScroll);


//API fetch for highlight video
const highlightVideoContainer = document.querySelector('#highlightVideoContainer');
const highlightVideo = document.createElement('div');
highlightVideoContainer.appendChild(highlightVideo);

const highlightVideoHeader = document.querySelector('.highlightVideoHeader');
const highlightVideoCompetition = document.querySelector('.highlightVideoCompetition');
const highlightVideoDate = document.querySelector('.highlightVideoDate');

const videoCarouselContainer = document.querySelector('#videoCarouselContainer');

const highlightVideoURL = 'https://www.scorebat.com/video-api/v3/feed/?token=MTMyMDY5XzE3MDA5NDgwODZfMGMzMmU0MzAyMDliNWE2ODZiYmE3ZDc3ZTU1OTU4MjIyYzg3YmVhNw==';

fetch(highlightVideoURL)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        // fetch latest video in video container in DOM
        highlightVideo.innerHTML = data.response[0].videos[0].embed;

        // fetch header
        highlightVideoHeader.innerText = `${data.response[0].title} | ${data.response[0].videos[0].title}`;

        // fetch competition
        highlightVideoCompetition.innerText = data.response[0].competition;

        // fetch competition
        dateTime = new Date(data.response[0].date);
        const formattedDate = dateTime.toLocaleDateString('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = dateTime.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });
        highlightVideoDate.innerText = `${formattedDate} | ${formattedTime}`

        // fetch list of up to 7 other videos to be put into a carousel and when a video is clicked, it is played in main highlightVideo
        const responseArray = data.response.slice(1, 11);
        responseArray.forEach(response => {
            // create video container
            const videoContainer = document.createElement('img');
            videoContainer.classList.add('videoContainer');
            videoContainer.src = response.thumbnail;
            videoContainer.style.cursor = 'pointer';
            videoCarouselContainer.appendChild(videoContainer);
            
            videoContainer.addEventListener('click', () => {
                // fetch clicked video in video container in DOM
                highlightVideo.innerHTML = response.videos[0].embed;

                // fetch header
                highlightVideoHeader.innerText = `${response.title} | ${response.videos[0].title}`;

                // fetch competition
                highlightVideoCompetition.innerText = response.competition;

                // fetch competition
                dateTime = new Date(response.date);
                const formattedDate = dateTime.toLocaleDateString('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit' });
                const formattedTime = dateTime.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });
                highlightVideoDate.innerText = `${formattedDate} | ${formattedTime}`
            })
        })

    })
    .catch(err => {
        console.log(`error ${err}`)
    });


// API Fetch for news
const newsContainer = document.querySelector('#newsContainer');

const newsURL = 'https://newsapi.org/v2/top-headlines?apiKey=aad5a966ca7c49d9b50683fe53861111&category=sports&country=gb';

fetch(newsURL)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        const top10Articles = data.articles.slice(0, 10);
        top10Articles.forEach(article => {
            // create article section
            const articleContainer = document.createElement('div');
            articleContainer.classList.add('articleContainer');
            newsContainer.appendChild(articleContainer);

            // create news header element that links to full article site
            const articleHeader = document.createElement('h5');
            const articleHeaderLink = document.createElement('a');
            articleHeaderLink.href = article.url;
            articleHeaderLink.innerText = article.title;
            articleHeader.appendChild(articleHeaderLink);

            // Create date and source elements
            const articleSource = article.source.name;
            const dateTime = new Date(article.publishedAt);
            const formattedDate = dateTime.toLocaleDateString('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const formattedTime = dateTime.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });
            const articlePublishedDateTime = `${formattedDate} | ${formattedTime}`
            const articleHeaderSpan = document.createElement('span');
            articleHeaderSpan.classList.add('headerSpan');
            articleHeaderSpan.innerText = `Source: ${articleSource} - ${articlePublishedDateTime}`;

            // create description element
            const articleDescription = document.createElement('p');
            if (article.description) {
                articleDescription.innerText = article.description;
            }

            // create divider element
            const articleDivider = document.createElement('hr');
            articleDivider.classList.add('articleDivider')

            
            // append article elements into article container
            const articleArray = [articleHeader, articleHeaderSpan, articleDescription, articleDivider]
            articleArray.forEach(article => articleContainer.append(article));
        })
    })
    .catch(err => {
        console.log(`error ${err}`)
    });


// API fetch for Fixtures Banner

const fixturesURL = 'https://api.football-data.org/v4/matches/';
const options = {
    method: 'GET',
    headers: {
        'X-Auth-Token': '25782a2f939b4582bf23c94b293b8317',
        // 'Access-Control-Allow-Origin': 'http://localhost',
    }
};

fetch(fixturesURL, options)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(`error ${err}`)
    });



// const fixturesURL = 'https://football98.p.rapidapi.com/premierleague/fixtures';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3fd9b7f2c5msh54e654c2fb9f2b7p11e360jsn06884891fa6f',
// 		'X-RapidAPI-Host': 'football98.p.rapidapi.com'
// 	}
// };

// fetch(fixturesURL, options)
//     .then(res => res.json()) //parse response as JSON
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     });




/*
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
*/



// Mobile Menu

const mobileNavMenu = document.querySelector('.mobileNavMenu');
const menuContainer = document.querySelector('.menuContainer');

let openMenu = false;

mobileNavMenu.addEventListener('click', () => {
    if (openMenu == false) {
        menuContainer.style.display = 'flex';
        headerNav.style['background-color'] = 'var(--neutralColor)';
        headerNav.style['border-radius'] = '50px';
        headerNav.style['flex-direction'] = 'column';
        headerNav.style['align-items'] = 'flex-end';
        headerNav.style['padding'] = '3rem 2rem';
        headerNav.style['gap'] = '1rem';
        headerNav.style['min-width'] = 'calc(180px + 4rem)';
        headerNav.style['width'] = '35%';
        openMenu = true;
    } else {
        menuContainer.style.display = 'none';
        headerNav.style['background-color'] = 'var(--primaryColor)';
        headerNav.style['flex-direction'] = 'row';
        headerNav.style['justify-content'] = 'flex-end';
        headerNav.style['padding'] = '0 2rem';
        headerNav.style['min-width'] = null;
        headerNav.style['width'] = '6rem';

        openMenu = false;
    }
});