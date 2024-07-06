document.getElementById('linkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const linkNameInput = document.getElementById('linkName');
    const linkInput = document.getElementById('linkInput');
    const linkNameValue = linkNameInput.value;
    const linkValue = linkInput.value;

    if (linkNameValue && linkValue) {
        addLink(linkNameValue, linkValue);
        saveLink(linkNameValue, linkValue);

        linkNameInput.value = '';
        linkInput.value = '';
    }
});

function addLink(name, url) {
    const linkList = document.getElementById('linkList');
    const listItem = document.createElement('li');

    const actionsElement = document.createElement('div');
    actionsElement.classList.add('actions');

    const editButton = document.createElement('button');
    editButton.textContent = 'تعديل';
    editButton.classList.add('edit');
    editButton.addEventListener('click', function() {
        const newName = prompt('أدخل اسم الرابط الجديد', name);
        const newUrl = prompt('أدخل رابط الموقع الجديد', url);
        if (newName && newUrl) {
            linkElement.textContent = newName;
            linkElement.href = newUrl;
            updateLink(name, url, newName, newUrl);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        linkList.removeChild(listItem);
        deleteLink(name, url);
    });

    actionsElement.appendChild(editButton);
    actionsElement.appendChild(deleteButton);

    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.target = "_blank";
    linkElement.textContent = name;
    linkElement.classList.add('link');

    listItem.appendChild(actionsElement);
    listItem.appendChild(linkElement);

    linkList.appendChild(listItem);
}

function saveLink(name, url) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ name, url });
    localStorage.setItem('links', JSON.stringify(links));
}

function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const linkList = document.getElementById('linkList');
    linkList.innerHTML = ''; // Clear the existing list items before adding new ones
    links.forEach(link => addLink(link.name, link.url));
}

function updateLink(oldName, oldUrl, newName, newUrl) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const index = links.findIndex(link => link.name === oldName && link.url === oldUrl);
    if (index !== -1) {
        links[index] = { name: newName, url: newUrl };
        localStorage.setItem('links', JSON.stringify(links));
    }
}

function deleteLink(name, url) {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    links = links.filter(link => link.name !== name || link.url !== url);
    localStorage.setItem('links', JSON.stringify(links));
}

// Load links from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadLinks);