<template>
    <div className='login'>
        <div className="card">
            <div className="left">
                <h1>Hello Login.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur error nesciunt suscipit deserunt
                    nostrum facere officia quo eaque unde reprehenderit dolorem.</p>
                <span>Dont't you have an account?</span>
                <router-link to='/register'><button>Register</button></router-link>
            </div>
            <div className="right">
                <h2>Login</h2>
                <form>
                    <input type="text" name='username' 
                    v-model="user.username" 
                    placeholder='Username' 
                    
                    />
                    <input type="password" name='password' v-model="user.password"  placeholder='Password' />
                    <button @click.prevent="handleLogin">login</button>

                </form>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive,onMounted} from 'vue'
let user = reactive({
    username:'admin',
    password:'111111',
})
const handleLogin = ()=>{
    console.log(user)
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
.login {
    background-color: rgb(23, 23, 23);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    font-family:Georgia, 'Times New Roman', Times, serif;
    
    .card {
        width:50% ;
        min-height: 60%;
        border-radius: 10px;
        background-color: white;
        display: flex;
        overflow: hidden;
        .left {
            background-color:gray;
            background-size: cover;
            min-height: 100%;
            flex: 1;
            display: flex;
            overflow: hidden;
            flex-direction: column;
            gap: 30px;
            padding: 40px;
            justify-content: center;
            @include mobile {
                display: none;
            }
            @include tablet {
                display: none;
            }
            h1 {
                font-size: 70px;
                line-height: 70px;
                font-weight: bold;
                color: white;
                font-family:Georgia, 'Times New Roman', Times, serif;
            }
            p {
                color: white;
            }
            span {
                color: white;
                font-size: 14px;
            }
            button {
                border: none;
                border-radius: 2px;
                font-size: 16px;
                font-weight: bold;
                padding: 10px 50px;
                width: fit-content;
                color: rgb(6, 6, 6);
                cursor: pointer;

            }
        }
        .right {
            height: 100%;
            flex: 1;
            padding: 80px 40px;
            display: flex;
            flex-direction: column;
            gap: 50px;
            justify-content: center;
            h2 {
                font-size: 30px;
                font-weight: bold;
                color: rgb(0, 0, 0);
                font-family:Georgia, 'Times New Roman', Times, serif;
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 30px;
                input {
                    height: 50px;
                    padding-left: 20px;
                    background-color: unset;
                    outline: none;
                    border: none;
                    border-bottom: 2px solid gray;
                }
                input:-internal-autofill-previewed,
                input:-internal-autofill-selected {
                  -webkit-text-fill-color: #808080;
                  transition: background-color 1000s ease-out 0.5s;
                }

                button {
                    border: none;
                    border-radius: 2px;
                    font-size: 16px;
                    font-weight: bold;
                    padding: 10px 50px;
                    width: fit-content;
                    background-color: black;
                    color: rgb(255, 255, 255);
                    cursor: pointer;
                }
            }
        }
    }
}</style>