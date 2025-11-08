<template>
    <footer>
        <div class="footer">
            <img src="/images/Logo.png" alt="Logo">
            <div class="desenvolvedores">
                <h1>Desenvolvido por:</h1>
                <ul>
                    <li>
                        <p>Laura Eloysa da Silva</p>
                        <div class="links">
                            <a href="https://github.com/LauraEloysa" target="_blank">
                                <span class="mdi mdi-github"></span>
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lauraeloysad@gmail.com" target="_blank">
                                <span class="mdi mdi-gmail"></span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <p>Maria Aparecida dos Santos Costa</p>
                        <div class="links">
                            <a href="https://github.com/mariisbx" target="_blank">
                                <span class="mdi mdi-github"></span>
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mariaaparecida.ifc.araquari@gmail.com" target="_blank">
                                <span class="mdi mdi-gmail"></span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="direitos-autorais">
            <p>Alguns direitos reservados © 2025 CineMap</p>
        </div>
    </footer>
</template>

<style scoped>  
.footer{
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 30px;
}
.footer img{
    height: 140px;
    margin-left:3vw;
    margin-right: 20px;
}
.desenvolvedores{
    margin-top: 10px;
}
.desenvolvedores p{
    font-weight: 600;
    margin-bottom: 10px;
}
.desenvolvedores ul{
    padding: 0;
}
.desenvolvedores ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    margin-bottom: 5px;
}
.links a {
    margin-left: 30px; 
    font-size: 2rem; 
    color: #44001a;
}
.links a:first-child {
    margin-left: 60vw; 
}   
.links a:hover {
    color: #aa0041;
    transition: 1s;
}
.direitos-autorais{
    background-color: #44001a;
    text-align: center;
    color: #fff;
    padding: 20px;
}
h1{
    font-size: 1.1rem;
    color: #44001a;
    font-weight: 700;
    margin-bottom: 15px;
}
</style>
