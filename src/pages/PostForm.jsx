import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, ChevronLeft } from 'lucide-react';

import { blankPost } from '../utils/posts.js';

export default function PostForm({ posts, setPosts, edit = false }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const existing = posts.find(post => post.id === Number(id));

    const [form, setForm] = useState(
        edit && existing ? { ...existing } : blankPost
    );
    const [error, setError] = useState('');

    useEffect(() => {
        if (edit && existing) {
            setForm({ ...existing });
        }
    }, [id, edit, existing]);

    if (edit && !existing) {
        return (
            <div className="empty">
                <h3>Post not found</h3>
                <button
                    className="secondary-btn"
                    onClick={() => navigate('/posts')}
                >
                    Back to posts
                </button>
            </div>
        );
    }

    const change = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = e => {
        e.preventDefault();

        if (
            !form.title.trim() ||
            !form.author.trim() ||
            !form.content.trim()
        ) {
            setError('Please fill in the title, author, and content.');
            return;
        }

        if (edit) {
            setPosts(
                posts.map(post =>
                    post.id === Number(id)
                        ? { ...form, id: Number(id) }
                        : post
                )
            );
        } else {
            setPosts([
                { ...form, id: Date.now() },
                ...posts
            ]);
        }

        navigate('/posts');
    };

    return (
        <>
            <div className="page-heading">
                <div>
                    <button
                        className="back-link"
                        onClick={() => navigate('/posts')}
                    >
                        <ChevronLeft size={16} />
                        Back to posts
                    </button>
                    <div className="eyebrow">
                        {edit ? 'UPDATE CONTENT' : 'NEW CONTENT'}
                    </div>
                    <h1>
                        {edit ? 'Edit your' : 'Create a'} <em>story.</em>
                    </h1>
                    <p className="subheading">
                        {edit
                            ? 'Make changes to your existing post.'
                            : 'Put your thoughts into words and share them.'}
                    </p>
                </div>
            </div>

            <form className="form-panel" onSubmit={submit}>
                <div className="form-main">
                    <label>
                        Post title <span>*</span>
                        <input
                            name="title"
                            value={form.title}
                            onChange={change}
                            placeholder="Give your story a title"
                        />
                    </label>

                    <div className="form-row">
                        <label>
                            Author name <span>*</span>
                            <input
                                name="author"
                                value={form.author}
                                onChange={change}
                                placeholder="Your name"
                            />
                        </label>
                        <label>
                            Category
                            <select
                                name="category"
                                value={form.category}
                                onChange={change}
                            >
                                {[
                                    'Lifestyle',
                                    'Technology',
                                    'Writing',
                                    'Productivity',
                                    'Travel',
                                    'Food',
                                    'Design',
                                    'Business'
                                ].map(item => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <label>
                        Short description
                        <textarea
                            name="excerpt"
                            rows="2"
                            value={form.excerpt}
                            onChange={change}
                            placeholder="A short summary of your post..."
                        />
                    </label>

                    <label>
                        Post content <span>*</span>
                        <textarea
                            name="content"
                            rows="9"
                            value={form.content}
                            onChange={change}
                            placeholder="Start writing your story here..."
                        />
                    </label>
                </div>

                <div className="form-side">
                    <label>
                        Cover image URL
                        <input
                            name="image"
                            value={form.image}
                            onChange={change}
                            placeholder="https://example.com/image.jpg"
                        />
                    </label>

                    {form.image && (
                        <img
                            className="image-preview"
                            src={form.image}
                            alt="Cover preview"
                            onError={e => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    )}

                    <label>
                        Publish date
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={change}
                        />
                    </label>

                    <label>
                        Post status
                        <select
                            name="status"
                            value={form.status}
                            onChange={change}
                        >
                            <option>Published</option>
                            <option>Draft</option>
                        </select>
                    </label>

                    <div className="publish-note">
                        <CheckCircle2 size={17} />
                        <span>
                            Your post is saved in this browser. You can edit it any time.
                        </span>
                    </div>
                </div>

                <div className="form-footer">
                    {error && (
                        <p className="error-text">{error}</p>
                    )}
                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => navigate('/posts')}
                    >
                        Cancel
                    </button>
                    <button className="primary-btn" type="submit">
                        {edit ? 'Save changes' : 'Save post'}
                    </button>
                </div>
            </form>
        </>
    );
}
