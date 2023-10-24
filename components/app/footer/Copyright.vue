<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <div class="copyright">
    <div class="container flex flex-wrap justify-between lg:flex-row">
      <p class="copyright__site">
        {{ appConfig.footer.copyright.site }} - {{ new Date().getFullYear() }}
      </p>

      <p class="copyright__payment">
        <span class="copyright__payment-title"
          >Your payments are protected with:</span
        >
        <a href="https://squareup.com/es/es">
          <img class="w-24" src="/squareup.svg" alt="SquareUp logo" />
        </a>
      </p>
      <p class="copyright__author">
        <span class="copyright__author-text">Store made by:</span>
        <a href="https://novanet.studio/" target="_blank">
          <img src="/novanet-logo.svg" alt="Novanet logo" />
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.copyright {
  @apply py-8 border-t border-t-color-1 text-center bg-color-1 text-color-3;
}

.copyright__site {
  @apply block w-full mb-0 leading-8 text-sm lg:w-auto;
}

.copyright__payment {
  @apply flex flex-col items-center w-full !mb-0 leading-8 text-sm lg:flex-row lg:w-auto;
}

.copyright__payment-title {
  @apply block pb-[10px] lg:pb-0 lg:pr-2;
}

.copyright__author {
  @apply flex items-center justify-center w-full mb-0 leading-8 text-sm lg:w-auto;
}

.copyright__author-text {
  @apply mr-2;
}
</style>
