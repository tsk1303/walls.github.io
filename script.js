document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');

    fetch('images/')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const images = Array.from(doc.querySelectorAll('a'))
                .filter(link => link.href.match(/\.(jpe?g|png|gif)$/i))
                .map(link => link.href);

            images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Wallpaper';
                gallery.appendChild(img);
            });
        });

});

images.forEach(src => {
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const downloadLink = document.createElement('a');

    img.src = src;
    img.alt = 'Wallpaper';
    downloadLink.href = src;
    downloadLink.download = src.split('/').pop(); // Use image file name
    downloadLink.textContent = 'Download';

    imgContainer.appendChild(img);
    imgContainer.appendChild(downloadLink);
    gallery.appendChild(imgContainer);
});

