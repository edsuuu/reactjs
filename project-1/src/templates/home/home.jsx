import React, { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Textinput';

export class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 2
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

    handleChange = (e) => {
        const {value} = e.target;
        this.setState({searchValue: value});
    }
    

    render() {
        const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
        const noMorePost = page + postsPerPage >= allPosts.length;
        
        const filterPost = !!searchValue ? allPosts.filter(post => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
        : posts;
        
        return (
            <section className="container">

                <div className="pesquisa">
                    {!!searchValue && (
                        <h1>Search value: {searchValue}</h1>
                    )}
                    <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
                    {filterPost.length > 0 && (
                        <Posts posts={filterPost} />
                    )}
                    {filterPost.length === 0 && (
                        <p>Não existe Posts</p>
                    )}
                </div>
                
                <div className="button-container">
                    {/* se nao tiver busca o botao aparece, se tiver ele some  */}
                    {!searchValue && (
                        <Button 
                        text="Load More post"
                        onClick={this.loadMorePosts}
                        disabled={noMorePost}
                        />

                    )}
                </div>

            </section>
        );
    }
}
