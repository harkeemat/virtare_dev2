  <template>
  <div class="loginWrapper thankyou">
    <div class="logIn">
      <div class="loginInner">
        <a-row>
          <a-col :md="24">
            <div class="rightWrapper">
              <h1>Password Changed!</h1>
              <img src="@/assets/images/reset.svg" />
              <p>Your profile password has been changed!</p>
              <p>Please login with your new password.</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.thankyou {
  .logIn {
    max-width: 500px;
    .loginInner {
      .rightWrapper {
        text-align: center;
        img {
          max-width: 100px;
          margin: 30px 0;
        }
      }
    }
  }
}
</style>