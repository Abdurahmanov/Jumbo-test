<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo.svg" alt="Jumbo logo" />
      </router-link>
    </div>
    <nav class="nav">
      <menu class="menu">
        <ul class="menu__list">
          <li class="menu__item">
            <router-link to="/" class="menu__link" exact-active-class="menu__link_active">
              Map
            </router-link>
          </li>
          <li class="menu__item">
            <router-link to="/stores-by-city" class="menu__link" exact-active-class="menu__link_active">
              Stores by city
            </router-link>
          </li>
        </ul>
      </menu>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: 70px;
  border-bottom: 1px solid rgb(227, 227, 227);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 30px;
}

.logo {
  height: 100%;
  width: 150px;

  & img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.menu {
  padding: 0;
  &__list {
    list-style: none;
    display: flex;
    padding: 0;
  }

  &__item {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__link {
    font-size: 16px;
    color: rgba(38, 38, 38, 0.8);
    transition: 0.3s;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: rgba(38, 38, 38, 1);
    }

    &_active {
      color: #edb716;

      &:hover {
        color: #edb716;
      }
    }
  }
}

.nav {
  margin: 0 auto;
}
</style>
