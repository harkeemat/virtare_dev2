<template>
    <div  class="loginWrapper">
      <div class="logIn">
        <div class="loginInner">
          <a-row>
            <WelcomeScreen />
            <a-col :md="12">
              <CreatePassword />
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <Loader />
  </template>
  
  <script>
  import WelcomeScreen from "@/components/common/Welcome";
  import CreatePassword from "@/components/setupPassword/SetupPassword.vue";
  export default {
    components: {
      CreatePassword,
      WelcomeScreen,
    },
    setup() {
      return {
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import "@/assets/scss/variable.scss";
  .setupPassword {
    .logIn {
      max-width: 500px;
      .loginInner {
        .rightWrapper {
          .logo {
            max-width: 100px;
            margin: 0 0 20px;
          }
        }
      }
    }
  }
  </style>