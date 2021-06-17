<template>
  <div class="card-columns">
    <div class="card " v-for="listing in listings" :key="listing.id">
      <div class="card-title">
        <h1>
          {{ listing.title }} - {{ listing.bid }}
        </h1>
      </div>
      <div class="card-body">
        <p>{{ listing.description }}</p>
        <button v-if="user.isAuthenticated" @click="placeBid(listing)">
          Bid
        </button>
      </div>
      <div class="card-footer" v-if="listing.highestBidder">
        <img :src="listing.highestBidder.picture" alt="" height="45" class="rounded-circle mr-3">

        <span>{{ listing.highestBidder.name }}</span>
      </div>
    </div>
    <button @click="example">
      example
    </button>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { listingsService } from '../services/ListingsService'
import { AppState } from '../AppState'
import Swal from 'sweetalert2'
import Notification from '../utils/Notification'
import { socketService } from '../services/SocketService'

export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      listingsService.getListings()
    })

    return {
      user: computed(() => AppState.user),
      listings: computed(() => AppState.listings),
      async placeBid(listing) {
        try {
          const result = await Swal.fire({
            title: 'Place your bid',
            input: 'number'
          })
          if (!result.isConfirmed) { return }
          if (Number(result.value) < listing.bid) {
            return Notification.toast('Not enough monies', 'error')
          }
          listingsService.placeBid(listing, { bid: Number(result.value) })
        } catch (e) {
          Notification.toast(e.message, 'error')
        }
      },
      example() {
        socketService.emit('hello', { name: 'Jake' })
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
