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
const API_URL = 'http://localhost:5000/api/posts';
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

//================================CREATE POST===================
const postForm = document.querySelector('#post-form');
const postInput = document.querySelector('#create-post');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const caption = postInput.value.trim();
    if (caption === '') return;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                authorName: 'Lynda Ivy',
                location: 'Nairobi',
                caption: caption,
                image: './images/feed-2.jpg'
            })
        });

        postInput.value = '';
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

    if (!confirm('Delete this post?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
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

// unlike a post
router.patch('/:id/unlike', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, likes: { $gt: 0 } },
      { $inc: { likes: -1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found or has no likes' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// END