import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Shell from './components/Shell.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PostForm from './pages/PostForm.jsx';
import Posts from './pages/Posts.jsx';
import Preview from './pages/Preview.jsx';
import { readPosts, savePosts } from './utils/posts.js';

export default function App() {
    const [posts, setPostsState] = useState(readPosts);

    const setPosts = next => {
        setPostsState(prev => {
            const value = typeof next === 'function'
                ? next(prev)
                : next;

            savePosts(value);
            return value;
        });
    };

    useEffect(() => {
        savePosts(posts);
    }, [posts]);

    return (
        <Shell posts={posts}>
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard posts={posts} />}
                />
                <Route
                    path="/posts"
                    element={
                        <Posts
                            posts={posts}
                            setPosts={setPosts}
                        />
                    }
                />
                <Route
                    path="/new"
                    element={
                        <PostForm
                            posts={posts}
                            setPosts={setPosts}
                        />
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <PostForm
                            posts={posts}
                            setPosts={setPosts}
                            edit
                        />
                    }
                />
                <Route
                    path="/view/:id"
                    element={<Preview posts={posts} />}
                />
                <Route
                    path="*"
                    element={<Dashboard posts={posts} />}
                />
            </Routes>
        </Shell>
    );
}
