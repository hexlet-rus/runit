const ruLocales = {
  translation: {
    signUp: {
      pageHeader: 'Регистрация',
      emailLabel: 'Электронная почта',
      usernameLabel: 'Имя',
      passwordLabel: 'Пароль',
      confirmPasswordLabel: 'Подтвердить пароль',
      registerButton: 'Зарегистрироваться',
      signUpFailed: 'Такой пользователь уже существует',
      footer: {
        signInHeader: 'Уже есть аккаунт? ',
        signIn: 'Войти',
      },
      validation: {
        requiredField: 'Обязательное поле',
        correctUsername: 'Введите корректное имя',
        correctEmail: 'Некорректный email',
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'от 8 до 30 символов',
        confirmPassword: 'Пароли должны совпадать',
      },
    },
    remindPass: {
      pageHeader: 'Забыли пароль?',
      emailLabel: 'Электронная почта',
      resetButton: 'Восстановить пароль',
      footer: {
        signUpHeader: 'Нет аккаунта? ',
        signUp: 'Создать бесплатный аккаунт',
        signInHeader: 'Уже есть аккаунт? ',
        signIn: 'Войти',
      },
      validation: {
        correctEmail: 'Некорректный email',
      },
    },
    signIn: {
      pageHeader: 'Вход',
      emailLabel: 'Электронная почта',
      passwordLabel: 'Пароль',
      loginButton: 'Войти',
      remindPass: 'Не помню пароль',
      signInFailed: 'Неверный пароль или электронная почта',
      footer: {
        signUpHeader: 'Нет аккаунта? ',
        signUp: 'Создать бесплатный аккаунт',
      },
    },
    profile: {
      replsHeader: 'Repls',
      username: 'Username:',
      createdAt: 'Created at:',
      userId: 'UserId:',
      email: 'Email: ',
      editProfileButton: 'Edit',
      copyProfileButton: 'Copy profile link',
      openReplButton: 'Open',
      newReplButton: 'New Repl',
    },
    navbar: {
      mainLabel: 'Editor',
      menu: 'Menu',
      home: 'Home',
      myRepls: 'My repls',
      profile: 'Profile',
      about: 'About',
      logout: 'Log out',
      signIn: 'Sign in',
      signUp: 'Sign up',
    },
    modals: {
      signInButton: 'Войти',
      signUpButton: 'Создать аккаунт',
      signInHeader: 'Авторизация',
      signUpHeader: 'Регистрация',
      getLinkHeader: ' создан и сохранен в вашем профиле.',
      replNameLabel: "Repl's Name",
      replLinkLabel: "Repl's Link",
      infoBody: 'Авторизуйтесь, чтобы сохранять реплы.',
      cancelButton: 'Отмена',
      saveButton: 'Сохранить',
      goToReplButton: 'Перейти к этому реплу',
      validation: {
        snippetNameMaxLength: 'Не больше 20 символов',
        required: 'Не может быть пустым',
        singleWord: 'Допустимы буквы латинского алфавита, цифры и символы "-_"',
      }
    },
    errors: {
      unknown: 'Неизвестная ошибка',
      network: 'Ошибка сети',
    },
  },
};

export default ruLocales;
