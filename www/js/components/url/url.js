var path = window.location.pathname.split('/');
var fileName = path[path.length - 1];
fileName = fileName.slice(0, fileName.lastIndexOf("."));

function changeURL(page) {
    history.pushState({}, '', `/${page}`);
}

changeURL(fileName);