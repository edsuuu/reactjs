import React, { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';

export class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 10
    };

    async componentDidMount() {
        await this.loadPosts();
    }

    loadPosts = async () => {
        const { page, postsPerPage } = this.state;

        const postsAndPhotos = await loadPosts();
        this.setState({
            posts: postsAndPhotos.slice(page, page + postsPerPage),
            allPosts: postsAndPhotos,
        });
    }

    loadMorePosts = () => {
        const {
            page,
            postsPerPage,
            allPosts,
            posts
        } = this.state;
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);

        this.setState({ posts, page: nextPage });

    console.log('Load More Posts chamado');
    }

    render() {
        const { posts, page, postsPerPage, allPosts } = this.state;
        const noMorePost = page + postsPerPage >= allPosts.length;
        return (
            <section className="button-container">
                <Posts posts={posts} />
                <div className="container">
                <Button 
                text="Load More post"
                onClick={this.loadMorePosts}
                disabled={noMorePost}
                />
                </div>

            </section>
        );
    }
}
