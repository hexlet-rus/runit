import React from 'react';
import routes from '../routes.js';

export function About() {
  return (
    <>
      <div className="container-fluid py-5 m-0 bg-dark text-white">
        <div className="container">
          <h3>Информация о проекте</h3>
          <p>
            <strong>Runit</strong> — среда для написания и исполнения кода,
            которую будем активно использовать на всех платформах Хекслета.
          </p>
          <p>
            Ближайший аналог — сервис&nbsp;
            <a
              className="text-secondary text-decoration-none"
              href="https://replit.com/~"
              target="_blank"
              rel="noopener noreferrer"
            >
              repl.it
            </a>
            .
          </p>
          <p>
            Бэкенд разрабатывается на&nbsp;
            <a
              className="text-secondary text-decoration-none"
              href="https://ru.hexlet.io/blog/posts/gid-po-nest-js?ysclid=l7ew5lpeiw134812170"
              target="_blank"
              rel="noopener noreferrer"
            >
              NestJS
            </a>
            &nbsp;и&nbsp;
            <a
              className="text-secondary text-decoration-none"
              href="https://ru.hexlet.io/blog/posts/vse-chto-nuzhno-znat-novichku-o-typescript-ischerpyvayuschiy-gayd?ysclid=l7ewa0mrdp61534639"
              target="_blank"
              rel="noopener noreferrer"
            >
              TypeScript
            </a>
            , на фронтенде используется&nbsp;
            <a
              className="text-secondary text-decoration-none"
              href="https://ru.hexlet.io/blog/posts/biblioteka-react-review-article?ysclid=l7eweuntdr505174264"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
