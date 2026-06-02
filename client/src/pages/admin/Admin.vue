<script setup lang="ts">

</script>

<template>
    <div class="card">
        <div class="flex flex-col gap-8 max-w-96 mx-auto">
            <h2 class="text-lg text-center">Admin panel</h2>

            <label class="flex flex-col gap-1">
                <span class="ms-2">Username</span>
                <input
                    type="text"
                    name="username"
                    class="card p-2 focus:outline-0 bg-base-100"
                />
            </label>

            <label class="flex flex-col gap-1">
                <span class="ms-2">Password</span>
                <input
                    type="password"
                    name="password"
                    class="card p-2 focus:outline-0 bg-base-100"
                />
            </label>

            <button class="card px-0 py-1 bg-secondary text-base-100 mb-2">
                <span class="opacity-50">Not implemented</span>
            </button>
        </div>
    </div>
</template>