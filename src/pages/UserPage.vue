<template>
    <div >
        <h1>Сторінка з постами</h1>
        <my-input v-model="searchQery" placeholder="Search..." />
        <div class="app__btns">
            <my-button  @click="showDialog">Створити пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"></my-select>
        </div>
        <my-dialog v-model:show="dialogVisible" >
            <post-form-vue @create="createPosts"></post-form-vue>
        </my-dialog>
        
        <post-list-vue :posts="sorteredAndSearchedPosts" @remove='removePost' v-if="!isPostLoading"></post-list-vue>
        <div v-else class="loading">
            <div class="loading__block">
                <span class="circle1 circle"></span>
                <span class="circle2 circle"></span>
                <span class="circle3 circle"></span>
            </div>
        </div>
        <div class="page__wrapper">
            <div :key="pageNumber" class="page" :class="{'current__page': page === pageNumber}" v-for="pageNumber in totalPage" @click="changePage(pageNumber)">{{  pageNumber }}</div>
        </div>
    </div>
</template>

<script>
import PostFormVue from "@/components/PostForm.vue";
import PostListVue from "@/components/PostList.vue";
import axios from 'axios'
export default {
    components: {
        PostFormVue, PostListVue
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            sortOptions: [
                {value: 'title', name: 'По назві'},
                {value: 'body', name: 'По опису'},
            ],
            searchQery: '',
        }
    },
    methods: {
        createPosts(post) {
            this.posts.push(post),
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fechPosts() {
            try {
                this.isPostLoading = true,
                setTimeout( async() => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }

                    });
                    this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = response.data;
                    this.isPostLoading = false;
                }, 2000);
            } catch (error) {
                alert('error')
            } finally {
                
            }
        },
        changePage(pageNumber) {
            this.page = pageNumber
        } 
    },
    mounted() {
        this.fechPosts()
    },
    computed: {
        sorteredPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sorteredAndSearchedPosts() {
            return this.sorteredPosts.filter(post => post.title.toLowerCase().includes(this.searchQery.toLowerCase()))
        }
    },
    watch: {
        page() {
            this.fechPosts()
        }
    } 
}
</script>

<style>
body{
    background-color: rgb(33, 30, 30);
    color: blanchedalmond;
}

.app__btns{
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.page__wrapper{
    display: flex;
    align-items: center;
    margin-top: 15px;
    gap: 10px;
    flex-wrap: wrap;
}
.page{
    padding: 10px;
    border: 1px solid teal;
    cursor: pointer;
    
}
.current__page{
    background-color: teal;
}
.loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}
.loading__block{
    display: flex;
    align-items: center;
    gap: 10px;
}
.circle{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: teal;
    animation: top .5s ease infinite alternate ;
}
.circle1{
    animation-delay: 0s;
}
.circle2{
    animation-delay: .5s;
}
.circle3{
    animation-delay: 0s;
}
 @keyframes top { from { transform: scale(0); } to { transform: scale(1.2); }  }
</style>