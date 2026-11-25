import { starterPosts } from '../data.js';

export const blankPost = {
    title: '',
    category: 'Lifestyle',
    author: '',
    date: new Date().toISOString().slice(0, 10),
    status: 'Published',
    excerpt: '',
    content: '',
    image: ''
};

export const readPosts = () => {
    try {
        const saved = localStorage.getItem('inkspace-posts');
        return saved ? JSON.parse(saved) : starterPosts;
    } catch {
        return starterPosts;
    }
};

export const savePosts = posts => {
    localStorage.setItem('inkspace-posts', JSON.stringify(posts));
};
