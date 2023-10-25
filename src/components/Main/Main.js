import "./Main.css";
import React, { useEffect } from 'react';

const Main = () => {
    useEffect(() => {
      const handleMouseMove = (e) => {
        document.documentElement.style.setProperty(
          '--move-x',
          `${(e.clientX - window.innerWidth / 2) * -0.005}deg`
        );
        document.documentElement.style.setProperty(
          '--move-y',
          `${(e.clientY - window.innerHeight / 2) * 0.01}deg`
        );
      };
  
      document.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    return (
        <div>
    

<section class="layers">
    <div class="layers__container">
        <div class="layers__item layer-1"></div>
        <div class="layers__item layer-3">
            <div class="hero-content">
                <h1>ПЛАНИРОВЩИК <span>ЗАДАЧ</span></h1>
                <div class="hero-content__p">Начните планировать свои задачи уже сегодня, зарегистрируйтесь</div>
                <button class="button-start">СОЗДАТЬ ПРОЕКТ</button>
            </div>
        </div>
        
        <div class="layers__item layer-5"></div>
        <div class="layers__item layer-6"></div>
    </div>
</section>
    </div>
  );
}

export default Main;
