
const imageConatiner = document.getElementById('image-container')
const loader = document.getElementById('loader')

const imgCount = 10;
let loadCount = 0;
let totalImageCount = 0;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=HcWYEDIHm7ggBPORRoI-VM0CBQ38jasQ8cTjEYnmjXY&count=${imgCount}`;
let imagesArr = [];
let ready = false;

async function getImages() {
    const response = await fetch(apiUrl);
    const array = await response.json();
    return array;
}

function createElementFormHtml(htmlStr) {
    const div = document.createElement('div');
    div.innerHTML = htmlStr;
    return div.children[0];
}

function renderImagesToElements(images) {
    return images.map((image) => {
        const html = `
            <a href="${image.links.html}">
                <img src="${image.urls.regular}" alt="${image.alt_description}" title="${image.alt_description}"/>
            </a>
        `;
        return createElementFormHtml(html);
    });
}

function renderImages(container, images) {
    const imageElements = renderImagesToElements(images);
    container.append(...imageElements);
}

getImages().then(array => {
    totalImageCount += array.length
    renderImages(imageConatiner, array);
})


imageConatiner.addEventListener('load', () => {
    loadCount++
    if (loadCount === totalImageCount) {
        ready = true;
        loader.hidden = true
    }
}, true)

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getImages().then(array => {
            totalImageCount += array.length
            renderImages(imageConatiner, array);
        })
    }
})