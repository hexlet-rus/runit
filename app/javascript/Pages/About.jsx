import React from 'react';
import routes from '../routes.js';

export function About() {
  return (
    <>
      <div className="container mt-5">
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
      <footer className="mt-auto pb-5 bg-light fixed-bottom">
        <div className="container-xl">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 pt-3">
            <div className="col d-flex flex-column mb-2">
              <h3 className="h3 pb-2 border-bottom">© ООО “Хекслет Рус”</h3>
              <a className="text-secondary" href={routes.aboutPagePath()}>
                О проекте
              </a>
              <a
                className="text-secondary"
                href="https://github.com/Hexlet/hexlet-editor"
                target="_blank"
                rel="noopener noreferrer"
              >
                Исходный код
              </a>
              <a
                className="text-secondary"
                href="https://slack-ru.hexlet.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slack #hexlet-volunteers
              </a>
            </div>
            <div className="col d-flex flex-column mb-2">
              <h3 className="h3 pb-2 border-bottom">Помощь</h3>
              <a
                className="text-secondary"
                href="https://ru.hexlet.io/webinars"
                target="_blank"
                rel="noopener noreferrer"
              >
                База знаний
              </a>
              <a
                className="text-secondary"
                href="https://guides.hexlet.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hexlet Guides
              </a>
            </div>
            <div className="col d-flex flex-column mb-2">
              <h3 className="h3 pb-2 border-bottom">Дополнительно</h3>
              <a
                className="text-secondary"
                href="https://ru.code-basics.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code Basics
              </a>
              <a
                className="text-secondary"
                href="https://codebattle.hexlet.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code Battles
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
