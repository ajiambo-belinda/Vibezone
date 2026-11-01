// SIDEBAR
const menuItems = document.querySelectorAll('.menu-item');

//MESSAGES
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//THEME
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPallete = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');


//=================SIDEBAR=================

// remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notifications-popup').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

// ===================MESSAGES==================

//searches chat
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();

    message.forEach(chat => {
        let name = chat.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        } else {
            chat.style.display = 'none';
        }
    })
}

//search chat
messageSearch.addEventListener('keyup', searchMessage);

// highlight messages card when messages menu is clicked
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

// THEME CUSTOMIZATION



//opens modal
const openThemeModal = () =>{
    themeModal.style.display = 'grid';
}

//closes modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}

//closing modal
themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);





//================================FONT SIZE===================

//remove active class from or font size selectors
const removeSizeSelector = () =>{
    fontSizes.forEach(size =>{
        size.classList.remove('active');
    })
}
fontSizes.forEach(size => {
    

    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
    size.classList.toggle('active');

    if(size.classList.contains('font-size-1')){
        fontSize ='10px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '5.4rem');
    }else if(size.classList.contains('font-size-2')){
        fontSize ='13px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '-7rem');
    }else if(size.classList.contains('font-size-3')){
            fontSize ='16px';
            root.style.setProperty('--sticky-top-left', '-2rem');
        root.style.setProperty('--sticky-top-right', '-17rem');
    }else if(size.classList.contains('font-size-4')){
            fontSize ='19px';
            root.style.setProperty('--sticky-top-left', '-5rem');
        root.style.setProperty('--sticky-top-right', '-25rem');
    }else if(size.classList.contains('font-size-5')){
            fontSize ='22px';
            root.style.setProperty('--sticky-top-left', '-10rem');
        root.style.setProperty('--sticky-top-right', '-35rem');
    }

    // change the base font size of the whole page
        document.querySelector('html').style.fontSize = fontSize;
    })
    
    })

    //remove active class from colors
    const changeActiveColorClass = () =>{
        colorPallete.forEach(colorPicker =>{
            colorPicker.classList.remove('active');
        })
    }

    //change primary colors
    colorPallete.forEach(color =>{
        color.addEventListener('click', () =>{
            let primaryHue;
            //remove active class from colors

            changeActiveColorClass(); 

            if(color.classList.contains('color-1')){
                primaryHue = 252;
                
            }else if(color.classList.contains('color-2')){
                primaryHue = 52;
            }else if(color.classList.contains('color-3')){
                primaryHue = 352;
            }else if(color.classList.contains('color-4')){
                primaryHue = 152;
            }else if(color.classList.contains('color-5')){
                primaryHue = 202;
            }
            color.classList.add('active');

            root.style.setProperty('--primary-color-hue',primaryHue );
        })
    })


    // theme BACKGROUND values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// changes background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

Bg1.addEventListener('click', () => {
    darkColorLightness = '17%';
    whiteColorLightness = '100%';
    lightColorLightness = '95%';

    // add active class
    Bg1.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});
//================================POSTS FROM API===================
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')
    ? 'http://localhost:5000/api/posts'
    : 'https://vibezone-backend-gmvu.onrender.com/api/posts';
const feedsContainer = document.querySelector('.feeds');

// turns a date into "15 MINUTES AGO"
const timeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (seconds < 60) return 'JUST NOW';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} MINUTES AGO`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} HOURS AGO`;
    const days = Math.floor(hours / 24);
    return `${days} DAYS AGO`;
}

// makes user text safe to show on the page
const escapeHTML = (text) => String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// ids of the posts this browser has liked
const getLikedPosts = () => JSON.parse(localStorage.getItem('likedPosts')) || [];
const saveLikedPosts = (ids) => localStorage.setItem('likedPosts', JSON.stringify(ids));

// filled heart shown on posts you have liked
const heartFilled = `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

const loadPosts = async () => {
    try {
        const res = await fetch(API_URL);
        const posts = await res.json();

        feedsContainer.innerHTML = '';
        const likedPosts = getLikedPosts();

        posts.forEach(post => {
            feedsContainer.innerHTML += `
            <div class="feed">
                <div class="head">
                    <div class="user">
                        <div class="profile-photo">
                            <img src="./images/profile.jpg">
                        </div>
                        <div class="ingo">
                            <h3>${escapeHTML(post.authorName)}</h3>
                            <small>${escapeHTML(post.location.toUpperCase())} ${timeAgo(post.createdAt)}</small>
                        </div>
                    </div>
                    <span class="edit" data-id="${post._id}">
                        <i class="uil uil-ellipsis-h"></i>
                    </span>
                </div>

                <div class="photo">
                    <img src="${escapeHTML(post.image)}">
                </div>

                <div class="action-buttons">
                    <div class="nteraction-buttons">
                        <span class="like-btn ${likedPosts.includes(post._id) ? 'liked' : ''}" data-id="${post._id}">${likedPosts.includes(post._id) ? heartFilled : '<i class="uil uil-heart"></i>'}</span>
                        <span><i class="uil uil-comment-dots"></i></span>
                        <span><i class="uil uil-share-alt"></i></span>
                    </div>
                    <div class="bookmark">
                        <span><i class="uil uil-bookmark-full"></i></span>
                    </div>
                </div>

                <div class="liked-by">
                    <span><img src="./images/profile-11.jpg"></span>
                    <span><img src="./images/profile-12.jpg"></span>
                    <span><img src="./images/profile-13.jpg"></span>
                    <p>Liked by <b>${post.likes} people</b></p>
                </div>

                <div class="caption">
                    <p><b>${escapeHTML(post.authorName)}</b> ${escapeHTML(post.caption)}</p>
                </div>
                <div class="comments text-muted">View all comments</div>
            </div>`;
        });
    } catch (err) {
        console.log('Could not load posts:', err.message);
    }
}

loadPosts();

//================================LOGIN / SIGN UP===================
const AUTH_URL = API_URL.replace('/posts', '/auth');
const authModal = document.querySelector('#auth-modal');
const authForm = document.querySelector('#auth-form');
const authTitle = document.querySelector('#auth-title');
const authSubtitle = document.querySelector('#auth-subtitle');
const authName = document.querySelector('#auth-name');
const authEmail = document.querySelector('#auth-email');
const authPassword = document.querySelector('#auth-password');
const authError = document.querySelector('#auth-error');
const authSubmit = document.querySelector('#auth-submit');
const authSwitchText = document.querySelector('#auth-switch-text');
const authSwitch = document.querySelector('#auth-switch');
const authOpen = document.querySelector('#auth-open');
const profileName = document.querySelector('#profile-name');
const profileHandle = document.querySelector('#profile-handle');

const getToken = () => localStorage.getItem('token');
const getUser = () => JSON.parse(localStorage.getItem('user'));

let authMode = 'login';

const setAuthMode = (mode) => {
    authMode = mode;
    const isLogin = mode === 'login';
    authTitle.textContent = isLogin ? 'Log in' : 'Sign up';
    authSubtitle.textContent = isLogin ? 'Welcome back to Vibezone' : 'Create your Vibezone account';
    authSubmit.textContent = isLogin ? 'Log in' : 'Sign up';
    authSwitchText.textContent = isLogin ? 'No account yet?' : 'Already have an account?';
    authSwitch.textContent = isLogin ? 'Sign up' : 'Log in';
    authName.classList.toggle('hidden', isLogin);
    authName.required = !isLogin;
    authError.textContent = '';
};

const openAuth = () => {
    setAuthMode('login');
    authModal.style.display = 'grid';
};

const closeAuth = () => {
    authModal.style.display = 'none';
    authForm.reset();
    authError.textContent = '';
};

const updateAuthUI = () => {
    const user = getUser();
    authOpen.textContent = user ? 'Log out' : 'Log in';
    profileName.textContent = user ? user.name : 'Guest';
    profileHandle.textContent = user ? '@' + user.name.split(' ')[0].toLowerCase() : '@guest';
};

authSwitch.addEventListener('click', () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
});

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuth();
});

authOpen.addEventListener('click', () => {
    if (getToken()) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        updateAuthUI();
    } else {
        openAuth();
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authError.textContent = '';

    const body = { email: authEmail.value, password: authPassword.value };
    if (authMode === 'signup') body.name = authName.value;

    try {
        const res = await fetch(`${AUTH_URL}/${authMode === 'login' ? 'login' : 'register'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();

        if (!res.ok) {
            authError.textContent = data.message;
            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        closeAuth();
        updateAuthUI();
    } catch (err) {
        authError.textContent = 'Could not reach the server';
    }
});

updateAuthUI();

//================================CREATE POST===================
const postForm = document.querySelector('#post-form');
const postInput = document.querySelector('#create-post');
const postImage = document.querySelector('#post-image');
const imagePreview = document.querySelector('#image-preview');

// show a small preview of the chosen picture
postImage.addEventListener('change', () => {
    const file = postImage.files[0];
    if (!file) {
        imagePreview.innerHTML = '';
        return;
    }
    imagePreview.innerHTML = `<img src="${URL.createObjectURL(file)}"><span id="remove-image">Remove</span>`;
});

// remove the chosen picture
imagePreview.addEventListener('click', (e) => {
    if (e.target.id === 'remove-image') {
        postImage.value = '';
        imagePreview.innerHTML = '';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const caption = postInput.value.trim();
    const file = postImage.files[0];
    if (caption === '' && !file) return;

    if (!getToken()) {
        openAuth();
        return;
    }

    const formData = new FormData();
    formData.append('location', 'Nairobi');
    formData.append('caption', caption);
    formData.append('image', file ? file : './images/feed-2.jpg');

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${getToken()}` },
            body: formData
        });

        if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            updateAuthUI();
            openAuth();
            return;
        }

        if (!res.ok) {
            const data = await res.json();
            alert(data.message);
            return;
        }

        postInput.value = '';
        postImage.value = '';
        imagePreview.innerHTML = '';
        loadPosts();
    } catch (err) {
        console.log('Could not create post:', err.message);
    }
});

//================================DELETE POST===================

feedsContainer.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.edit');
    if (!editBtn) return;

    const id = editBtn.dataset.id;
    if (!id) return;

    if (!getToken()) {
        openAuth();
        return;
    }

    if (!confirm('Delete this post?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });

        if (!res.ok) {
            const data = await res.json();
            alert(data.message);
            return;
        }

        loadPosts();
    } catch (err) {
        console.log('Could not delete post:', err.message);
    }
});

//================================LIKE POST===================
feedsContainer.addEventListener('click', async (e) => {
    const likeBtn = e.target.closest('.like-btn');
    if (!likeBtn) return;

    const id = likeBtn.dataset.id;
    if (!id) return;

    let likedPosts = getLikedPosts();
    const alreadyLiked = likedPosts.includes(id);

    try {
        const res = await fetch(`${API_URL}/${id}/${alreadyLiked ? 'unlike' : 'like'}`, { method: 'PATCH' });
        if (!res.ok) return;

        likedPosts = alreadyLiked
            ? likedPosts.filter(postId => postId !== id)
            : [...likedPosts, id];
        saveLikedPosts(likedPosts);
        loadPosts();
    } catch (err) {
        console.log('Could not update like:', err.message);
    }
});

// END