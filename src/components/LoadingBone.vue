<template>
  <div class="flex justify-center items-center">
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin-slow">
      <path d="M17.5 3C15.5 3 14 4.5 14 6.5V8H10V6.5C10 4.5 8.5 3 6.5 3C4.5 3 3 4.5 3 6.5C3 8.5 4.5 10 6.5 10H7V14H6.5C4.5 14 3 15.5 3 17.5C3 19.5 4.5 21 6.5 21C8.5 21 10 19.5 10 17.5V16H14V17.5C14 19.5 15.5 21 17.5 21C19.5 21 21 19.5 21 17.5C21 15.5 19.5 14 17.5 14H17V10H17.5C19.5 10 21 8.5 21 6.5C21 4.5 19.5 3 17.5 3Z" fill="#E69138"/>
    </svg>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
