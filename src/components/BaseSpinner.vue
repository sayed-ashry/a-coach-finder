<template>
  <div class="container">
    <div class="spinner"></div>
  </div>
</template>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 100px;
  height: 100px;
  border: 30px dashed rgba(172, 11, 118, 0.1);
  border-radius: 50%;
  border-top-color: rgb(61, 0, 141);
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
