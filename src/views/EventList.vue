<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <template v-if="!isFirstPage">
      <router-link :to="{ name: 'event-list', query: {page: page - 1}}" rel="prev">Prev Page</router-link>
    </template>
    <template v-if="!isFirstPage && !isLastPage">
       | 
    </template>
    <template v-if="!isLastPage">
      <router-link :to="{ name: 'event-list', query: {page: page + 1}}" rel="prev">Next Page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      perPage: 3
    }
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
  computed:  {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    isLastPage() {
      return Math.ceil(this.getTotalEvents / this.perPage) > this.page ? false : true
    },
    isFirstPage() {
      return this.page == 1 ? true : false
    },
    ...mapState(['events']),
    ...mapGetters(['getTotalEvents'])
  }
}
</script>
