<template>
    <div class="px-4 sm:px-8 py-16 transition-all">
        <div class="max-w-225 mx-auto">
            <router-view v-slot="{Component}">
                <transition name="fade" mode="out-in">
                    <component :is="Component"/>
                </transition>
            </router-view>
        </div>
    </div>
</template>